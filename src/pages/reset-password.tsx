import { useCallback, useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { setNewPassword } from '../services/actions/auth';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import resetPassStyles from './pages.module.css';
import { ROUTES } from '../utils/constants';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { TPreventDefault } from '../utils/types';

export default function ResetPassword() {
  const dispatch = useAppDispatch();

  const { resetSuccess, setPasswdFailed, setPasswdSuccess } = useAppSelector((store) => store.user);

  const [formValues, setValue] = useState({ password: '', key: '' });
  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...formValues, [evt.target.name]: evt.target.value });
  };

  const resetPassword = useCallback(
    (evt: TPreventDefault) => {
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
            <Link to={{ pathname: ROUTES.MAIN }}>Перейти на Главную</Link>
          </p>
        </>
      ) : (
        <Link to={{ pathname: ROUTES.FORGOT_PASS }}>
          Перейти на страницу сброса пароля
        </Link>
      )}
      <div>
        <p>
          Вспомнили пароль? <Link to={{ pathname: ROUTES.LOGIN }}>Войти</Link>
        </p>
      </div>
    </section>
  );
}
