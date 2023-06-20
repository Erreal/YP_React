import { expect, test } from '@jest/globals';
import { testOrders } from '../../utils/testData';
import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_DATA,
  WS_CONNECTION_END,
} from '../actions/websocket';
import { websocket, wsReducer } from './websocket';

const initialState = websocket;
const orders = testOrders;

describe('Redux websocket store', () => {
  test('Should return the initial state', () => {
    expect(wsReducer(undefined, { type: null })).toEqual(initialState);
  });

  test('should handle WS_CONNECTION_SUCCESS', () => {
    const state = {
      ...initialState,
      wsConnected: true,
      wsFailed: false,
    };
    expect(wsReducer(initialState, { type: WS_CONNECTION_SUCCESS })).toEqual(
      state
    );
  });

  test('should handle WS_CONNECTION_ERROR', () => {
    const state = {
      ...initialState,
      wsConnected: false,
      wsFailed: true,
    };
    expect(wsReducer(initialState, { type: WS_CONNECTION_ERROR })).toEqual(
      state
    );
  });

  test('should handle WS_CONNECTION_CLOSED', () => {
    const state = {
      ...initialState,
    };
    expect(wsReducer(initialState, { type: WS_CONNECTION_CLOSED })).toEqual(
      state
    );
  });
  test('should handle WS_CONNECTION_END', () => {
    const state = {
      ...initialState,
    };
    expect(wsReducer(initialState, { type: WS_CONNECTION_END })).toEqual(state);
  });
  test('should handle WS_GET_DATA', () => {
    const state = {
      ...initialState,
      feed: orders,
      totalOrders: 0,
      totalToday: 0,
    };
    expect(
      wsReducer(initialState, {
        type: WS_GET_DATA,
        payload: { success: true, orders: orders, totalToday: 0, total: 0 },
      })
    ).toEqual(state);
  });
});
