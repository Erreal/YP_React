import { requestData } from '../../utils/requestApi';
import { API_URL } from '../../utils/constants';
import { Dispatch } from 'redux';
import { TApplicationActions } from '../store';

export const GET_ITEMS_REQUEST: 'GET_ITEMS_REQUEST' = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS: 'GET_ITEMS_SUCCESS' = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED: 'GET_ITEMS_FAILED' = 'GET_ITEMS_FAILED';
export const SET_CURRENT_ITEM: 'SET_CURRENT_ITEM' = 'SET_CURRENT_ITEM';
export const RESET_CURRENT_ITEM: 'RESET_CURRENT_ITEM' = 'RESET_CURRENT_ITEM';

export interface IGetItemsRequest {
  readonly type: typeof GET_ITEMS_REQUEST;
}
export interface IGetItemsSuccess {
  readonly type: typeof GET_ITEMS_SUCCESS;
}
export interface IGetItemsFailed {
  readonly type: typeof GET_ITEMS_FAILED;
}
export interface ISetCurrentItem {
  readonly type: typeof SET_CURRENT_ITEM;
}
export interface IResetCurrentItem {
  readonly type: typeof RESET_CURRENT_ITEM;
}

export type TIngredientsActions =
  | IGetItemsRequest
  | IGetItemsSuccess
  | IGetItemsFailed
  | ISetCurrentItem
  | IResetCurrentItem;  

type TIngredientsDispatch = Dispatch<TApplicationActions>; 

const dataUrl = `${API_URL}/ingredients`;

export const getItems = () => (dispatch: TIngredientsDispatch) => {
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
      .catch(() => {
        dispatch({
          type: GET_ITEMS_FAILED,
        });
      }
      );
  };

