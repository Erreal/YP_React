import { ProfileNav } from '../components/Profile/ProfileNav';
import profileStyles from './pages.module.css';

export const ProfileOrders = () => {
    return (
      <section className={`${profileStyles.profileSection} pt-30`}>
        <ProfileNav />
        
      </section>
    );
  };