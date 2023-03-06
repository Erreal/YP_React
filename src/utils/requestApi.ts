import { API_URL } from './constants';

interface IResponseCheck {
  json(): any;
  status: number;
  ok: boolean;
}

const checkResponse = (response: IResponseCheck) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка ${response.status}`);
};

export const requestData = async (url: string, options?: object) => {
  const response = await fetch(url, options);
  return checkResponse(response);
};

export const refreshToken = async () => {
  const res = await requestData(`${API_URL}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
  });
  return await res;
};
