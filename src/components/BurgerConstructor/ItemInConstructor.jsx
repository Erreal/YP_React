import React from 'react';
import {
  DragIcon,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
import constructorStyles from './BurgerConstructor.module.css';
import { useDrag, useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { MOVE_ITEM } from '../../services/actions/basket';
import { useSelector } from 'react-redux';

const ItemInConstructor = (props) => {
  const basket = useSelector((store) => store.basket);
  const dispatch = useDispatch();
  const [, dragItem] = useDrag({
    type: 'sort',
    item: props.item,
  });
  const [, dropTarget] = useDrop({
    accept: 'sort',
    drop(item) {
      sortBasketOnMove(props.index, item);
    },
  });
  const sortBasketOnMove = (index, item) => {
    const sortedBasket = basket.items.filter((obj) => obj.id !== item.id);
    sortedBasket.splice(index, 0, item);
    dispatch({ type: MOVE_ITEM, items: sortedBasket });
  };
  return (
    <div ref={dropTarget}>
      <div className={constructorStyles.constructorItem} ref={dragItem}>
        <DragIcon type="primary" />
        <ConstructorElement
          text={props.item.name}
          price={props.item.price}
          thumbnail={props.item.image}
          handleClose={() => props.deleteItem(props.item)}
        />
      </div>
    </div>
  );
};
export default ItemInConstructor;
