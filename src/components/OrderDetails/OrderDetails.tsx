import { FC } from 'react';
import { useSelector } from 'react-redux';
import done from '../../images/done.png';
import { TStateReducer } from '../../services/reducers/ingredients';
import { Loader } from '../Loader/loader';

export const OrderDetails: FC = () => {
  const order = useSelector((store: TStateReducer) => store.order);
  return (
    <>
      {order.number ? (
        <>
          <p className="text text_type_digits-large mt-20">{order.number}</p>
          <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
          <img className="mt-15" alt="Done" src={done} />
          <p className="text text_type_main-default mt-15">
            Ваш заказ начали готовить
          </p>
          <p className="text text_type_main-default mt-2 mb-20 text_color_inactive">
            Дождитесь готовности на орбитальной станции
          </p>
        </>
      ) : (
        <>
          <p className="text text_type_main-medium mt-20">Оформляем Ваш заказ.</p>
          <Loader size='medium' />
        </>
      )}
    </>
  );
};
