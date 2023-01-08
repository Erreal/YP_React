import React from 'react';
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import pageStyles from './pages.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { registration } from '../services/actions/auth';
import { Loader } from '../components/Loader/loader';

export const Registration = () => {
  const dispatch = useDispatch();
  const { name, email, password, registrationRequest } = useSelector(
    (state) => state.user
  );
  const [nameValue, setName] = React.useState(name);
  const [emailValue, setEmail] = React.useState(email);
  const [passwordValue, setPassword] = React.useState(password);
  const onInputChange = (evt) => {
    if (evt.target.name === 'name') {
      setName(evt.target.value);
      return;
    }
    if (evt.target.name === 'email') {
      setEmail(evt.target.value);
      return;
    }
    if (evt.target.name === 'password') {
      setPassword(evt.target.value);
      return;
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(
      registration({
        email: emailValue,
        password: passwordValue,
        name: nameValue,
      })
    );
  };

  return (
    <>
      {!registrationRequest ? (
        <form className={pageStyles.form} onSubmit={handleSubmit}>
          <h2
            className={`${pageStyles.text_center} text text_type_main-medium`}
          >
            Регистрация
          </h2>
          <Input
            placeholder="Имя"
            type={'text'}
            name={'name'}
            autoComplete="on"
            extraClass={`mt-6`}
            required={true}
            value={nameValue}
            onChange={onInputChange}
          />
          <EmailInput
            placeholder="some@example.com"
            name={'email'}
            isIcon={false}
            extraClass={`mt-6`}
            required={true}
            value={emailValue}
            onChange={onInputChange}
          />
          <PasswordInput
            name={'password'}
            required={true}
            extraClass={`mt-6`}
            value={passwordValue}
            onChange={onInputChange}
          />
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            extraClass={`mt-6`}
          >
            Зарегистрироваться
          </Button>
          <p className="text_type_main-default text_color_inactive mt-20">
            Уже зарегистрированны?{' '}
            <Link className="text" to="/login" alt="Войти" title="Войти">
              Войти
            </Link>
          </p>
        </form>
      ) : (
        <Loader className={pageStyles.form} />
      )}
    </>
  );
};
