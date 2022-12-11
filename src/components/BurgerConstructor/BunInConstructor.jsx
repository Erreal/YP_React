import React from 'react';
import ingredientType from '../../utils/types';
import PropTypes from 'prop-types';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

const BunInConstructor = (props) => {
  return (
    <ConstructorElement
      type={props.type}
      isLocked={true}
      text={`${props.bun.name} ${props.text}`}
      price={props.bun.price}
      thumbnail={props.bun.image}
    />
  );
};

BunInConstructor.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  bun: ingredientType.isRequired,
  ingredients: PropTypes.arrayOf(ingredientType),
};

export default BunInConstructor;
