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
import { ADD_BUN, RESET } from '../../services/actions/basket';
import { OPEN_MODAL } from '../../services/actions/modal';
import { placeOrder } from '../../services/actions/order';

const BurgerConstructor = () => {
  const ingredients = useSelector((store) => store.ingredients.items);
  const basket = useSelector((store) => store.basket);
  const dispatch = useDispatch();

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
    <section className={`${constructorStyles.mainsection} pt-25 ml-10`}>
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
                    <div
                      className={constructorStyles.constructorItem}
                      key={index}
                    >
                      <DragIcon type="primary" />
                      <ConstructorElement
                        text={item.name}
                        price={item.price}
                        thumbnail={item.image}
                      />
                    </div>
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
