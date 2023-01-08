import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import profileStyles from './Profile.module.css';
import { updateUserData } from '../../services/actions/auth';

export const ProfileForm = () => {
  const dispatch = useDispatch();

  const { name, email, password } = useSelector((state) => state.user);
  const [dataChanged, setDataChanged] = useState(false);
  const [nameValue, setName] = useState(name);
  const [emailValue, setEmail] = useState(email);
  const [passwordValue, setPassword] = useState(password);
  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(
      updateUserData({
        email: emailValue,
        password: passwordValue,
        name: nameValue,
      })
    );
  };
  const onInputChange = (evt) => {
    setDataChanged(true);
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
  return (
    <form className={`${profileStyles.profile__form} form`}>
      <Input
        placeholder="Имя"
        onChange={onInputChange}
        value={nameValue}
        name={'name'}
        type={'text'}
        icon={'EditIcon'}
      />
      <EmailInput
        name={'email'}
        value={emailValue}
        onChange={onInputChange}
        placeholder={'Логин'}
        icon={'EditIcon'}
      />
      <PasswordInput
        name={'password'}
        value={passwordValue}
        onChange={onInputChange}
        placeholder={'Пароль'}
        icon={'EditIcon'}
      />
      {dataChanged ? (
        <div className={`${profileStyles.buttonsWrapper} `}>
          <Button htmlType={'reset'} type={'secondary'}>
            Отмена
          </Button>
          <Button htmlType={'submit'} type={'primary'} onSubmit={handleSubmit}>
            Сохранить
          </Button>
        </div>
      ) : null}
    </form>
  );
};
