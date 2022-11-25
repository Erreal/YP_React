import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyles from './AppHeader.module.css';

const AppHeaderNav = () => {
    return (
        <nav>
            <ul className={headerStyles.navlist}>
                <li className={headerStyles.navlistitem}>
                    <BurgerIcon type="primary" /> 
                    <span className="text text_type_main-default">Конструктор</span>
                </li>
                <li className={headerStyles.navlistitem}>
                    <ListIcon type="primary" /> 
                    <span className="text text_type_main-default">Лента заказов</span>
                </li>
            </ul>
        </nav>
    );
}

const AppHeaderLogin = () => {
    return (
        <ul className={headerStyles.navlist}>
            <li className={headerStyles.navlistitem}>
                <ProfileIcon type="primary" />
                <span className="text text_type_main-default">Личный кабинет</span>
            </li>
        </ul>
    );
}

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
}

export default AppHeader;