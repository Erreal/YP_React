import { API_URL } from '../../utils/constants';
import { requestData } from '../../utils/requestApi';

export const ORDER_SUCESS = 'ORDER_SUCESS';
export const ORDER_FAILED = 'ORDER_FAILED';
export const ORDER_REQUEST = 'ORDER_REQUEST';
export const ORDER_RESET = 'ORDER_RESET';

const dataUrl = `${API_URL}/orders`;

export function placeOrder(request: any[]) {
  return function (dispatch: (arg0: { type: string; name?: string; number?: number; }) => ((reason: any) => PromiseLike<never>) | null | undefined) {
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
      .catch(
        dispatch({
          type: ORDER_FAILED,
        })
      );
  };
}
