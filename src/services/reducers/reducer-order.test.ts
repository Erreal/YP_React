import { expect, test } from '@jest/globals';
import { INITIAL_STATE } from '../../utils/constants';
import {
  ORDER_REQUEST,
  ORDER_SUCESS,
  ORDER_FAILED,
  ORDER_RESET,
} from '../actions/order';
import { orderReducer } from './order';

const initialState = INITIAL_STATE.order;

describe('Redux order store', () => {
  test('Should return the initial state', () => {
    expect(orderReducer(undefined, { type: null })).toEqual(initialState);
  });

  test('should handle ORDER_REQUEST', () => {
    const state = {
      ...initialState,
      orderRequest: true,
      modalShow: true,
    };
    expect(orderReducer(initialState, { type: ORDER_REQUEST })).toEqual(state);
  });

  test('should handle ORDER_SUCESS', () => {
    const state = {
      ...initialState,
      orderFailed: false,
      name: 'name',
      number: 0,
      orderRequest: false,
    };
    expect(
      orderReducer(initialState, {
        type: ORDER_SUCESS,
        name: 'name',
        number: 0,
      })
    ).toEqual(state);
  });

  test('should handle ORDER_FAILED', () => {
    const state = {
      ...initialState,
      orderFailed: true,
      orderRequest: false,
    };
    expect(orderReducer(initialState, { type: ORDER_FAILED })).toEqual(state);
  });

  test('should handle ORDER_RESET', () => {
    const state = {
      ...initialState,
    };
    expect(orderReducer(initialState, { type: ORDER_RESET })).toEqual(state);
  });
});
