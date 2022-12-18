import { ORDER_REQUEST, ORDER_SUCESS, ORDER_FAILED} from "../actions/order";
import { initialState } from "./app";

export const order = (state = initialState.order, action) => {
    switch (action.type) {
        case ORDER_REQUEST: {
          return {
            ...state,
            itemsRequest: true
          };
        }
        case ORDER_SUCESS: {
          return { ...state, orderFailed: false, items: action.items, orderRequest: false };
        }
        case ORDER_FAILED: {
          return { ...state, orderFailed: true, orderRequest: false };
        }
        default: 
        return state;
    }
}