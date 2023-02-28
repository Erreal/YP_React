import { FC } from 'react';
import { ProfileNav } from '../components/Profile/ProfileNav';
import profileStyles from './pages.module.css';

export const ProfileOrders: FC = () => {
  return (
    <section className={`${profileStyles.profileSection} pt-30`}>
      <ProfileNav />
    </section>
  );
};
