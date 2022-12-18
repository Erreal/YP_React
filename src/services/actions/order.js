import { API_URL } from '../../utils/constants';
import { requestData } from '../../utils/requestApi';

export const ORDER_SUCESS = 'ORDER_SUCESS';
export const ORDER_FAILED = 'ORDER_FAILED';
export const ORDER_REQUEST = 'ORDER_REQUEST';

const dataUrl = `${API_URL}/orders`;

export function placeOrder(request) {
  return function (dispatch) {
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
    }).then((res) => {
      if (res && res.success) {
        dispatch({
          type: ORDER_SUCESS,
          name: res.name,
          number: res.order.number,
        });
      } else {
        dispatch({
          type: ORDER_FAILED,
        });
      }
    });
  };
}
