import { ORDER_REQUEST, ORDER_SUCESS, ORDER_FAILED} from "../actions/order";
import { initialState } from "./app";

export const order = (state = initialState.order, action) => {
    switch (action.type) {
        case ORDER_REQUEST: {
          return {
            ...state,
            orderRequest: true
          };
        }
        case ORDER_SUCESS: {
          return { ...state, orderFailed: false, name: action.name, number: action.number, orderRequest: false };
        }
        case ORDER_FAILED: {
          return { ...state, orderFailed: true, orderRequest: false };
        }
        default: 
        return state;
    }
}