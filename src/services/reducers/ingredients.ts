import { combineReducers } from 'redux';
import { basketReducer } from './basket';
import { orderReducer } from './order';
import { authReducer } from './auth';
import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,
  SET_CURRENT_ITEM,
  RESET_CURRENT_ITEM,
  TIngredientsActions,
} from '../actions/ingredients';
import { wsReducer } from './websocket';
import { IIngredientParams } from '../../utils/types';

const ingredients: {
  items: Array<IIngredientParams>;
  itemsRequest: boolean;
  itemsFailed: boolean;
  currentIngredient: object;
} = {
  items: [],
  itemsRequest: false,
  itemsFailed: false,
  currentIngredient: {},
}

const ingredientsReducer = (state = ingredients, action: TIngredientsActions) => {
  switch (action.type) {
    case GET_ITEMS_REQUEST: {
      return {
        ...state,
        itemsRequest: true,
      };
    }
    case GET_ITEMS_SUCCESS: {
      return {
        ...state,
        itemsFailed: false,
        items: action.items,
        itemsRequest: false,
      };
    }
    case GET_ITEMS_FAILED: {
      return { ...state, itemsFailed: true, itemsRequest: false };
    }
    case SET_CURRENT_ITEM: {
      return { ...state, currentIngredient: action.item };
    }
    case RESET_CURRENT_ITEM: {
      return {
        ...state,
        currentIngredient: ingredients.currentIngredient,
      };
    }
    default:
      return state;
  }
};
export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  basket: basketReducer,
  order: orderReducer,
  user: authReducer,
  websocket: wsReducer,
});
export type TStateReducer = ReturnType<typeof rootReducer>;
