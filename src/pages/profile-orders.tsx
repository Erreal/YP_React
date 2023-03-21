import { FC, useEffect } from 'react';
import { Loader } from '../components/Loader/loader';
import { OrderCard } from '../components/OrderCard/OrderCard';
import { ProfileNav } from '../components/Profile/ProfileNav';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { WS_CONNECTION_END, WS_CONNECTION_START } from '../services/actions/websocket';
import { WS_URL } from '../utils/constants';
import profileStyles from './pages.module.css';

export const ProfileOrders: FC = () => {
  const dispatch = useAppDispatch();
  const wsData = useAppSelector((store) => store.websocket);
  const { token } = useAppSelector((store) => store.user);
  const accessToken = token ? token : localStorage.getItem('accessToken');

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      payload: `${WS_URL}/orders?token=${accessToken}`,
    });
    return () => {
      dispatch({ type: WS_CONNECTION_END });
    };
  }, [dispatch, accessToken]);

  return (
    <>
      <section className={`${profileStyles.profileSection} pt-30`}>
        <ProfileNav />
      </section>
      <section className={`${profileStyles.profileOrdersSection} mt-10`}>
        {wsData.feed && wsData.feed.length ? (
          wsData.feed.map((value) => (
            <OrderCard {...value} key={value._id} showStatus={true} />
          ))
        ) : (
          <Loader size="medium" />
        )}
      </section>
    </>
  );
};
