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
      const {type, payload} = action;

      const { wsConnect, wsDisconnect, onOpen, onClose, onError, onMessage } = wsActions;
      if (wsConnect === type) {
        url = payload;
        socket = new WebSocket(url);
        isConnected = true;
      }

      if (socket) {
        socket.onopen = () => {
          dispatch({type:onOpen});
        };

        socket.onerror = () => {
          dispatch({type: onError});
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
            dispatch({type: wsConnect, payload: wsUrl});
          }
          dispatch({type: onMessage, payload: parsedData});
        };

        socket.onclose = () => {
          dispatch({type: onClose});

          if (isConnected) {
            reconnectTimer = window.setTimeout(() => {
              dispatch({type: wsConnect, payload: url});
            }, 3000);
          }
        };

        if (wsDisconnect === type) {
          clearTimeout(reconnectTimer);
          isConnected = false;
          reconnectTimer = 0;
          socket.close();
          dispatch({type: onClose});
        }
      }

      next(action);
    };
  };
