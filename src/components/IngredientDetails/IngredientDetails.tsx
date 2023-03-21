import React from 'react';
import ingredientDatelesStyles from './IngredientDetails.module.css';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';

const IngredientDetails = () => {
  const ingredients = useAppSelector((store) => store.ingredients.items);
  const { id } = useParams<{ id: string }>();
  const currentIngredient = ingredients.find((item) => item._id === id);
  return (
    <>
      {currentIngredient && (
        <>
          <img
            src={currentIngredient.image}
            title={currentIngredient.name}
            alt={currentIngredient.name}
            className={ingredientDatelesStyles.image}
          />
          <h4
            className={`${ingredientDatelesStyles.title} text text_type_main-medium mt-4 mb-8`}
          >
            {currentIngredient.name}
          </h4>
          <div
            className={`${ingredientDatelesStyles.parametrsWrapper} text text_type_main-default text_color_inactive`}
          >
            <div className={ingredientDatelesStyles.ingredient}>
              <p>Калории,ккал</p>
              <p>{currentIngredient.calories}</p>
            </div>
            <div className={ingredientDatelesStyles.ingredient}>
              <p>Белки, г</p>
              <p>{currentIngredient.proteins}</p>
            </div>
            <div className={ingredientDatelesStyles.ingredient}>
              <p>Жиры, г</p>
              <p>{currentIngredient.fat}</p>
            </div>
            <div className={ingredientDatelesStyles.ingredient}>
              <p>Углеводы, г</p>
              <p>{currentIngredient.carbohydrates}</p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default IngredientDetails;
