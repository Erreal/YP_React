// socketMiddleware.ts
import type { Middleware, MiddlewareAPI } from 'redux';
import { AppDispatch } from '../../hooks/useAppDispatch';
import { refreshToken } from '../../utils/requestApi';
import { TwsActionTypes } from '../../utils/types';
import type { RootState } from '../store';

export const socketMiddlewareFeed =
  (wsActions: TwsActionTypes): Middleware =>
  (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    let isConnected = false;
    let reconnectTimer = 0;
    let url = 'wss://norma.nomoreparties.space/orders/all';

    return (next) => (action) => {
      const { dispatch } = store;

      const { wsConnect, wsDisconnect } = wsActions;

      if (wsConnect.match(action.type)) {
        console.log('Socket connected');
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
          console.log(JSON.parse(data));
          dispatch({ type: 'WS_GET_DATA', payload: JSON.parse(data) });
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
          console.log('Socket disconnected');
          socket.close();
          dispatch({ type: 'WS_CONNECTION_CLOSED' });
        }
      }

      next(action);
    };
  };

export const socketMiddlewareProfile =
  (wsActions: TwsActionTypes): Middleware =>
  (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    let isConnected = false;
    let reconnectTimer = 0;
    let url = 'wss://norma.nomoreparties.space/orders';
    let token = '';

    return (next) => (action) => {
      const { dispatch } = store;

      const { wsConnect, wsDisconnect } = wsActions;

      if (wsConnect.match(action.type)) {
        console.log('Socket connected profile');
        token = action.payload;
        console.log(url);
        if (token) {
          socket = new WebSocket(`${url}?token=${token}`);
          isConnected = true;
        }
      }

      if (socket) {
        socket.onopen = () => {
          dispatch({ type: 'WS_CONNECTION_SUCCESS_PROFILE' });
        };

        socket.onerror = () => {
          dispatch({ type: 'WS_CONNECTION_ERROR_PROFILE' });
        };

        socket.onmessage = async (event) => {
          const { data } = event;
          console.log(JSON.parse(data));
          if (!data?.success && data?.message === 'Invalid or missing token') {
            const newToken = await refreshToken();
            if (!newToken.success) {
              Promise.reject(newToken);
            }
            console.log(newToken);
            localStorage.setItem('refreshToken', newToken.refreshToken);
            const token = newToken.accessToken;
            const wsUrl = new URL(url);
            wsUrl.searchParams.set('token', token);
            console.log(wsUrl);
            dispatch({
              type: 'WS_CONNECTION_START_PROFILE',
              payload: wsUrl,
            });
          }

          dispatch({ type: 'WS_GET_DATA_PROFILE', payload: JSON.parse(data) });
        };

        socket.onclose = () => {
          dispatch({ type: 'WS_CONNECTION_CLOSED_PROFILE' });

          if (isConnected) {
            reconnectTimer = window.setTimeout(() => {
              dispatch({
                type: 'WS_CONNECTION_START_PROFILE',
                payload: url,
              });
            }, 3000);
          }
        };

        if (wsDisconnect.match(action.type)) {
          clearTimeout(reconnectTimer);
          isConnected = false;
          reconnectTimer = 0;
          console.log('Socket disconnected profile');
          socket.close();
          dispatch({ type: 'WS_CONNECTION_CLOSED_PROFILE' });
        }
      }

      next(action);
    };
  };
