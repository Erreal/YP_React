import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setNewPassword } from '../services/actions/auth';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import resetPassStyles from './pages.module.css';

export default function ResetPassword() {
  const dispatch = useDispatch();

  const { resetSuccess, setPasswdFailed, setPasswdSuccess } = useSelector(
    (store) => store.user
  );

  const [formValues, setValue] = useState({ password: '', key: '' });
  const onChange = (evt) => {
    setValue({ ...formValues, [evt.target.name]: evt.target.value });
  };

  const resetPassword = useCallback(
    (evt) => {
      evt.preventDefault();
      if (!resetSuccess) return;
      dispatch(setNewPassword(formValues));
    },
    [dispatch, resetSuccess, formValues]
  );

  return (
    <section className={resetPassStyles.forgotSection}>
      {resetSuccess && !setPasswdSuccess ? (
        <form onSubmit={resetPassword} className={resetPassStyles.forgotForm}>
          <h1 className="text text_type_main-large">Восстановление пароля</h1>
          {setPasswdFailed && (
            <p className={resetPassStyles.errorMessage}>
              Произошла ошибка! Проверьте правильность данных.
            </p>
          )}
          <PasswordInput
            placeholder="Введите новый пароль"
            value={formValues.password}
            name={'password'}
            onChange={onChange}
            icon={'ShowIcon'}
          />
          <Input
            type={'text'}
            placeholder="Введите код из письма"
            value={formValues.key}
            name={'key'}
            onChange={onChange}
          />
          <Button htmlType="submit" type="primary">
            Сохранить
          </Button>
        </form>
      ) : setPasswdSuccess ? (
        <>
          <p className={resetPassStyles.successMessage}>
            Пароль обновлен успешно
          </p>
          <p>
            <Link to={{ pathname: `/` }}>Перейти на Главную</Link>
          </p>
        </>
      ) : (
        <Link to={{ pathname: `/forgot-password` }}>
          Перейти на страницу сброса пароля
        </Link>
      )}
      <div>
        <p>
          Вспомнили пароль? <Link to={{ pathname: `/login` }}>Войти</Link>
        </p>
      </div>
    </section>
  );
}
