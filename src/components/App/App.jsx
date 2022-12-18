import React, { useEffect, useMemo } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import appStyles from './App.module.css';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import { useDispatch, useSelector } from 'react-redux';
import OrderDetails from '../OrderDetails/OrderDetails';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { CLOSE_MODAL } from '../../services/actions/modal';
import { getItems } from '../../services/actions';
import { Loader } from '../Loader/loader';

function App() {
  const { order, modal, ingredients } = useSelector((store) => store);
  const dispatch = useDispatch();
  const onClose = () => {
    dispatch({ type: CLOSE_MODAL });
  };
  useEffect(() => {
    console.log('main request');
    dispatch(getItems());
  }, [dispatch]);

  const content = useMemo(() => {
    return ingredients.itemsRequest ? (
      <Loader size="large" />
    ) : (
      <>
        <BurgerIngredients />
        <BurgerConstructor />
      </>
    );
  }, [ingredients.itemsRequest]);

  const orderContent = useMemo(() => {
    return order.orderRequest ? (
      <Loader size="large" />
    ) : (
      <OrderDetails number={order.number} name={order.name} />
    );
  }, [order.orderRequest, order.number, order.name]);

  return (
    <>
      <AppHeader />
      <main className={appStyles.container}>{content}</main>
      {modal.isOpen && (
        <Modal onClose={onClose} title={modal.header}>
          {modal.view === 'order' ? (
            orderContent
          ) : modal.view === 'detale' ? (
            <IngredientDetails item={modal.item} />
          ) : null}
        </Modal>
      )}
    </>
  );
}

export default App;
