import {
  ORDER_REQUEST,
  ORDER_SUCESS,
  ORDER_FAILED,
  ORDER_RESET,
  TOrderActions,
} from '../actions/order';
import { INITIAL_STATE } from '../../utils/constants';

export const orderReducer = (state = INITIAL_STATE.order, action: TOrderActions) => {
  switch (action.type) {
    case ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
        modalShow: true,
      };
    }
    case ORDER_SUCESS: {
      return {
        ...state,
        orderFailed: false,
        name: action.name,
        number: action.number,
        orderRequest: false,
      };
    }
    case ORDER_FAILED: {
      return { ...state, orderFailed: true, orderRequest: false };
    }
    case ORDER_RESET:
      return INITIAL_STATE.order;
    default:
      return state;
  }
};
