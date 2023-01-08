import React from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileForm } from '../components/Profile/ProfileForm';
import { ProfileNav } from '../components/Profile/ProfileNav';
import profileStyles from './profile.module.css';

export const Profile = () => {
  const location = useLocation();
  return (
    <section className={`${profileStyles.section} pt-30`}>
      <ProfileNav />
      <ProfileForm />
    </section>
  );
};
