import React, { ChangeEvent, FC } from 'react';
import { useCallback, useEffect } from 'react';
import {
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory } from 'react-router-dom';
import pageStyles from './pages.module.css';
import { useSelector } from 'react-redux';
import { login } from '../services/actions/auth';
import { Loader } from '../components/Loader/loader';
import { ROUTES } from '../utils/constants';
import { TStateReducer } from '../services/reducers/ingredients';
import { useAppDispatch } from '../hooks/useAppDispatch';

export const Login: FC = () => {
  const dispatch = useAppDispatch();
  const { auth, loginRequest, loginFailed } = useSelector(
    (store: TStateReducer) => store.user
  );
  const [emailValue, setEmailValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');
  const history = useHistory();

  useEffect(() => {
    if (auth) {
      history.replace({
        pathname: ROUTES.MAIN,
      });
    }
  }, [history, auth]);

  const onChangeInput = (evt: ChangeEvent<HTMLInputElement>) => {
    if (evt.target.name === 'email') {
      setEmailValue(evt.target.value);
      return;
    } else if (evt.target.name === 'password') {
      setPasswordValue(evt.target.value);
      return;
    }
  };

  const handleSubmit = useCallback(
    (evt: { preventDefault: () => void }) => {
      evt.preventDefault();
      dispatch(
        login({
          email: emailValue,
          password: passwordValue,
        })
      );
    },
    [dispatch, emailValue, passwordValue]
  );

  return (
    <>
      {!loginRequest ? (
        <form className={pageStyles.form} onSubmit={handleSubmit}>
          <h2
            className={`${pageStyles.text_center} text text_type_main-medium`}
          >
            Вход
          </h2>
          {loginFailed && (
            <p className={pageStyles.errorMessage}>
              Произошла ошибка! Попробуйте ввести логин и пароль заново
            </p>
          )}
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
              to={ROUTES.REGISTER}
              title="Зарегистрироваться"
            >
              Зарегистрироваться
            </Link>
          </p>
          <p className="text_type_main-default text_color_inactive">
            Забыли пароль?{' '}
            <Link
              className="text"
              to={ROUTES.FORGOT_PASS}
              title="Восстановить пароль"
            >
              Восстановить пароль
            </Link>
          </p>
        </form>
      ) : (
        <Loader size="medium" />
      )}
    </>
  );
};
