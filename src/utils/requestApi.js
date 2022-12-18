const checkResponse = (response) => {
  if (response.ok) {
    console.log('request success');
    return response.json();
  }
  return Promise.reject(`Ошибка ${response.status}`);
};

export const requestData = (url, options) => {
  console.log('request start');
  return fetch(url, options).then(checkResponse);
};
