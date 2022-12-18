import { combineReducers } from 'redux';
import { modal } from './modal';
import { basket } from './basket';
import { order } from './order';
import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,
} from '../actions';
import { initialState } from './app';

const ingredients = (state = initialState.ingredients, action) => {
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
    default:
      return state;
  }
};
export const rootReducer = combineReducers({
  ingredients,
  basket,
  modal,
  order,
});
