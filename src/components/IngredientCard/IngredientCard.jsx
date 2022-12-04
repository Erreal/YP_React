import React from "react";
import ingredientCardStyles from "./IngredientCard.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";
import ingredientType from "../../utils/types";

const IngredientCard = (props) => {
  const [modal, setModal] = React.useState({ visible: false });
  const handleOpenModal = () => {
    setModal({ visible: true });
  };

  const handleCloseModal = () => {
    setModal({ visible: false });
  };
  return (
    <>
      <div
        className={`${ingredientCardStyles.card} mt-6 mb-8`}
        onClick={handleOpenModal}
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
      {modal.visible && (
        <Modal onClose={handleCloseModal} title="Детали ингредиента">
          <IngredientDetails
            image={props.item.image_large}
            name={props.item.name}
            calories={props.item.calories}
            proteins={props.item.proteins}
            fat={props.item.fat}
            carbohydrates={props.item.carbohydrates}
          />
        </Modal>
      )}
    </>
  );
};

IngredientCard.propTypes = {
  item: ingredientType.isRequired,
};

export default IngredientCard;
