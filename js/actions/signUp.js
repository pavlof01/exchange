export const SIGN_UP = 'SIGN_UP';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_ERROR = 'SIGN_UP_ERROR';
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';

export function signUpRequest() {
    return {
        type: SIGN_UP_REQUEST,
    };
}

export function signUpSuccess(params) {
  return {
    type: SIGN_UP_SUCCESS,
    payload: params,
  };
}

export function signUpFailure(error) {
  return {
    type: SIGN_UP_ERROR,
    payload: error,
  };
}

export function signUp(params) {
    return {
        type: SIGN_UP,
        payload: params,
    };
}