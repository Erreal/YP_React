// rootReducer.ts

import { TOrderCard } from '../../utils/types';
import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_DATA,
  WS_CONNECTION_END,
  TWSActions,
} from '../actions/websocket';

export const websocket: {
  wsConnected: boolean;
  wsFailed: boolean;
  feed: Array<TOrderCard>;
  totalOrders: number;
  totalToday: number;
} = {
  wsConnected: false,
  wsFailed: false,
  feed: [],
  totalOrders: 0,
  totalToday: 0,
}

export const wsReducer = (state = websocket, action: TWSActions) => {
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
          feed: action.payload.orders,
          totalOrders: action.payload.total,
          totalToday: action.payload.totalToday,
      };
    default:
      return state;
  }
};
