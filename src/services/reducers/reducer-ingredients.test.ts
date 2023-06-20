import { expect, test } from '@jest/globals';
import { firstIngredient, testIngredients } from '../../utils/testData';
import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,
  SET_CURRENT_ITEM,
} from '../actions/ingredients';
import { ingredients, ingredientsReducer } from './ingredients';

const initialState = ingredients;
const items = testIngredients;
const item = firstIngredient;

describe('Redux ingredients store', () => {
  test('Should return the initial state', () => {
    expect(ingredientsReducer(undefined, { type: null })).toEqual(initialState);
  });

  test('should handle GET_ITEMS_REQUEST', () => {
    const state = {
      ...initialState,
      itemsRequest: true,
    };
    expect(
      ingredientsReducer(initialState, { type: GET_ITEMS_REQUEST })
    ).toEqual(state);
  });

  test('should handle GET_ITEMS_SUCCESS', () => {
    const state = {
      ...initialState,
      itemsFailed: false,
      items: items,
      itemsRequest: false,
    };
    expect(
      ingredientsReducer(initialState, {
        type: GET_ITEMS_SUCCESS,
        items: items,
      })
    ).toEqual(state);
  });

  test('should handle GET_ITEMS_FAILED', () => {
    const state = {
      ...initialState,
      itemsFailed: true,
      itemsRequest: false,
    };
    expect(
      ingredientsReducer(initialState, { type: GET_ITEMS_FAILED })
    ).toEqual(state);
  });

  test('should handle SET_CURRENT_ITEM', () => {
    const state = {
      ...initialState,
      currentIngredient: item,
    };
    expect(
      ingredientsReducer(initialState, { type: SET_CURRENT_ITEM, item: item })
    ).toEqual(state);
  });
});
