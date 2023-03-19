import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Loader } from '../components/Loader/loader';
import { OrderCard } from '../components/OrderCard/OrderCard';
import { ProfileNav } from '../components/Profile/ProfileNav';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { TStateReducer } from '../services/reducers/ingredients';
import { WS_URL } from '../utils/constants';
import { TWsState } from '../utils/types';
import profileStyles from './pages.module.css';

export const ProfileOrders: FC = () => {
  const dispatch = useAppDispatch();
  const wsData: TWsState = useSelector(
    (store: TStateReducer) => store.websocket
  );
  const { token } = useSelector((store: TStateReducer) => store.user);
  const accessToken = token ? token : localStorage.getItem('accessToken');

  useEffect(() => {
    dispatch({
      type: 'WS_CONNECTION_START',
      payload: `${WS_URL}/orders?token=${accessToken}`,
    });
    return () => {
      dispatch({ type: 'WS_CONNECTION_END' });
    };
  }, [dispatch, accessToken]);

  return (
    <>
      <section className={`${profileStyles.profileSection} pt-30`}>
        <ProfileNav />
      </section>
      <section className={`${profileStyles.profileOrdersSection} mt-10`}>
        {wsData.orders.feed && wsData.orders.feed.length ? (
          wsData.orders.feed.map((value: any) => (
            <OrderCard {...value} key={value._id} showStatus={true} />
          ))
        ) : (
          <Loader size="medium" />
        )}
      </section>
    </>
  );
};
