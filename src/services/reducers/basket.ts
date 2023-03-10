import {
  RESET,
  ADD_ITEM,
  ADD_BUN,
  DELETE_ITEM,
  MOVE_ITEM,
} from '../actions/basket';
import { INITIAL_STATE } from '../../utils/constants';
import { IIngredientParams } from '../../utils/types';
import { TBasketActions } from '../actions/basket';

export const basketReducer = (state = INITIAL_STATE.basket, action: TBasketActions) => {
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
        items: state.items.filter((item: IIngredientParams) => item.id !== action.id),
        itemsPrice: state.itemsPrice - action.price,
      };
    case MOVE_ITEM:
      let sortedItems = [...state.items];
      sortedItems.splice(
        action.target,
        0,
        sortedItems.splice(action.item, 1)[0]
      );
      return {
        ...state,
        items: sortedItems,
      };
    case RESET:
      return INITIAL_STATE.basket;
    default:
      return state;
  }
};
