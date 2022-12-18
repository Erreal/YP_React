import { RESET, ADD_ITEM, ADD_BUN } from "../actions/basket";
import { initialState } from "./app";

export const basket = (state = initialState.basket, action) => {
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
      case RESET:
        return initialState.basket;
      default:
        return state;
    }
  };