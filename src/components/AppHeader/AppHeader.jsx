import React from 'react';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyles from './AppHeader.module.css';
import { NavLink } from 'react-router-dom';

const AppHeaderNav = () => {
  return (
    <nav>
      <ul className={headerStyles.navlist}>
        <li className={headerStyles.navlistitem}>
          <NavLink
            to={'/'}
            className="text text_type_main-default"
            activeClassName={`${headerStyles.navlistitem__link_active}`}
            exact={true}
          >
            <BurgerIcon /> Конструктор
          </NavLink>
        </li>
        <li className={headerStyles.navlistitem}>
          <NavLink
            to={'/profile/orders'}
            className="text text_type_main-default"
            activeClassName={`${headerStyles.navlistitem__link_active}`}
            exact={true}
          >
            <ListIcon /> Лента заказов
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

const AppHeaderLogin = () => {
  return (
    <ul className={headerStyles.navlist}>
      <li className={headerStyles.navlistitem}>
        <NavLink
          to="/profile"
          className="text text_type_main-default"
          activeClassName={`${headerStyles.navlistitem__link_active}`}
        >
          <ProfileIcon /> Личный кабинет
        </NavLink>
      </li>
    </ul>
  );
};

const AppHeader = () => {
  return (
    <header className={headerStyles.header}>
      <div className={headerStyles.container}>
        <AppHeaderNav />
        <Logo />
        <AppHeaderLogin />
      </div>
    </header>
  );
};

export default AppHeader;
