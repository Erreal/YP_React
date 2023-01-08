import React from 'react';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyles from './AppHeader.module.css';
import { Link } from 'react-router-dom';

const AppHeaderNav = () => {
  return (
    <nav>
      <ul className={headerStyles.navlist}>
        <li className={headerStyles.navlistitem}>
          <BurgerIcon type="primary" />
          <Link to="/" className="text text_type_main-default">
            Конструктор
          </Link>
        </li>
        <li className={headerStyles.navlistitem}>
          <ListIcon type="primary" />
          <Link to="/profile/orders" className="text text_type_main-default">
            Лента заказов
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const AppHeaderLogin = () => {
  return (
    <ul className={headerStyles.navlist}>
      <li className={headerStyles.navlistitem}>
        <ProfileIcon type="primary" />
        <Link to="/profile" className="text text_type_main-default">
          Личный кабинет
        </Link>
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
