import { expect, test } from '@jest/globals';
import { basket, basketReducer } from './basket';
import {
  RESET,
  ADD_ITEM,
  ADD_BUN,
  DELETE_ITEM,
  MOVE_ITEM,
} from '../actions/basket';
import { firstIngredient, testIngredients } from '../../utils/testData';

const initialState = basket;
const ingredient = firstIngredient;
const ingredients = testIngredients;

describe('Redux busket store', () => {
  test('Should return the initial state', () => {
    expect(basketReducer(undefined, { type: null })).toEqual(initialState);
  });

  test('should handle ADD_BUN', () => {
    const state = {
      ...initialState,
      bun: ingredient,
      bunPrice: ingredient.price * 2,
    };
    expect(
      basketReducer(initialState, {
        type: ADD_BUN,
        bun: ingredient,
        price: ingredient.price,
      })
    ).toEqual(state);
  });

  test('should handle ADD_ITEM', () => {
    const state = {
      ...initialState,
      items: [...initialState.items, ingredient],
      itemsPrice: initialState.itemsPrice + ingredient.price,
    };
    expect(
      basketReducer(initialState, {
        type: ADD_ITEM,
        item: ingredient,
        price: ingredient.price,
      })
    ).toEqual(state);
  });

  test('should handle DELETE_ITEM', () => {
    const state = {
      ...initialState,
      items: initialState.items.filter((item) => item.id !== ingredient._id),
      itemsPrice: initialState.itemsPrice - ingredient.price,
    };
    expect(
      basketReducer(initialState, {
        type: DELETE_ITEM,
        id: ingredient._id,
        price: ingredient.price,
      })
    ).toEqual(state);
  });

  test('should handle MOVE_ITEM', () => {
    const storeBeforeMove = {
        ...initialState,
        items: ingredients,
    };
    const sortedState = ingredients.map(obj => {return {...obj}}).reverse();
    const state = {
      ...initialState,
      items: sortedState,
    };
    expect(
      basketReducer(storeBeforeMove, {
        type: MOVE_ITEM,
        target: 0,
        item: 1,
      })
    ).toEqual(state);
  });
  test('Should handle RESET', () => {
    const state = {
        ...initialState,
    }
    expect(basketReducer(initialState, { type: RESET })).toEqual(state)
})
});
