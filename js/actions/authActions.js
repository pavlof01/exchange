export const LOGOUT = 'LOGOUT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';
export const LOGIN = 'LOGIN';
export const LOGIN_SET_USER = 'LOGIN_SET_USER';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export function loginSuccess(params) {
  return {
    type: LOGIN_SUCCESS,
    payload: params,
  };
}

export function loginFailure(error) {
  return {
    type: LOGIN_FAILURE,
    payload: error,
  };
}

export function login(params) {
    return {
        type: LOGIN,
        payload: params,
    };
}

export function loginSetUser(user) {
    return { type: LOGIN_SET_USER, user: user }
}

export function logout() {
    return {
        type: LOGOUT,
    };
}

export function logoutSuccess() {
    return {
        type: LOGOUT_SUCCESS,
    };
}

export function logoutError(error) {
    return {
        type: LOGOUT_ERROR,
        payload: error,
    };
}