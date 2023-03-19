// socketMiddleware.ts
import type { Middleware, MiddlewareAPI } from 'redux';
import { AppDispatch } from '../../hooks/useAppDispatch';
import { refreshToken } from '../../utils/requestApi';
import { TwsActionTypes } from '../../utils/types';
import type { RootState } from '../store';

export const socketMiddleware =
  (wsActions: TwsActionTypes): Middleware =>
  (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    let isConnected = false;
    let reconnectTimer = 0;
    let url = '';

    return (next) => (action) => {
      const { dispatch } = store;

      const { wsConnect, wsDisconnect } = wsActions;

      if (wsConnect.match(action.type)) {
        url = action.payload;
        socket = new WebSocket(url);
        isConnected = true;
      }

      if (socket) {
        socket.onopen = () => {
          dispatch({ type: 'WS_CONNECTION_SUCCESS' });
        };

        socket.onerror = () => {
          dispatch({ type: 'WS_CONNECTION_ERROR' });
        };

        socket.onmessage = async (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          if (parsedData?.message === 'Invalid or missing token') {
            const newToken = await refreshToken();
            if (!newToken.success) {
              Promise.reject(newToken);
            }
            localStorage.setItem('refreshToken', newToken.refreshToken);
            const token = newToken.accessToken;
            const wsUrl = new URL(url);
            wsUrl.searchParams.set('token', token);
            dispatch({
              type: 'WS_CONNECTION_START',
              payload: wsUrl,
            });
          }
          dispatch({ type: 'WS_GET_DATA', payload: parsedData });
        };

        socket.onclose = () => {
          dispatch({ type: 'WS_CONNECTION_CLOSED' });

          if (isConnected) {
            reconnectTimer = window.setTimeout(() => {
              dispatch({
                type: 'WS_CONNECTION_START',
                payload: url,
              });
            }, 3000);
          }
        };

        if (wsDisconnect.match(action.type)) {
          clearTimeout(reconnectTimer);
          isConnected = false;
          reconnectTimer = 0;
          socket.close();
          dispatch({ type: 'WS_CONNECTION_CLOSED' });
        }
      }

      next(action);
    };
  };
