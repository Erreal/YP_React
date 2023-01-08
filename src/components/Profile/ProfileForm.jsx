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

  const { name, email, password, token } = useSelector((state) => state.user);
  const [dataChanged, setDataChanged] = useState(false);
  const [nameValue, setName] = useState(name);
  const [emailValue, setEmail] = useState(email);
  const [passwordValue, setPassword] = useState(password);
  const handleCancel = () => {
    setName(name);
    setEmail(email);
    setPassword(password);
    setDataChanged(false);
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(
      updateUserData(
        {
          email: emailValue,
          password: passwordValue,
          name: nameValue,
        },
        token
      )
    );
    setDataChanged(false);
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
    <form onSubmit={handleSubmit}>
      <Input
        placeholder="Имя"
        onChange={onInputChange}
        value={nameValue}
        name={'name'}
        type={'text'}
        icon={'EditIcon'}
        extraClass={'mt-6'}
      />
      <EmailInput
        name={'email'}
        value={emailValue}
        onChange={onInputChange}
        placeholder={'Логин'}
        icon={'EditIcon'}
        extraClass={'mt-6'}
      />
      <PasswordInput
        name={'password'}
        value={passwordValue}
        onChange={onInputChange}
        placeholder={'Пароль'}
        icon={'EditIcon'}
        extraClass={'mt-6'}
      />
      {dataChanged ? (
        <div className={`${profileStyles.buttonsWrapper} mt-7`}>
          <Button htmlType={'reset'} type={'secondary'} onClick={handleCancel}>
            Отмена
          </Button>
          <Button htmlType={'submit'} type={'primary'}>
            Сохранить
          </Button>
        </div>
      ) : null}
    </form>
  );
};
