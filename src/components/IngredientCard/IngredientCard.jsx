import React from 'react';
import ingredientCardStyles from './IngredientCard.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientType from '../../utils/types';
import {useSelector, useDispatch} from 'react-redux';
import { OPEN_MODAL } from '../../services/actions/modal';

const IngredientCard = (props) => {
  const dispatch = useDispatch();

    

  return (
    <>
      <div
        className={`${ingredientCardStyles.card} mt-6 mb-8`}
        onClick={()=>dispatch({
          type: OPEN_MODAL,
          view: 'detale',
          item: props.item
        })}
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
