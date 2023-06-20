import { FC } from 'react';
import {
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import constructorStyles from './BurgerConstructor.module.css';
import { BunInConstructor } from './BunInConstructor';
import {
  ADD_BUN,
  ADD_ITEM,
  DELETE_ITEM,
  RESET,
} from '../../services/actions/basket';
import { placeOrder } from '../../services/actions/order';
import { useDrop } from 'react-dnd';
import ItemInConstructor from './ItemInConstructor';
import uuid from 'react-uuid';
import { EMPTY_BUN_TEXT, EMPTY_ORDER, ROUTES } from '../../utils/constants';
import { useHistory } from 'react-router-dom';
import {  IIngredientParams } from '../../utils/types';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';

const BurgerConstructor: FC = () => {
  const ingredients = useAppSelector((store) => store.ingredients.items);
  const basket = useAppSelector((store) => store.basket);
  const autorized = useAppSelector((store) => store.user.auth);
  const dispatch = useAppDispatch();
  const history = useHistory();

  const onDrop = (item: { type: string; price: number }) => {
    item.type === 'bun'
      ? dispatch({ type: ADD_BUN, bun: item, price: item.price })
      : dispatch({
          type: ADD_ITEM,
          item: { ...item, id: uuid() },
          price: item.price,
        });
  };
  const deleteItem = (item: { id: string; price: number }) => {
    dispatch({ type: DELETE_ITEM, id: item.id, price: item.price });
  };
  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item: { type: string; price: number }) {
      onDrop(item);
    },
  });

  const clickOrder = () => {
    let ingredientsIds = [
      basket.bun._id,
      ...basket.items.map((item: { _id: string }) => item._id),
      basket.bun._id,
    ];
    if (!Object.keys(basket?.bun).length || basket.items.length === 0) {
      alert(EMPTY_ORDER);
      return;
    }
    if (autorized) {
      dispatch(placeOrder(ingredientsIds));
      dispatch({ type: RESET });
    } else {
      history.push(ROUTES.LOGIN);
    }
  };

  return (
    <section
      className={`${constructorStyles.mainsection} pt-25 ml-10`}
      ref={dropTarget}
      data-test-id="drop-container"
    >
      {Object.keys(ingredients).length && (
        <>
          <div className={`${constructorStyles.constructorWrapper} mb-10`}>
            <div className={constructorStyles.constructorBunItem}>
              {basket.bun.price !== 0 ? (
                <BunInConstructor type="top" text="(верх)" bun={basket.bun} />
              ) : (
                <p className={constructorStyles.emptyBunTop}>
                  {EMPTY_BUN_TEXT}
                </p>
              )}
            </div>
            <div className={constructorStyles.constructorInner} data-test-id="constructor-inner">
              {Object.keys(basket.items).length
                ? basket.items.map((item: IIngredientParams, index: number) => (
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
              {basket.bun.price !== 0 ? (
                <BunInConstructor type="bottom" text="(низ)" bun={basket.bun} />
              ) : (
                <p className={constructorStyles.emptyBunBottom} data-test-id="empty-bun">
                  {EMPTY_BUN_TEXT}
                </p>
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
              data-test-id="order-button"
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
