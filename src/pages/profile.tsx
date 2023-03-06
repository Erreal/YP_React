import React, { FC } from 'react';
import { ProfileForm } from '../components/Profile/ProfileForm';
import { ProfileNav } from '../components/Profile/ProfileNav';
import profileStyles from './pages.module.css';

export const Profile: FC = () => {
  return (
    <section className={`${profileStyles.profileSection} pt-30`}>
      <ProfileNav />
      <ProfileForm />
    </section>
  );
};
