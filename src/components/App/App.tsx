import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import data from '../../utils/data';
import appStyles from './App.module.css';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

function App() {
  return (
    <>
      <AppHeader />
      <main className={appStyles.container}>
        <BurgerIngredients data={data} />
        <BurgerConstructor />
      </main>
    </>
  );
}

export default App;
