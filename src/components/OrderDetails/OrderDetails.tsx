import { FC } from 'react';
import done from '../../images/done.png';
import { IOrderDetails } from '../../utils/types';

export const OrderDetails: FC<IOrderDetails> = ({ number, name }) => {
  return (
    <>
      <p className="text text_type_digits-large mt-20">{number}</p>
      <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
      <img className="mt-15" alt="Done" src={done} />
      <p className="text text_type_main-default mt-15">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default mt-2 mb-20 text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  );
};
