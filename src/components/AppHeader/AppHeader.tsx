import React, { FC } from 'react';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyles from './AppHeader.module.css';
import { Link, NavLink } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';

const AppHeaderNav: FC = () => {
  return (
    <nav>
      <ul className={headerStyles.navlist}>
        <li className={headerStyles.navlistitem}>
          <NavLink
            to={ROUTES.MAIN}
            className="text text_type_main-default"
            activeClassName={`${headerStyles.navlistitem__link_active}`}
            exact={true}
          >
            <BurgerIcon type="primary" /> Конструктор
          </NavLink>
        </li>
        <li className={headerStyles.navlistitem}>
          <NavLink
            to={ROUTES.FEED}
            className="text text_type_main-default"
            activeClassName={`${headerStyles.navlistitem__link_active}`}
            exact={true}
          >
            <ListIcon type="primary" /> Лента заказов
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

const AppHeaderLogin: FC = () => {
  return (
    <ul className={headerStyles.navlist}>
      <li className={headerStyles.navlistitem}>
        <NavLink
          to={ROUTES.PROFILE}
          className="text text_type_main-default"
          activeClassName={`${headerStyles.navlistitem__link_active}`}
        >
          <ProfileIcon type="primary" /> Личный кабинет
        </NavLink>
      </li>
    </ul>
  );
};

const AppHeader: FC = () => {
  return (
    <header className={headerStyles.header}>
      <div className={headerStyles.container}>
        <AppHeaderNav />
        <Link to={ROUTES.MAIN}>
          <Logo />
        </Link>
        <AppHeaderLogin />
      </div>
    </header>
  );
};

export default AppHeader;
