import { rootReducer } from './reducers/ingredients';
import { compose, applyMiddleware, createStore, Action, ActionCreator } from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';
import { TBasketActions } from './actions/basket';
import { TIngredientsActions } from './actions/ingredients';
import { TOrderActions } from './actions/order';
import { TAuthActions } from './actions/auth';

export type RootState = ReturnType<typeof store.getState>;

export type TApplicationActions =
| TBasketActions
| TIngredientsActions
| TOrderActions
| TAuthActions;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>; 
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));
export const store = createStore(rootReducer, enhancer);
