import {
  RESET,
  ADD_ITEM,
  ADD_BUN,
  DELETE_ITEM,
  MOVE_ITEM,
} from '../actions/basket';
import { INITIAL_STATE } from '../../utils/constants';

export const basketReducer = (state = INITIAL_STATE.basket, action) => {
  switch (action.type) {
    case ADD_BUN:
      return {
        ...state,
        bun: action.bun,
        bunPrice: action.price * 2,
      };
    case ADD_ITEM:
      return {
        ...state,
        items: [...state.items, action.item],
        itemsPrice: state.itemsPrice + action.price,
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.id),
        itemsPrice: state.itemsPrice - action.price,
      };
    case MOVE_ITEM:
      return {
        ...state,
        items: action.items,
      };
    case RESET:
      return INITIAL_STATE.basket;
    default:
      return state;
  }
};
