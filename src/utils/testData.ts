export const firstIngredient = {
  id: '',
  _id: 'someid',
  calories: 0,
  fat: 0,
  carbohydrates: 0,
  image: '',
  image_large: '',
  image_mobile: '',
  name: 'name',
  price: 20,
  proteins: 0,
  type: '',
  __v: 0,
};
const secondIngredient = {
  id: '',
  _id: 'someotherid',
  calories: 0,
  fat: 0,
  carbohydrates: 0,
  image: '',
  image_large: '',
  image_mobile: '',
  name: 'other name',
  price: 30,
  proteins: 0,
  type: '',
  __v: 0,
};
export const testIngredients = [
  { ...firstIngredient },
  { ...secondIngredient },
];
export const testOrder = {
  _id: 'someid',
  number: 0,
  name: 'some name',
  ingredients: ['someids', 'moreids'],
  status: '',
  index: 0,
  createdAt: '',
};
export const testOrders = [testOrder];
