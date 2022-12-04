import React from "react";
import ingredientDatelesStyles from "./IngredientDetails.module.css";
import PropTypes from "prop-types";

const IngredientDetails = (props) => {
  return (
    <>
      <img
        src={props.image}
        title={props.name}
        alt={props.name}
        className={ingredientDatelesStyles.image}
      />
      <h4
        className={`${ingredientDatelesStyles.title} text text_type_main-medium mt-4 mb-8`}
      >
        {props.name}
      </h4>
      <div
        className={`${ingredientDatelesStyles.parametrsWrapper} text text_type_main-default text_color_inactive`}
      >
        <div className={ingredientDatelesStyles.ingredient}>
          <p>Калории,ккал</p>
          <p>{props.calories}</p>
        </div>
        <div className={ingredientDatelesStyles.ingredient}>
          <p>Белки, г</p>
          <p>{props.proteins}</p>
        </div>
        <div className={ingredientDatelesStyles.ingredient}>
          <p>Жиры, г</p>
          <p>{props.fat}</p>
        </div>
        <div className={ingredientDatelesStyles.ingredient}>
          <p>Углеводы, г</p>
          <p>{props.carbohydrates}</p>
        </div>
      </div>
    </>
  );
};

IngredientDetails.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  calories: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
};

export default IngredientDetails;
