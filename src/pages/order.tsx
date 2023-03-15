import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../components/Loader/loader';
import { OrderInfo } from '../components/OrderInfo/OrderInfo';
import { getOrder } from '../utils/requestApi';
import { TOrderCard } from '../utils/types';
import orderStyles from './pages.module.css';

export const OrderPage = () => {
  const { number } = useParams<{ number: string }>();
  const [order, setOrder] = useState<TOrderCard>();
  console.log('order', order);

  useEffect(() => {
    getOrder(number).then(
      (res: { success: boolean; orders: TOrderCard[] } & any) => {
        if (res.success === true) {
          setOrder(res.orders[0]);
        } else {
          throw new Error();
        }
      }
    );
  }, [number]);

  return (
    <section className={`${orderStyles.orderInfoSection} pt-30`}>
      {order ? <OrderInfo {...order} /> : <Loader size="medium" />}
    </section>
  );
};
