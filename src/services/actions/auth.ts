import { refreshToken, requestData } from '../../utils/requestApi';
import { API_URL } from '../../utils/constants';
import { Dispatch } from 'redux';
import { TApplicationActions } from '../store';

export const LOGIN_REQUEST:'LOGIN_REQUEST' = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS:'LOGIN_SUCCESS' = 'LOGIN_SUCCESS';
export const LOGIN_FAILED:'LOGIN_FAILED' = 'LOGIN_FAILED';

export const LOGOUT_REQUEST:'LOGOUT_REQUEST' = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS:'LOGOUT_SUCCESS' = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED:'LOGOUT_FAILED' = 'LOGOUT_FAILED';

export const REGISTRATION_REQUEST:'REGISTRATION_REQUEST' = 'REGISTRATION_REQUEST';
export const REGISTRATION_SUCCESS:'REGISTRATION_SUCCESS' = 'REGISTRATION_SUCCESS';
export const REGISTRATION_FAILED:'REGISTRATION_FAILED' = 'REGISTRATION_FAILED';

export const GET_USER_REQUEST:'GET_USER_REQUEST' = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS:'GET_USER_SUCCESS' = 'GET_USER_SUCCESS';
export const GET_USER_FAILED:'GET_USER_FAILED' = 'GET_USER_FAILED';

export const UPDATE_USER_REQUEST:'UPDATE_USER_REQUEST' = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS:'UPDATE_USER_SUCCESS' = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED:'UPDATE_USER_FAILED' = 'UPDATE_USER_FAILED';

export const TOKEN_REQUEST:'TOKEN_REQUEST' = 'TOKEN_REQUEST';
export const TOKEN_SUCCESS:'TOKEN_SUCCESS' = 'TOKEN_SUCCESS';
export const TOKEN_FAILED:'TOKEN_FAILED' = 'TOKEN_FAILED';

export const RESET_PASSWORD_REQUEST:'RESET_PASSWORD_REQUEST' = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS:'RESET_PASSWORD_SUCCESS' = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED:'RESET_PASSWORD_FAILED' = 'RESET_PASSWORD_FAILED';

export const SET_PASSWORD_REQUEST:'SET_PASSWORD_REQUEST' = 'SET_PASSWORD_REQUEST';
export const SET_PASSWORD_SUCCESS:'SET_PASSWORD_SUCCESS' = 'SET_PASSWORD_SUCCESS';
export const SET_PASSWORD_FAILED: 'SET_PASSWORD_FAILED' = 'SET_PASSWORD_FAILED';

export interface ILoginRequest {
  readonly type: typeof LOGIN_REQUEST;
}
export interface ILoginSuccess {
  readonly type: typeof LOGIN_SUCCESS;
  token: string,
  name: string,
  email: string,
}
export interface ILoginFailed {
  readonly type: typeof LOGIN_FAILED;
}

export interface ILogoutRequest {
  readonly type: typeof LOGOUT_REQUEST;
}
export interface ILogoutSuccess {
  readonly type: typeof LOGOUT_SUCCESS;
}
export interface ILogoutFailed {
  readonly type: typeof LOGOUT_FAILED;
}

export interface IRegistrationRequest {
  readonly type: typeof REGISTRATION_REQUEST;
}
export interface IRegistrationSuccess {
  readonly type: typeof REGISTRATION_SUCCESS;
  token: string,
  name: string,
  email: string,
}
export interface IRegistrationFailed {
  readonly type: typeof REGISTRATION_FAILED;
}

export interface IGetUserRequest {
  readonly type: typeof GET_USER_REQUEST;
}
export interface IGetUserSuccess {
  readonly type: typeof GET_USER_SUCCESS;
  name: string,
  email: string,
}
export interface IGetUserFailed {
  readonly type: typeof GET_USER_FAILED;
}

export interface IUpdateUserRequest {
  readonly type: typeof UPDATE_USER_REQUEST;
}
export interface IUpdateUserSuccess {
  readonly type: typeof UPDATE_USER_SUCCESS;
  name: string,
  email: string,
}
export interface IUpdateUserFailed {
  readonly type: typeof UPDATE_USER_FAILED;
}

export interface ITokenRequest {
  readonly type: typeof TOKEN_REQUEST;
}
export interface ITokenSuccess {
  readonly type: typeof TOKEN_SUCCESS;
  token: string;
}
export interface ITokenFailed {
  readonly type: typeof TOKEN_FAILED;
}

export interface IResetPasswordRequest {
  readonly type: typeof RESET_PASSWORD_REQUEST;
}
export interface IResetPasswordSuccess {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
}
export interface IResetPasswordFailed {
  readonly type: typeof RESET_PASSWORD_FAILED;
}

export interface ISetPasswordRequest {
  readonly type: typeof SET_PASSWORD_REQUEST;
}
export interface ISetPasswordSuccess {
  readonly type: typeof SET_PASSWORD_SUCCESS;
  password: string;
}
export interface ISetPasswordFailed {
  readonly type: typeof SET_PASSWORD_FAILED;
}

export type TAuthActions = 
| ILoginRequest
| ILoginSuccess
| ILoginFailed
| ILogoutRequest
| ILogoutSuccess
| ILogoutFailed
| IRegistrationRequest
| IRegistrationSuccess
| IRegistrationFailed
| IGetUserRequest
| IGetUserSuccess
| IGetUserFailed
| IUpdateUserRequest
| IUpdateUserSuccess
| IUpdateUserFailed
| ITokenRequest
| ITokenSuccess
| ITokenFailed
| IResetPasswordRequest
| IResetPasswordSuccess
| IResetPasswordFailed
| ISetPasswordRequest
| ISetPasswordSuccess
| ISetPasswordFailed;

type TAuthDispatch = Dispatch<TApplicationActions>

const loginUrl = `${API_URL}/auth/login`;
const registerUrl = `${API_URL}/auth/register`;
const logoutUrl = `${API_URL}/auth/logout`;
const tokenRefreshUrl = `${API_URL}/auth/token`;
const getUserUrl = `${API_URL}/auth/user`;
const resetPassUrl = `${API_URL}/password-reset`;
const setPassUrl = `${API_URL}/password-reset/reset`;

export const login = (user:{email:string; password:string;}) => (dispatch: TAuthDispatch) => {
    dispatch({
      type: LOGIN_REQUEST,
    });
    requestData(loginUrl, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password,
      }),
    })
      .then((res) => {
        if (res && res.success) {
          const token = res.accessToken.split('Bearer ')[1];
          localStorage.setItem('refreshToken', res.refreshToken);
          dispatch({
            type: LOGIN_SUCCESS,
            name: res.user.name,
            email: res.user.email,
            token: token,
          });
        } else {
          return Promise.reject(`Ошибка ${res.status}`);
        }
      })
      .catch((error) => {
        console.error(error);
        dispatch({
          type: LOGIN_FAILED,
        });
      });
  };


export const logout = (token: string) => (dispatch: TAuthDispatch) => {
    dispatch({
      type: LOGOUT_REQUEST,
    });
    requestData(logoutUrl, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token,
      }),
    })
      .then((res) => {
        if (res && res.success) {
          localStorage.removeItem('refreshToken');
          dispatch({
            type: LOGOUT_SUCCESS,
          });
        } else {
          return Promise.reject(`Ошибка ${res.status}`);
        }
      })
      .catch(() => {
          dispatch({
            type: LOGOUT_FAILED,
          });
        }
      );
  };


export const registration = (user: {email:string; password:string; name: string}) => (dispatch: TAuthDispatch) => {
    dispatch({
      type: REGISTRATION_REQUEST,
    });
    requestData(registerUrl, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password,
        name: user.name,
      }),
    })
      .then((res) => {
        if (res && res.success) {
          const token = res.accessToken.split('Bearer ')[1];
          localStorage.setItem('refreshToken', res.refreshToken);
          dispatch({
            type: REGISTRATION_SUCCESS,
            name: res.user.name,
            email: res.user.email,
            token: token,
          });
        } else {
          return Promise.reject(`Ошибка ${res.status}`);
        }
      })
      .catch((error) => {
        console.error(error);
        dispatch({
          type: REGISTRATION_FAILED,
        });
      });
  };


export const tokenRefresh = () => (dispatch: TAuthDispatch) => {
    dispatch({
      type: TOKEN_REQUEST,
    });
    const refreshToken = localStorage.getItem('refreshToken');
    requestData(tokenRefreshUrl, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: refreshToken,
      }),
    })
      .then((res) => {
        if (res && res.success) {
          const token = res.accessToken.split('Bearer ')[1];
          localStorage.setItem('refreshToken', res.refreshToken);
          dispatch({
            type: TOKEN_SUCCESS,
            token: token,
          });
        } else {
          return Promise.reject(`Ошибка ${res.status}`);
        }
      })
      .catch((error) => {
        console.error(error);
        dispatch({
          type: TOKEN_FAILED,
        });
      });
  };


export const getUserData = (token:string) => (dispatch: TAuthDispatch) => {
  
    dispatch({
      type: GET_USER_REQUEST,
    });
    requestData(getUserUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_USER_SUCCESS,
            name: res.user.name,
            email: res.user.email,
          });
        } else {
          return Promise.reject(`Ошибка ${res.status}`);
        }
      })
      .catch(async () => {
        const newToken = await refreshToken();
        if (!newToken.success) {
          Promise.reject(newToken);
        }
        console.log(newToken);
        localStorage.setItem('refreshToken', newToken.refreshToken);
        token = newToken.accessToken;
        requestData(getUserUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: `${token}`,
          },
        })
          .then((res) => {
            if (res && res.success) {
              dispatch({
                type: GET_USER_SUCCESS,
                name: res.user.name,
                email: res.user.email,
              });
            } else {
              return Promise.reject(`Ошибка ${res.status}`);
            }
          })
          .catch((error) => {
            console.error(error);
            dispatch({
              type: GET_USER_FAILED,
            });
          });
      });
  };


export const updateUserData = (user: {email: string; password:string; name:string}, token:string) => (dispatch:TAuthDispatch) =>{
    dispatch({
      type: UPDATE_USER_REQUEST,
    });
    requestData(getUserUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password,
        name: user.name,
      }),
    })
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: UPDATE_USER_SUCCESS,
            name: res.user.name,
            email: res.user.email,
          });
        } else {
          return Promise.reject(`Ошибка ${res.status}`);
        }
      })
      .catch(async () => {
        const newToken = await refreshToken();
        if (!newToken.success) {
          Promise.reject(newToken);
        }
        console.log(newToken);
        localStorage.setItem('refreshToken', newToken.refreshToken);
        token = newToken.accessToken;
        requestData(getUserUrl, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            authorization: `${token}`,
          },
          body: JSON.stringify({
            email: user.email,
            password: user.password,
            name: user.name,
          }),
        })
          .then((res) => {
            if (res && res.success) {
              dispatch({
                type: UPDATE_USER_SUCCESS,
                name: res.user.name,
                email: res.user.email,
              });
            } else {
              return Promise.reject(`Ошибка ${res.status}`);
            }
          })
          .catch((error) => {
            console.error(error);
            dispatch({
              type: UPDATE_USER_FAILED,
            });
          });
      });
  };

export const restorePassword = (email:string) => (dispatch: TAuthDispatch) => {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });
    requestData(resetPassUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: RESET_PASSWORD_SUCCESS,
          });
        } else {
          return Promise.reject(`Ошибка ${res.status}`);
        }
      })
      .catch((error) => {
        console.error(error);
        dispatch({
          type: RESET_PASSWORD_FAILED,
        });
      });
  };

export const setNewPassword = (data: { password: string; key: string; }) => (dispatch: TAuthDispatch) => {
    dispatch({
      type: SET_PASSWORD_REQUEST,
    });
    requestData(setPassUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        password: data.password,
        token: data.key,
      }),
    })
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: SET_PASSWORD_SUCCESS,
            password: data.password,
          });
        } else {
          return Promise.reject(`Ошибка ${res.status}`);
        }
      })
      .catch((error) => {
        console.error(error);
        dispatch({
          type: SET_PASSWORD_FAILED,
        });
      });
  };

