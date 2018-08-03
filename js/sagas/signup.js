import { call, put, takeLatest } from 'redux-saga/effects';
import {
  SIGN_UP,
  signUpFailure,
  signUpSuccess,
} from '../actions/signUp';
import LoginUser from '../models/User/Login';
import Api from '../services/Api';


function userSignUpViaApi(values) {
  return Api.post('/users', { user: values })
    .then(response => new LoginUser(response.data.user));
}

export const userSignUp = function* userSignUp(action) {
  try {
    const user = yield call(userSignUpViaApi, action.payload);

    const result = {
      user,
    };
    yield put(signUpSuccess(result));
  } catch (err) {
    if (err.response.status === 422) {
      const errors = [];
      for (const prop in err.response.data.errors) {
        errors.push(`${prop}: ${err.response.data.errors[prop]}`);
      }
      yield put(signUpFailure({ error: errors.join('; ') }));
    } else {
      yield put(signUpFailure({ error: 'Что-то пошло не так, повторите позже' }));
    }
  }
};

export const signUpData = function* loginData() {
  yield takeLatest(SIGN_UP, userSignUp);
};

/*
export const loginOnSuccess = function* loginOnSuccess(action) {
    yield put(loginSetUser(action.payload.user));
};

export const loginOnSuccessData = function* loginOnSuccessData() {
    yield takeLatest(LOGIN_SUCCESS, loginOnSuccess);
}; */
