import React, { useEffect } from 'react';
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import constructorStyles from './BurgerConstructor.module.css';
import { API_URL } from '../../utils/constants';
import { requestData } from '../../utils/requestApi';
import BunInConstructor from './BunInConstructor';
import { useSelector, useDispatch} from 'react-redux';
import { ADD_BUN, RESET } from '../../services/actions/basket';
import { OPEN_MODAL } from '../../services/actions/modal';
import { ORDER_FAILED, ORDER_SUCESS } from '../../services/actions/order';

const BurgerConstructor = () => {
  const ingredients = useSelector(store => store.ingredients.items);
  const basket = useSelector(store => store.basket);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (Object.keys(ingredients).length && !Object.keys(basket.bun).length) {
      const item = ingredients.find((ingredient) => ingredient.type === 'bun');
      dispatch({ type: ADD_BUN, bun: item, price: item.price });
    }
  }, [ingredients, dispatch, basket.bun]);

  const placeOrder = () => {
    let request = basket.items.map((item) => item._id);
    request.push(basket.bun._id);
    const orderUrl = `${API_URL}/orders`;
    requestData(orderUrl, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ingredients: request,
      }),
    })
      .then((data) => {
        if (data.success) {
          dispatch({
            type: ORDER_SUCESS,
            number: data.order.number,
            name: data.name,
          });
          dispatch({ type: RESET });
          dispatch({type: OPEN_MODAL, view: 'order', item:{}})
        } else {
          dispatch({
            type: ORDER_FAILED
          });
        }
      })
      .catch((error) => console.error(error));
  };

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
              onClick={placeOrder}
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
