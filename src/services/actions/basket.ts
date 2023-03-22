import { IIngredientParams } from "../../utils/types";

export const ADD_BUN: 'ADD_BUN' = 'ADD_BUN';
export const ADD_ITEM: 'ADD_ITEM' = 'ADD_ITEM';
export const DELETE_ITEM: 'DELETE_ITEM' = 'DELETE_ITEM';
export const RESET: 'RESET' = 'RESET';
export const MOVE_ITEM: 'MOVE_ITEM' = 'MOVE_ITEM';
export interface IAddBun {
  readonly type: typeof ADD_BUN;
  bun: IIngredientParams;
  price: number;
}
export interface IAddItem {
  readonly type: typeof ADD_ITEM;
  item: IIngredientParams;
  price: number;
}
export interface IDeleteItem {
  readonly type: typeof DELETE_ITEM;
  id: string;
  price: number;
}
export interface IReset {
  readonly type: typeof RESET;
}
export interface IMoveItem {
  readonly type: typeof MOVE_ITEM;
  item: number;
  target: number;
}
export type TBasketActions =
  | IAddItem
  | IAddBun
  | IDeleteItem
  | IReset
  | IMoveItem;
