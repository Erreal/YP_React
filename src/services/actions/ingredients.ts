import { requestData } from '../../utils/requestApi';
import { API_URL } from '../../utils/constants';
import { Dispatch } from 'redux';
import { TApplicationActions } from '../store';
import { IIngredientParams } from '../../utils/types';

export const GET_ITEMS_REQUEST: 'GET_ITEMS_REQUEST' = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS: 'GET_ITEMS_SUCCESS' = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED: 'GET_ITEMS_FAILED' = 'GET_ITEMS_FAILED';
export const SET_CURRENT_ITEM: 'SET_CURRENT_ITEM' = 'SET_CURRENT_ITEM';

export interface IIngredientsInit {
  readonly type: null;
}
export interface IGetItemsRequest {
  readonly type: typeof GET_ITEMS_REQUEST;
}
export interface IGetItemsSuccess {
  readonly type: typeof GET_ITEMS_SUCCESS;
  items: Array<IIngredientParams>;
}
export interface IGetItemsFailed {
  readonly type: typeof GET_ITEMS_FAILED;
}
export interface ISetCurrentItem {
  readonly type: typeof SET_CURRENT_ITEM;
  item: IIngredientParams;
}

export type TIngredientsActions =
  | IGetItemsRequest
  | IGetItemsSuccess
  | IGetItemsFailed
  | ISetCurrentItem
  | IIngredientsInit;  

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

