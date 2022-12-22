import { requestData } from '../../utils/requestApi';
import { API_URL } from '../../utils/constants';

export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED';
export const SET_CURRENT_ITEM = 'SET_CURRENT_ITEM';
export const RESET_CURRENT_ITEM = 'RESET_CURRENT_ITEM';

const dataUrl = `${API_URL}/ingredients`;

export function getItems() {
  return function (dispatch) {
    dispatch({
      type: GET_ITEMS_REQUEST,
    });
    requestData(dataUrl)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_ITEMS_SUCCESS,
            items: res.data,
          });
        } else {
          return Promise.reject(`Ошибка ${res.status}`);
        }
      })
      .catch(
        dispatch({
          type: GET_ITEMS_FAILED,
        })
      );
  };
}
