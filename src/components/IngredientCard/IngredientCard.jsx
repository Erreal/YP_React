import React from 'react';
import ingredientCardStyles from './IngredientCard.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientType from '../../utils/types';

const IngredientCard = (props) => {
  return (
    <>
      <div
        className={`${ingredientCardStyles.card} mt-6 mb-8`}
        onClick={() => {
          props.setPopup(props.item);
          props.onClick();
        }}
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
    </>
  );
};

IngredientCard.propTypes = {
  item: ingredientType.isRequired,
};

export default IngredientCard;
