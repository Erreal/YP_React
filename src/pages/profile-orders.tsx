import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Loader } from '../components/Loader/loader';
import { OrderCard } from '../components/OrderCard/OrderCard';
import { ProfileNav } from '../components/Profile/ProfileNav';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { TStateReducer } from '../services/reducers/ingredients';
import { TWsState } from '../utils/types';
import profileStyles from './pages.module.css';

export const ProfileOrders: FC = () => {
  const dispatch = useAppDispatch();
  const wsData: TWsState = useSelector(
    (store: TStateReducer) => store.websocketProfile
  );
  const { token } = useSelector((store: TStateReducer) => store.user);

  useEffect(() => {
    dispatch({
      type: 'WS_CONNECTION_START_PROFILE',
      payload: token,
    });
    return () => {
      dispatch({ type: 'WS_CONNECTION_END_PROFILE' });
    };
  }, [dispatch, token]);

  return (
    <>
      <section className={`${profileStyles.profileSection} pt-30`}>
        <ProfileNav />
      </section>
      <section className={`${profileStyles.profileOrdersSection} mt-10`}>
        {wsData.orders && wsData.orders.feed.length ? (
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
