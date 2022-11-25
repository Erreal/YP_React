import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import data from '../../utils/data';
import appStyles from './App.module.css';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'

function App() {
  return (
    <>
      <AppHeader />
      <main className={appStyles.container}>
        <BurgerIngredients data={data} />
      </main>
    </>
  );
}

export default App;
