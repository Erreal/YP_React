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
import { INITIAL_STATE } from '../../utils/constants';

export const authReducer = (state = INITIAL_STATE.user, action) => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return {
        ...state,
        loginRequest: true,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        loginFailed: false,
        auth: true,
        token: action.token,
        name: action.name,
        email: action.email,
        loginRequest: false,
      };
    }
    case LOGIN_FAILED: {
      return { ...state, loginFailed: true, loginRequest: false };
    }
    case REGISTRATION_REQUEST: {
      return {
        ...state,
        registrationRequest: true,
      };
    }
    case REGISTRATION_SUCCESS: {
      return {
        ...state,
        registrationFailed: false,
        auth: true,
        token: action.token,
        name: action.name,
        email: action.email,
        registrationRequest: false,
      };
    }
    case REGISTRATION_FAILED: {
      return { ...state, registrationFailed: true, registrationRequest: false };
    }
    case LOGOUT_REQUEST: {
      return {
        ...state,
        logoutRequest: true,
      };
    }
    case LOGOUT_SUCCESS: {
      return INITIAL_STATE.user;
    }
    case LOGOUT_FAILED: {
      return { ...state, logoutFailed: true, logoutRequest: false };
    }
    case GET_USER_REQUEST: {
      return {
        ...state,
        getUserRequest: true,
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        getUserFailed: false,
        auth: true,
        name: action.name,
        email: action.email,
        getUserRequest: false,
      };
    }
    case GET_USER_FAILED: {
      return { ...state, getUserFailed: true, getUserRequest: false };
    }
    case UPDATE_USER_REQUEST: {
      return {
        ...state,
        updateUserRequest: true,
      };
    }
    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        updateUserFailed: false,
        name: action.name,
        email: action.email,
        updateUserRequest: false,
      };
    }
    case UPDATE_USER_FAILED: {
      return { ...state, updateUserFailed: true, updateUserRequest: false };
    }
    case TOKEN_REQUEST: {
      return {
        ...state,
        tokenRequest: true,
      };
    }
    case TOKEN_SUCCESS: {
      return {
        ...state,
        tokenRequest: false,
        token: action.token,
        tokenFailed: false,
      };
    }
    case TOKEN_FAILED: {
      return {
        ...state,
        tokenFailed: true,
      };
    }
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        resetRequest: true,
      };
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        resetRequest: false,
        resetSuccess: true,
        resetFailed: false,
      };
    }
    case RESET_PASSWORD_FAILED: {
      return {
        ...state,
        resetFailed: true,
      };
    }
    case SET_PASSWORD_REQUEST: {
      return {
        ...state,
        setPasswdRequest: true,
      };
    }
    case SET_PASSWORD_SUCCESS: {
      return {
        ...state,
        password: action.password,
        setPasswdRequest: false,
        setPasswdSuccess: true,
        setPasswdFailed: false,
      };
    }
    case SET_PASSWORD_FAILED: {
      return {
        ...state,
        setPasswdFailed: true,
      };
    }
    default:
      return state;
  }
};
