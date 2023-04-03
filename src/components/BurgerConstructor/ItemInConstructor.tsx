import React, { useRef, FC } from 'react';
import {
  DragIcon,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
import constructorStyles from './BurgerConstructor.module.css';
import { useDrag, useDrop } from 'react-dnd';
import { MOVE_ITEM } from '../../services/actions/basket';
import { IItemInConstructor } from '../../utils/types';
import { useAppDispatch } from '../../hooks/useAppDispatch';

const ItemInConstructor: FC<IItemInConstructor> = (props) => {
  const dispatch = useAppDispatch();
  const dropRef = useRef<HTMLDivElement>(null);

  const [{ target }, dropTarget] = useDrop({
    accept: 'sort',
    collect(monitor: { getHandlerId: () => any }) {
      return {
        target: monitor.getHandlerId(),
      };
    },
    hover(item: { index: number }, monitor: { getClientOffset: () => any }) {
      const dragIndex = item.index;
      const targetIndex = props.index;
      if (dragIndex === targetIndex) {
        return;
      }
      const hoverBoundRect: any = dropRef.current?.getBoundingClientRect();
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
    collect: (monitor: { isDragging: () => any }) => ({
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
      data-test-id="drop-reorder"
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

export default ItemInConstructor;
