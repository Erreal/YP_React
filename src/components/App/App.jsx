import React, { useReducer } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import appStyles from './App.module.css';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import { Basket, Ingredients } from '../../utils/appContext';

function App() {
  const basketInitialState = {
    bun: {},
    bunPrice: 0,
    items: [],
    itemsPrice: 0,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'addBun':
        return {
          ...state,
          bun: action.bun,
          bunPrice: action.price * 2,
        };
      case 'addItem':
        return {
          ...state,
          items: [...state.items, action.item],
          itemsPrice: state.itemsPrice + action.price,
        };
      case 'reset':
        return basketInitialState;
      default:
        return state;
    }
  };
  const [basket, basketDispatcher] = useReducer(reducer, basketInitialState);

  return (
    <>
      <AppHeader />
      <main className={appStyles.container}>
        <Basket.Provider value={{ basket, basketDispatcher }}>
          <Ingredients>
            <BurgerIngredients />
            <BurgerConstructor />
          </Ingredients>
        </Basket.Provider>
      </main>
    </>
  );
}

export default App;
