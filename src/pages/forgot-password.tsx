import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { restorePassword } from '../services/actions/auth';
import {
  EmailInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import forgotPassStyles from './pages.module.css';
import { Loader } from '../components/Loader/loader';
import { ROUTES } from '../utils/constants';
import { TStateReducer } from '../services/reducers/ingredients';
import { useAppDispatch } from '../hooks/useAppDispatch';

export const ForgotPassword: FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { resetSuccess, resetRequest } = useSelector((store:TStateReducer) => store.user);
  const [emailValue, setEmailValue] = useState<string>('');
  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setEmailValue(evt.target.value);
  };

  const sendEmail = useCallback(
    (evt: { preventDefault: () => void; }) => {
      evt.preventDefault();
      dispatch(restorePassword(emailValue));
    },
    [dispatch, emailValue]
  );

  useEffect(() => {
    if (resetSuccess) {
      history.replace({
        pathname: ROUTES.RESET_PASS,
      });
    }
  }, [history, resetSuccess]);

  return (
    <section className={forgotPassStyles.forgotSection}>
      {!resetRequest ? (
        <>
          <form onSubmit={sendEmail} className={forgotPassStyles.forgotForm}>
            <h1 className="text text_type_main-large">Восстановление пароля</h1>
            <EmailInput
              placeholder={`Укажите e-mail`}
              onChange={onChange}
              value={emailValue}
              name={'email'}
            />
            <Button htmlType="submit" type="primary" size="medium">
              Восстановить
            </Button>
          </form>
          <div>
            <p className="text text_type_main-default mt-10">
              Вспомнили пароль? <Link to={{ pathname: ROUTES.LOGIN }}>Войти</Link>
            </p>
          </div>
        </>
      ) : (
        <Loader size='medium'/>
      )}
    </section>
  );
}
