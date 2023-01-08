import React from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../services/actions/auth';
import profileStyles from './Profile.module.css';

export const ProfileNav = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogout = () => {
    const token = localStorage.getItem('refreshToken');
    dispatch(logout(token));
    history.replace({ pathname: '/', state: { from: location } });
  };
  return (
    <nav className={`${profileStyles.nav}`}>
      <ul className={`${profileStyles.navList}`}>
        <li className={`${profileStyles.navList__item}`}>
          <NavLink
            to={'/profile'}
            exact={true}
            className={`${profileStyles.navList__link} text text_type_main-medium`}
            activeClassName={`${profileStyles.navList__link_active}`}
          >
            Профиль
          </NavLink>
        </li>
        <li className={`${profileStyles.navList__item}`}>
          <NavLink
            to={'/profile/orders'}
            exact={true}
            className={`${profileStyles.navList__link} text text_type_main-medium`}
            activeClassName={`${profileStyles.navList__link_active}`}
          >
            История заказов
          </NavLink>
        </li>
        <li className={`${profileStyles.navList__item}`}>
          <NavLink
            to={'/'}
            exact={true}
            className={`${profileStyles.navList__link} text text_type_main-medium`}
            activeClassName={`${profileStyles.navList__link_active}`}
            onClick={handleLogout}
          >
            Выход
          </NavLink>
        </li>
      </ul>
      <p
        className={`${profileStyles.text} text text_type_main-default text_color_inactive mt-20`}
      >
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </nav>
  );
};