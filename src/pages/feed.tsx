import { FC, useEffect } from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import feedStyles from './pages.module.css';
import { Loader } from '../components/Loader/loader';
import { OrderCard } from '../components/OrderCard/OrderCard';
import { WS_URL } from '../utils/constants';
import { WS_CONNECTION_END, WS_CONNECTION_START } from '../services/actions/websocket';
import { useAppSelector } from '../hooks/useAppSelector';

export const Feed: FC = () => {
  const dispatch = useAppDispatch();
  const wsData = useAppSelector((store) => store.websocket);

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      payload: `${WS_URL}/orders/all`
    });
    return () => {
      dispatch({ type: WS_CONNECTION_END });
    };
  }, [dispatch]);

  return (
    <div>
      <h1 className={feedStyles.header}>Лента заказов</h1>
      <div className={feedStyles.mainContainer}>
        <section className={feedStyles.leftContainer}>
          {wsData.feed && wsData.feed.length ? (
            wsData.feed.map((value) => (
              <OrderCard {...value} key={value._id} showStatus={false} />
            ))
          ) : (
            <Loader size="medium" />
          )}
        </section>
        <section className={feedStyles.rightConainer}>
          <section className={feedStyles.orderBoard}>
            <div className={feedStyles.doneBoard}>
              <p className="text text_type_main-medium">Готовы:</p>
              <ul className={feedStyles.doneBoardUL}>
                {wsData.feed && wsData.feed.length &&
                  wsData.feed.map((value, i) => {
                    return value.status === 'done' ? (
                      <li
                        key={i}
                        className={`${feedStyles.listDone} text text_type_digits-default`}
                      >
                        {value.number}
                      </li>
                    ) : null;
                  })}
              </ul>
            </div>
            <div className={feedStyles.doneBoard}>
              <p className="text text_type_main-medium">В работе:</p>
              <ul className={feedStyles.doneBoardUL}>
                {wsData.feed && wsData.feed.length &&
                  wsData.feed.map((value, i) => {
                    return value.status === 'pending' ? (
                      <li
                        key={i}
                        className={`${feedStyles.listWork} text text_type_digits-default`}
                      >
                        {value.number}
                      </li>
                    ) : null;
                  })}
              </ul>
            </div>
          </section>
          <section className="mt-15">
            <p className="text text_type_main-medium">
              Выполнено за всё время:
            </p>
            <p
              className={`${feedStyles.complitedNumbers} text text_type_digits-large`}
            >
              {wsData && wsData.totalOrders}
            </p>
          </section>
          <section className="mt-15">
            <p className="text text_type_main-medium">Выполнено за сегодня:</p>
            <p
              className={`${feedStyles.complitedNumbers} text text_type_digits-large`}
            >
              {wsData && wsData.totalToday}
            </p>
          </section>
        </section>
      </div>
    </div>
  );
};
