import { ReactNode } from 'react';
import { Location } from 'history';
import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
} from '@reduxjs/toolkit';

export interface ILocationState {
  background: Location;
  order: TOrderCard;
  from: {
    pathname: string;
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
  count?: number;
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
export interface IWsData {
  success: boolean;
  orders: Array<TOrderCard>;
  total: number;
  totalToday: number;
}
export type TwsActionTypes = {
  wsConnect: ActionCreatorWithPayload<any>;
  wsDisconnect: ActionCreatorWithoutPayload;
  onOpen: ActionCreatorWithoutPayload;
  onClose: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithoutPayload;
  onMessage: ActionCreatorWithPayload<any>;
};
export type TWsOrders = {
  feed: Array<IIngredientParams>;
  totalOrders: number;
  totalToday: number;
};
export type TWsState = {
  orders: TWsOrders;
  wsConnected: boolean;
  wsFailed: boolean;
};
export type TOrderCard = {
  _id: string;
  number: number;
  name: string;
  ingredients: Array<string>;
  status?: string;
  index: number;
  createdAt: string;
  showStatus?: boolean;
};
export type TPreventDefault = {
  preventDefault: () => void;
}