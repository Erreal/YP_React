export const API_URL = 'https://norma.nomoreparties.space/api';
export const EMPTY_BUN_TEXT = 'Поместите булку в конструктор';
export const EMPTY_ORDER = 'Соберите бургер для заказа';
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
export const ROUTES = {
  MAIN:'/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASS: '/forgot-password',
  RESET_PASS: '/reset-password',
  PROFILE: '/profile',
  PROFILE_ORDERS: '/profile/orders',
  INGREDIENT: '/ingredients/:id',
  FEED: '/feed'
}
export const INITIAL_STATE = {
  ingredients: {
    items: [],
    itemsRequest: false,
    itemsFailed: false,
    currentIngredient: {},
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
  user: {
    auth: false,
    name: '',
    email: '',
    password: '',
    token: '',
    orders: [],
    loginRequest: false,
    loginFailed: false,
    registrationRequest: false,
    registrationFailed: false,
    logoutRequest: false,
    logoutFailed: false,
    getUserRequest: false,
    getUserFailed: false,
    updateUserRequest: false,
    updateUserFailed: false,
    tokenRequest: false,
    tokenFailed: false,
    resetRequest: false,
    resetSuccess: false,
    resetFailed: false,
    setPasswdRequest: false,
    setPasswdSuccess: false,
    setPasswdFailed: false,
  },
};
