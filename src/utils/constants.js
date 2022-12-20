export const API_URL = 'https://norma.nomoreparties.space/api';
export const EMPTY_BUN_TEXT = 'Поместите булку в конструктор';
export const DETAIL_HEADER = 'Детали ингредиента';
export const INGREDIENTS_TYPES = [
    {
      name: 'Булки',
      type: 'bun',
      place: '0',
    },
    {
      name: 'Начинки',
      type: 'main',
      place: '1',
    },
    {
      name: 'Соусы',
      type: 'sauce',
      place: '2',
    },
  ];
  export const INITIAL_STATE = {
    ingredients: {
      items: [],
      itemsRequest: false,
      itemsFailed: false,
      currentIngredient: {}
    },
    basket: {
      bun: {},
      bunPrice: 0,
      items: [],
      itemsPrice: 0,
    },
    order: {
      name: '',
      number: 0,
      orderRequest: false,
      orderFailed: false,
    },
  };