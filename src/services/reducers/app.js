export const initialState = {
  ingredients: {
    items: [],
    itemsRequest: false,
    itemsFailed: false,
  },
  basket: {
    bun: {},
    bunPrice: 0,
    items: [],
    itemsPrice: 0,
  },
  modal: {
    isOpen: false,
    data: {},
    view: '',
    header: '',
  },
  order: {
    name: '',
    number: 0,
    orderRequest: false,
    orderFailed: false,
  },
};
