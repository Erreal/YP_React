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
} from '../actions/ingredients';
import { INITIAL_STATE } from '../../utils/constants';

const ingredientsReducer = (state = INITIAL_STATE.ingredients, action) => {
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
        currentIngredient: INITIAL_STATE.ingredients.currentIngredient,
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
});
