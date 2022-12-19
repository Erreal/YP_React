const checkResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка ${response.status}`);
};

export const requestData = (url, options) => {
  return fetch(url, options).then(checkResponse);
};
