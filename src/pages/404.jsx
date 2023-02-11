import React from 'react';
import { Link } from 'react-router-dom';
import pageStyles from './pages.module.css';
import { ROUTES } from '../utils/constants';

export const Page404 = () => {
  return (
    <section className={pageStyles.section_404}>
      <h2
        className={`${pageStyles.text_center} text text_type_main-large mt-20`}
      >
        Страница не найдена
      </h2>
      <p
        className={`${pageStyles.text_center} text text_type_digits-large mt-20 mb-20`}
      >
        404
      </p>
      <Link
        className={`${pageStyles.to_main} text text_type_main-medium`}
        to={ROUTES.MAIN}
        alt="На главную"
        title="На главную"
      >
        На главную
      </Link>
    </section>
  );
};
