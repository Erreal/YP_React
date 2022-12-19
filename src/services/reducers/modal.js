import { OPEN_MODAL, CLOSE_MODAL } from '../actions/modal';
import { initialState } from './app';

export const modal = (state = initialState.modal, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        isOpen: true,
        view: action.view,
        item: action.item,
        header: action.header,
      };
    case CLOSE_MODAL:
      return {
        ...state,
        isOpen: false,
      };
    default:
      return state;
  }
};
