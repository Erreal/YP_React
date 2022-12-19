import React from 'react';
import ingredientCardStyles from './IngredientCard.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientType from '../../utils/types';
import { useDispatch } from 'react-redux';
import { OPEN_MODAL } from '../../services/actions/modal';
import { useDrag } from 'react-dnd/dist/hooks';

const IngredientCard = (props) => {
  const dispatch = useDispatch();
  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: props.item,
  });
  return (
    <div
      className={`${ingredientCardStyles.card} mt-6 mb-8`}
      ref={dragRef}
      onClick={() =>
        dispatch({
          type: OPEN_MODAL,
          view: 'detail',
          item: props.item,
          header: 'Детали ингредиента',
        })
      }
    >
      <img
        className={ingredientCardStyles.cardimage}
        src={props.item.image}
        alt={props.item.name}
      />
      <div className={ingredientCardStyles.cardprice}>
        <span className="text text_type_digits-default">
          {props.item.price}
        </span>
        <CurrencyIcon type="primary" />
      </div>
      <p className={ingredientCardStyles.cardname}>{props.item.name}</p>
    </div>
  );
};

IngredientCard.propTypes = {
  item: ingredientType.isRequired,
};

export default IngredientCard;
