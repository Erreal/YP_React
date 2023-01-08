import React from 'react';
import {
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import pageStyles from './pages.module.css';
import { useDispatch } from 'react-redux';
import { login } from '../services/actions/auth';

export const Login = () => {
  const dispatch = useDispatch();
  const [emailValue, setEmailValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');
  const onChangeInput = (evt) => {
    if (evt.target.name === 'email') {
      setEmailValue(evt.target.value);
      return;
    } else if (evt.target.name === 'password') {
      setPasswordValue(evt.target.value);
      return;
    }
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(
      login({
        email: emailValue,
        password: passwordValue,
      })
    );
  };
  return (
    <form className={pageStyles.form} onSubmit={handleSubmit}>
      <h2 className={`${pageStyles.text_center} text text_type_main-medium`}>
        Регистрация
      </h2>
      <EmailInput
        onChange={onChangeInput}
        value={emailValue}
        name={'email'}
        isIcon={false}
        extraClass={`mt-6`}
        required={true}
        placeholder="some@example.com"
      />
      <PasswordInput
        name={'password'}
        required={true}
        extraClass={`mt-6`}
        value={passwordValue}
        onChange={onChangeInput}
      />
      <Button
        htmlType="submit"
        type="primary"
        size="medium"
        extraClass={`mt-6`}
      >
        Войти
      </Button>
      <p className="text_type_main-default mt-20 text_color_inactive">
        Вы - новый пользователь?{' '}
        <Link
          className="text"
          to="/register"
          alt="Зарегистрироваться"
          title="Зарегистрироваться"
        >
          Зарегистрироваться
        </Link>
      </p>
      <p className="text_type_main-default text_color_inactive">
        Забыли пароль?{' '}
        <Link
          className="text"
          to="/forgot-password"
          alt="Восстановить пароль"
          title="Восстановить пароль"
        >
          Восстановить пароль
        </Link>
      </p>
    </form>
  );
};
