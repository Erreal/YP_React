import React, { useEffect, useMemo } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import appStyles from './App.module.css';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import { useDispatch, useSelector } from 'react-redux';
import { getItems } from '../../services/actions/ingredients';
import { Loader } from '../Loader/loader';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

function App() {
  const { ingredients } = useSelector((store) => store);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  const content = useMemo(() => {
    return ingredients.itemsRequest ? (
      <Loader size="large" />
    ) : (
      <>
        <BurgerIngredients /><BurgerConstructor />
      </>
    );
  }, [ingredients.itemsRequest]);

  return (
    <>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <main className={appStyles.container}>{content}</main>
      </DndProvider>
    </>
  );
}

export default App;
