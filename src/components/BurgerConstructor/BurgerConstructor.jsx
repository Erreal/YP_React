import React, { useState } from 'react';
import { useContext } from 'react';
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import constructorStyles from './BurgerConstructor.module.css';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import { Basket } from '../../utils/appContext';
import { useAPI } from '../../utils/appContext';
import ingredientType from '../../utils/types';
import PropTypes from 'prop-types';

const BurgerConstructor = () => {
  const { basket } = useContext(Basket);
  const [modal, setModal] = React.useState({ visible: false });
  const { ingredients } = useAPI();
  const [order, setOrder] = useState(null);
  const { basketDispatcher } = useContext(Basket);

  const handleOpenModal = () => {
    setModal({ visible: true });
  };

  const handleCloseModal = () => {
    setModal({ visible: false });
  };

  const placeOrder = () => {
    let request = basket.items.map((item) => item._id);
    request.push(basket.bun._id);
    const orderUrl = 'https://norma.nomoreparties.space/api/orders';
    fetch(orderUrl, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ingredients: request,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(`Error ${response.status}`);
      })
      .then((data) => {
        if (data.success) {
          setOrder({
            number: data.order.number,
            name: data.name,
          });
        } else {
          console.error('Server reject order');
        }
      })
      .catch((error) => console.error(error));
    basketDispatcher({ type: 'reset' });
    handleOpenModal();
  };
  return (
    <section className={`${constructorStyles.mainsection} pt-25 ml-10`}>
      {Object.keys(ingredients).length && (
        <>
          <div className={`${constructorStyles.constructorWrapper} mb-10`}>
            <div className={constructorStyles.constructorBunItem}>
              <BunInConstructor
                type="top"
                text="(верх)"
                bun={basket.bun}
                ingredients={ingredients}
              />
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
              <BunInConstructor
                type="bottom"
                text="(низ)"
                bun={basket.bun}
                ingredients={ingredients}
              />
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
      {modal.visible && order && (
        <Modal onClose={handleCloseModal}>
          <OrderDetails number={order.number} name={order.name} />
        </Modal>
      )}
    </section>
  );
};
const BunInConstructor = (props) => {
  const { basketDispatcher } = useContext(Basket);
  let item = {};
  if (Object.keys(props.bun).length) {
    item = props.bun;
  } else {
    item = props.ingredients.find((ingredient) => ingredient.type === 'bun');
    basketDispatcher({ type: 'addBun', bun: item, price: item.price });
  }

  return (
    <ConstructorElement
      type={props.type}
      isLocked={true}
      text={`${item.name} ${props.text}`}
      price={item.price}
      thumbnail={item.image}
    />
  );
};

BunInConstructor.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  bun: ingredientType.isRequired,
  ingredients: PropTypes.arrayOf(ingredientType),
};

export default BurgerConstructor;
