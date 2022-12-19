import React, { useEffect, useCallback } from 'react';
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import constructorStyles from './BurgerConstructor.module.css';
import BunInConstructor from './BunInConstructor';
import { useSelector, useDispatch } from 'react-redux';
import {
  ADD_BUN,
  ADD_ITEM,
  DELETE_ITEM,
  RESET,
} from '../../services/actions/basket';
import { OPEN_MODAL } from '../../services/actions/modal';
import { placeOrder } from '../../services/actions/order';
import { useDrop } from 'react-dnd';
import ItemInConstructor from './ItemInConstructor';
import uuid from 'react-uuid';

const BurgerConstructor = () => {
  const ingredients = useSelector((store) => store.ingredients.items);
  const basket = useSelector((store) => store.basket);
  const dispatch = useDispatch();

  const onDrop = (item) => {
    item.type === 'bun'
      ? dispatch({ type: ADD_BUN, bun: item, price: item.price })
      : dispatch({
          type: ADD_ITEM,
          item: { ...item, id: uuid() },
          price: item.price,
        });
  };
  const deleteItem = (item) => {
    dispatch({ type: DELETE_ITEM, id: item.id, price: item.price });
  };
  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item) {
      onDrop(item);
    },
  });

  useEffect(() => {
    if (Object.keys(ingredients).length && !Object.keys(basket.bun).length) {
      const item = ingredients.find((ingredient) => ingredient.type === 'bun');
      dispatch({ type: ADD_BUN, bun: item, price: item.price });
    }
  }, [ingredients, dispatch, basket.bun]);

  const clickOrder = useCallback(() => {
    let request = basket.items.map((item) => item._id);
    request.push(basket.bun._id);
    dispatch({ type: OPEN_MODAL, view: 'order' });
    dispatch(placeOrder(request));
    dispatch({ type: RESET });
  }, [dispatch, basket.bun._id, basket.items]);

  return (
    <section
      className={`${constructorStyles.mainsection} pt-25 ml-10`}
      ref={dropTarget}
    >
      {Object.keys(ingredients).length && (
        <>
          <div className={`${constructorStyles.constructorWrapper} mb-10`}>
            <div className={constructorStyles.constructorBunItem}>
              {Object.keys(basket.bun).length && (
                <BunInConstructor
                  type="top"
                  text="(верх)"
                  bun={basket.bun}
                  ingredients={ingredients}
                />
              )}
            </div>
            <div className={constructorStyles.constructorInner}>
              {Object.keys(basket.items).length
                ? basket.items.map((item, index) => (
                    <ItemInConstructor
                      item={item}
                      deleteItem={deleteItem}
                      index={index}
                      key={item.id}
                    />
                  ))
                : null}
            </div>
            <div className={constructorStyles.constructorBunItem}>
              {Object.keys(basket.bun).length && (
                <BunInConstructor
                  type="bottom"
                  text="(низ)"
                  bun={basket.bun}
                  ingredients={ingredients}
                />
              )}
            </div>
          </div>
          <div className={constructorStyles.checkout}>
            <span
              className={`${constructorStyles.checkoutTotal} text text_type_main-large`}
            >
              {basket.bunPrice + basket.itemsPrice}
              <CurrencyIcon type="primary" />
            </span>
            <Button
              onClick={clickOrder}
              htmlType="button"
              type="primary"
              size="large"
            >
              Оформить заказ
            </Button>
          </div>
        </>
      )}
    </section>
  );
};

export default BurgerConstructor;
