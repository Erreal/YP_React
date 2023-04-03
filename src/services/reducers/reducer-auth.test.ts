import { expect, test } from '@jest/globals';
import { authReducer } from './auth';
import { INITIAL_STATE } from '../../utils/constants';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  REGISTRATION_REQUEST,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  TOKEN_REQUEST,
  TOKEN_SUCCESS,
  TOKEN_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  SET_PASSWORD_REQUEST,
  SET_PASSWORD_SUCCESS,
  SET_PASSWORD_FAILED,
} from '../actions/auth';

const initialState = INITIAL_STATE.user;

describe('Redux auth store', () => {
  test('Should return the initial state', () => {
    expect(authReducer(undefined, { type: null })).toEqual(initialState);
  });

  test('should handle LOGIN_REQUEST', () => {
    const state = {
      ...initialState,
      loginRequest: true,
    };
    expect(authReducer(initialState, { type: LOGIN_REQUEST })).toEqual(state);
  });

  test('should handle LOGIN_SUCCESS', () => {
    const state = {
      ...initialState,
      loginFailed: false,
      auth: true,
      token: 'token',
      name: 'Name',
      email: 'email',
      loginRequest: false,
    };
    expect(
      authReducer(initialState, {
        type: LOGIN_SUCCESS,
        name: 'Name',
        token: 'token',
        email: 'email',
      })
    ).toEqual(state);
  });

  test('should handle LOGIN_FAILED', () => {
    const state = {
      ...initialState,
      loginFailed: true,
      loginRequest: false,
    };
    expect(authReducer(initialState, { type: LOGIN_FAILED })).toEqual(state);
  });

  test('should handle REGISTRATION_REQUEST', () => {
    const state = {
      ...initialState,
      registrationRequest: true,
    };
    expect(authReducer(initialState, { type: REGISTRATION_REQUEST })).toEqual(
      state
    );
  });

  test('should handle REGISTRATION_SUCCESS', () => {
    const state = {
      ...initialState,
      registrationFailed: false,
      auth: true,
      token: 'token',
      name: 'name',
      email: 'email',
      registrationRequest: false,
    };
    expect(
      authReducer(initialState, {
        type: REGISTRATION_SUCCESS,
        token: 'token',
        email: 'email',
        name: 'name',
      })
    ).toEqual(state);
  });

  test('should handle REGISTRATION_FAILED', () => {
    const state = {
      ...initialState,
      registrationFailed: true,
      registrationRequest: false,
    };
    expect(authReducer(initialState, { type: REGISTRATION_FAILED })).toEqual(
      state
    );
  });

  test('should handle LOGOUT_REQUEST', () => {
    const state = {
      ...initialState,
      logoutRequest: true,
    };
    expect(
      authReducer(initialState, {
        type: LOGOUT_REQUEST,
      })
    ).toEqual(state);
  });

  test('should handle LOGOUT_SUCCESS', () => {
    const state = {
      ...initialState,
    };
    expect(
      authReducer(initialState, {
        type: LOGOUT_SUCCESS,
      })
    ).toEqual(state);
  });

  test('should handle LOGOUT_FAILED', () => {
    const state = {
      ...initialState,
      logoutFailed: true,
      logoutRequest: false,
    };
    expect(
      authReducer(initialState, {
        type: LOGOUT_FAILED,
      })
    ).toEqual(state);
  });

  test('should handle GET_USER_REQUEST', () => {
    const state = {
      ...initialState,
      getUserRequest: true,
    };
    expect(authReducer(initialState, { type: GET_USER_REQUEST })).toEqual(
      state
    );
  });

  test('should handle GET_USER_SUCCESS', () => {
    const state = {
      ...initialState,
      getUserFailed: false,
      auth: true,
      name: 'name',
      email: 'email',
      getUserRequest: false,
    };
    expect(
      authReducer(initialState, {
        type: GET_USER_SUCCESS,
        name: 'name',
        email: 'email',
      })
    ).toEqual(state);
  });

  test('should handle GET_USER_FAILED', () => {
    const state = {
      ...initialState,
      getUserFailed: true,
      getUserRequest: false,
    };
    expect(authReducer(initialState, { type: GET_USER_FAILED })).toEqual(state);
  });

  test('should handle UPDATE_USER_REQUEST', () => {
    const state = {
      ...initialState,
      updateUserRequest: true,
    };
    expect(authReducer(initialState, { type: UPDATE_USER_REQUEST })).toEqual(
      state
    );
  });

  test('should handle UPDATE_USER_SUCCESS', () => {
    const state = {
      ...initialState,
      updateUserFailed: false,
      name: 'name',
      email: 'email',
      updateUserRequest: false,
    };
    expect(
      authReducer(initialState, {
        type: UPDATE_USER_SUCCESS,
        name: 'name',
        email: 'email',
      })
    ).toEqual(state);
  });

  test('should handle UPDATE_USER_FAILED', () => {
    const state = {
      ...initialState,
      updateUserFailed: true,
      updateUserRequest: false,
    };
    expect(authReducer(initialState, { type: UPDATE_USER_FAILED })).toEqual(
      state
    );
  });

  test('should handle TOKEN_REQUEST', () => {
    const state = {
      ...initialState,
      tokenRequest: true,
    };
    expect(authReducer(initialState, { type: TOKEN_REQUEST })).toEqual(state);
  });

  test('should handle TOKEN_SUCCESS', () => {
    const state = {
      ...initialState,
      tokenRequest: false,
      token: 'token',
      tokenFailed: false,
    };
    expect(
      authReducer(initialState, { type: TOKEN_SUCCESS, token: 'token' })
    ).toEqual(state);
  });

  test('should handle TOKEN_FAILED', () => {
    const state = {
      ...initialState,
      tokenFailed: true,
    };
    expect(authReducer(initialState, { type: TOKEN_FAILED })).toEqual(state);
  });

  test('should handle RESET_PASSWORD_REQUEST', () => {
    const state = {
      ...initialState,
      resetRequest: true,
    };
    expect(authReducer(initialState, { type: RESET_PASSWORD_REQUEST })).toEqual(
      state
    );
  });

  test('should handle RESET_PASSWORD_SUCCESS', () => {
    const state = {
      ...initialState,
      resetRequest: false,
      resetSuccess: true,
      resetFailed: false,
    };
    expect(authReducer(initialState, { type: RESET_PASSWORD_SUCCESS })).toEqual(
      state
    );
  });

  test('should handle RESET_PASSWORD_FAILED', () => {
    const state = {
      ...initialState,
      resetFailed: true,
      resetRequest: false,
    };
    expect(authReducer(initialState, { type: RESET_PASSWORD_FAILED })).toEqual(
      state
    );
  });

  test('should handle SET_PASSWORD_REQUEST', () => {
    const state = {
      ...initialState,
      setPasswdRequest: true,
    };
    expect(authReducer(initialState, { type: SET_PASSWORD_REQUEST })).toEqual(
      state
    );
  });

  test('should handle SET_PASSWORD_SUCCESS', () => {
    const state = {
      ...initialState,
      password: 'password',
      setPasswdRequest: false,
      setPasswdSuccess: true,
      setPasswdFailed: false,
    };
    expect(
      authReducer(initialState, {
        type: SET_PASSWORD_SUCCESS,
        password: 'password',
      })
    ).toEqual(state);
  });

  test('should handle SET_PASSWORD_FAILED', () => {
    const state = {
      ...initialState,
      setPasswdFailed: true,
      setPasswdRequest: false,
    };
    expect(authReducer(initialState, { type: SET_PASSWORD_FAILED })).toEqual(
      state
    );
  });
});
