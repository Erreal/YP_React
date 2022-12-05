import React from 'react';
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import constructorStyles from './BurgerConstructor.module.css';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import ingredientType from '../../utils/types';

const BurgerConstructor = (props) => {
  const [basket, setBasket] = React.useState({
    totalPrice: props.basket.totalPrice,
    basketItems: props.basket.items,
  });
  const [modal, setModal] = React.useState({ visible: false });

  const handleOpenModal = () => {
    setModal({ visible: true });
  };

  const handleCloseModal = () => {
    setModal({ visible: false });
  };

  return (
    <section className={`${constructorStyles.mainsection} pt-25 ml-10`}>
      <div className={`${constructorStyles.constructorWrapper} mb-10`}>
        <div className={constructorStyles.constructorBunItem}>
          {basket.basketItems
            .filter((item) => item.type === 'bun')
            .map((item, index) => {
              return (
                <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={`${item.name} (верх)`}
                  price={item.price}
                  thumbnail={item.image}
                  key={index}
                />
              );
            })}
        </div>
        <div className={constructorStyles.constructorInner}>
          {basket.basketItems
            .filter((item) => item.type !== 'bun')
            .map((item, index) => (
              <div className={constructorStyles.constructorItem} key={index}>
                <DragIcon type="primary" />
                <ConstructorElement
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                />
              </div>
            ))}
        </div>
        <div className={constructorStyles.constructorBunItem}>
          {basket.basketItems
            .filter((item) => item.type === 'bun')
            .map((item, index) => {
              return (
                <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={`${item.name} (низ)`}
                  price={item.price}
                  thumbnail={item.image}
                  key={index}
                />
              );
            })}
        </div>
      </div>
      <div className={constructorStyles.checkout}>
        <span
          className={`${constructorStyles.checkoutTotal} text text_type_main-large`}
        >
          {basket.totalPrice}
          <CurrencyIcon type="primary" />
        </span>
        <Button
          onClick={handleOpenModal}
          htmlType="button"
          type="primary"
          size="large"
        >
          Оформить заказ
        </Button>
      </div>
      {modal.visible && (
        <Modal onClose={handleCloseModal}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
};

BurgerConstructor.propTypes = {
  basket: PropTypes.shape({
    totalPrice: PropTypes.number,
    items: PropTypes.arrayOf(ingredientType),
  }).isRequired,
};

export default BurgerConstructor;
