import {
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
import { placeOrder } from '../../services/actions/order';
import { useDrop } from 'react-dnd';
import ItemInConstructor from './ItemInConstructor';
import uuid from 'react-uuid';
import { EMPTY_BUN_TEXT, EMPTY_ORDER } from '../../utils/constants';

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

  const clickOrder = () => {
    let ingredientsIds = [
      basket.bun._id,
      ...basket.items.map((item) => item._id),
      basket.bun._id,
    ];
    if (!Object.keys(basket.bun).length || basket.items.length === 0) {
      alert(EMPTY_ORDER);
      return;
    }
    dispatch(placeOrder(ingredientsIds));
    dispatch({ type: RESET });
  };

  return (
    <section
      className={`${constructorStyles.mainsection} pt-25 ml-10`}
      ref={dropTarget}
    >
      {Object.keys(ingredients).length && (
        <>
          <div className={`${constructorStyles.constructorWrapper} mb-10`}>
            <div className={constructorStyles.constructorBunItem}>
              {Object.keys(basket.bun).length ? (
                <BunInConstructor
                  type="top"
                  text="(верх)"
                  bun={basket.bun}
                  ingredients={ingredients}
                />
              ) : (
                <p className={constructorStyles.emptyBunTop}>
                  {EMPTY_BUN_TEXT}
                </p>
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
              {Object.keys(basket.bun).length ? (
                <BunInConstructor
                  type="bottom"
                  text="(низ)"
                  bun={basket.bun}
                  ingredients={ingredients}
                />
              ) : (
                <p className={constructorStyles.emptyBunBottom}>
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
