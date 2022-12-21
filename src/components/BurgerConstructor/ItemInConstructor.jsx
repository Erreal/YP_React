import React, { useRef } from 'react';
import {
  DragIcon,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
import constructorStyles from './BurgerConstructor.module.css';
import { useDrag, useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import ingredientType from '../../utils/types';
import { useDispatch } from 'react-redux';
import { MOVE_ITEM } from '../../services/actions/basket';

const ItemInConstructor = (props) => {
  const dispatch = useDispatch();
  const dropRef = useRef();

  const [{ target }, dropTarget] = useDrop({
    accept: 'sort',
    collect(monitor) {
      return {
        target: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      const dragIndex = item.index;
      const targetIndex = props.index;
      if (dragIndex === targetIndex) {
        return;
      }
      const hoverBoundRect = dropRef.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundRect.bottom - hoverBoundRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundRect.top;
      if (dragIndex < targetIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      dispatch({ type: MOVE_ITEM, target: targetIndex, item: dragIndex });
      item.index = targetIndex;
    },
  });

  const [{ isDragging }, dragItem] = useDrag({
    type: 'sort',
    item: () => {
      return {
        index: props.index,
      };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  dragItem(dropTarget(dropRef));

  return (
    <div
      className={constructorStyles.constructorItem}
      ref={dropRef}
      data-handler-id={target}
      style={{ opacity }}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={props.item.name}
        price={props.item.price}
        thumbnail={props.item.image}
        handleClose={() => props.deleteItem(props.item)}
      />
    </div>
  );
};

ItemInConstructor.propTypes = {  
  deleteItem: PropTypes.func.isRequired,
  item: ingredientType.isRequired,
  index: PropTypes.number.isRequired,
};

export default ItemInConstructor;
