import { API_URL } from '../../utils/constants';
import { requestData } from '../../utils/requestApi';
import { Dispatch } from 'redux';
import { TApplicationActions } from '../store';

export const ORDER_SUCESS:'ORDER_SUCESS' = 'ORDER_SUCESS';
export const ORDER_FAILED:'ORDER_FAILED' = 'ORDER_FAILED';
export const ORDER_REQUEST:'ORDER_REQUEST' = 'ORDER_REQUEST';
export const ORDER_RESET:'ORDER_RESET' = 'ORDER_RESET';

export interface IOrderSuccess {
  readonly type: typeof ORDER_SUCESS;
  name: string;
  number: number;
}
export interface IOrderFailed {
  readonly type: typeof ORDER_FAILED;
}
export interface IOrderRequest {
  readonly type: typeof ORDER_REQUEST;
}
export interface IOrderReset {
  readonly type: typeof ORDER_RESET;
}

export type TOrderActions =
  | IOrderSuccess
  | IOrderFailed
  | IOrderRequest
  | IOrderReset;  

type TOrderDispatch = Dispatch<TApplicationActions>; 
const dataUrl = `${API_URL}/orders`;

export const placeOrder = (request: Array<string>) => (dispatch: TOrderDispatch) => {
    dispatch({
      type: ORDER_REQUEST,
    });
    requestData(dataUrl, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ingredients: request,
      }),
    })
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: ORDER_SUCESS,
            name: res.name,
            number: res.order.number,
          });
        } else {
          return Promise.reject(`Ошибка ${res.status}`);
        }
      })
      .catch(() => {
        dispatch({
          type: ORDER_FAILED,
        })
      }
      );
  };

