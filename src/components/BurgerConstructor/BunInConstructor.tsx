import { FC } from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { IBunInConstructor } from '../../utils/types';

export const BunInConstructor: FC<IBunInConstructor> = (props) => {
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
