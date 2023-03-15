// rootReducer.ts

import { INITIAL_STATE } from '../../utils/constants';
import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_DATA,
  WS_CONNECTION_END,
  TWSActionsFeed,
  WS_CONNECTION_SUCCESS_PROFILE,
  TWSActionsProfile,
  WS_CONNECTION_ERROR_PROFILE,
  WS_CONNECTION_CLOSED_PROFILE,
  WS_CONNECTION_END_PROFILE,
  WS_GET_DATA_PROFILE,
} from '../actions/websocket';

export const wsReducerFeed = (
  state = INITIAL_STATE.websocket,
  action: TWSActionsFeed
) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
        wsFailed: false,
      };
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
        wsFailed: true,
      };
    case WS_CONNECTION_CLOSED:
      return state;
    case WS_CONNECTION_END:
      return state;
    case WS_GET_DATA:
      return {
        ...state,
        orders: {
          feed: action.payload.orders,
          totalOrders: action.payload.total,
          totalToday: action.payload.totalToday,
        },
      };
    default:
      return state;
  }
};

export const wsReducerProfile = (
  state = INITIAL_STATE.websocketProfile,
  action: TWSActionsProfile
) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS_PROFILE:
      return {
        ...state,
        wsConnected: true,
        wsFailed: false,
      };
    case WS_CONNECTION_ERROR_PROFILE:
      return {
        ...state,
        wsConnected: false,
        wsFailed: true,
      };
    case WS_CONNECTION_CLOSED_PROFILE:
      return state;
    case WS_CONNECTION_END_PROFILE:
      return state;
    case WS_GET_DATA_PROFILE:
      return {
        ...state,
        orders: {
          feed: action.payload.orders,
          totalOrders: action.payload.total,
          totalToday: action.payload.totalToday,
        },
      };
    default:
      return state;
  }
};
