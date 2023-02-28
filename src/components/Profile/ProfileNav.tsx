import React from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { logout } from '../../services/actions/auth';
import profileStyles from './Profile.module.css';
import { ROUTES } from '../../utils/constants';
import { useAppDispatch } from '../../hooks/useAppDispatch';

export const ProfileNav = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const location = useLocation<string>();

  const handleLogout = () => {
    const token: any = localStorage.getItem('refreshToken');
    dispatch(logout(token));
    history.replace({ pathname: ROUTES.MAIN, state: { from: location } });
  };
  return (
    <nav className={`${profileStyles.nav}`}>
      <ul className={`${profileStyles.navList}`}>
        <li className={`${profileStyles.navList__item}`}>
          <NavLink
            to={ROUTES.PROFILE}
            exact={true}
            className={`${profileStyles.navList__link} text text_type_main-medium`}
            activeClassName={`${profileStyles.navList__link_active}`}
          >
            Профиль
          </NavLink>
        </li>
        <li className={`${profileStyles.navList__item}`}>
          <NavLink
            to={ROUTES.PROFILE_ORDERS}
            exact={true}
            className={`${profileStyles.navList__link} text text_type_main-medium`}
            activeClassName={`${profileStyles.navList__link_active}`}
          >
            История заказов
          </NavLink>
        </li>
        <li className={`${profileStyles.navList__item}`}>
          <NavLink
            to={ROUTES.MAIN}
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
