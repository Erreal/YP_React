import { rootReducer } from './reducers/ingredients';
import { compose, Action, ActionCreator } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { TBasketActions } from './actions/basket';
import { TIngredientsActions } from './actions/ingredients';
import { TOrderActions } from './actions/order';
import { TAuthActions } from './actions/auth';
import {
  TWSActions,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_END,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_DATA,
} from './actions/websocket';
import {
  socketMiddleware,

} from './middleware/wsmiddleware';

export type RootState = ReturnType<typeof store.getState>;

export type TApplicationActions =
  | TBasketActions
  | TIngredientsActions
  | TOrderActions
  | TAuthActions
  | TWSActions;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const wsActions: any = {
  wsConnect: WS_CONNECTION_START,
  wsDisconnect: WS_CONNECTION_END,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_DATA,
};

const ordersMiddleware = socketMiddleware(wsActions);


export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(ordersMiddleware);
  },
  devTools: process.env.NODE_ENV !== 'production',
});
