import React from 'react';
import ingredientDatelesStyles from './IngredientDetails.module.css';
import ingredientType from '../../utils/types';

const IngredientDetails = (props) => {
  return (
    <>
      <img
        src={props.item.image}
        title={props.item.name}
        alt={props.item.name}
        className={ingredientDatelesStyles.image}
      />
      <h4
        className={`${ingredientDatelesStyles.title} text text_type_main-medium mt-4 mb-8`}
      >
        {props.item.name}
      </h4>
      <div
        className={`${ingredientDatelesStyles.parametrsWrapper} text text_type_main-default text_color_inactive`}
      >
        <div className={ingredientDatelesStyles.ingredient}>
          <p>Калории,ккал</p>
          <p>{props.item.calories}</p>
        </div>
        <div className={ingredientDatelesStyles.ingredient}>
          <p>Белки, г</p>
          <p>{props.item.proteins}</p>
        </div>
        <div className={ingredientDatelesStyles.ingredient}>
          <p>Жиры, г</p>
          <p>{props.item.fat}</p>
        </div>
        <div className={ingredientDatelesStyles.ingredient}>
          <p>Углеводы, г</p>
          <p>{props.item.carbohydrates}</p>
        </div>
      </div>
    </>
  );
};

IngredientDetails.propTypes = {
  item: ingredientType.isRequired,
};

export default IngredientDetails;
