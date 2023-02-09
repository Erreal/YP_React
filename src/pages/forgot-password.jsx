import { useCallback, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { restorePassword } from '../services/actions/auth';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';


export default function ForgotPassword() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { password } = useSelector((store) => store.user);
    const [emailValue, setEmailValue] = useState('');
    const onChange = (evt) => {
        setEmailValue(evt.target.value)
    };


    const resetPassword = useCallback(
        (evt) => {
            evt.preventDefault();
            dispatch(restorePassword(emailValue));
        },
        [dispatch, emailValue]);

    useEffect(() => {
        if (password) {
            history.replace({
                pathname: '/reset-password',
            })
        };
    }, [history, password]);


    return (
        <section>
            
                <form onSubmit={resetPassword}>
                    <h1 className='text text_type_main-large'>Восстановление пароля</h1>
                    <EmailInput
                        type={'email'}
                        placeholder={`Укажите e-mail`}
                        onChange={onChange}
                        value={emailValue}
                        name={'email'} />
                    <Button htmlType="submit" type="primary" size="medium">
                        Восстановить
                    </Button>
                </form>
                <div>
                    <p className='text text_type_main-default'>Вспомнили пароль?
                        <Link to={{ pathname: `/login` }}> Войти</Link></p>
                </div>
           
        </section>
    )
}