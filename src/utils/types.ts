import { ReactNode } from 'react';
import { Location } from 'history';

export interface ILocationState {
  background: Location;
  from: {
    pathname: string;
  };
}
export interface IIngredients {
  ingredients: {
    items: Array<IIngredientParams>;
    itemsRequest: boolean;
    itemsFailed: boolean;
    currentIngredient: IIngredientParams;
  };
}
export interface IBusket {
  basket: {
    bun: IIngredientParams;
    bunPrice: number;
    items: Array<IIngredientParams>;
    itemsPrice: number;
  };
}
export interface IBunInConstructor {
  type: 'top' | 'bottom' | undefined;
  text?: string;
  bun: IIngredientParams;
}
export interface IItemInConstructor {
  item: IIngredientParams;
  deleteItem: Function;
  index: number;
  key?: string;
}
export interface IIngredientCard {
  key?: string;
  item: IIngredientParams;
}
export interface IIngredientParams {
  id?: string;
  _id: string;
  calories?: number;
  fat?: number;
  carbohydrates?: number;
  image: string;
  image_large?: string;
  image_mobile?: string;
  name: string;
  price: number;
  proteins?: number;
  type?: string;
  __v?: number;
}
export interface IModal {
  onClose: () => void;
  title?: string;
  children: ReactNode;
}
export interface IModalOverlay {
  onClose: () => void;
  children: ReactNode;
}
export interface IOrderDetails {
  name?: string;
  number: number;
}
