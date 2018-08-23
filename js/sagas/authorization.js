import { call, put, takeLatest } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import LoginUser from '../models/User/Login';
import Api from '../services/Api';
import {
  setUser, setFailure, logoutSuccess, loginRequest, loginSuccess, isFetchingUser,
} from '../actions/session';
import { APP, SESSION } from '../actions';
import { openPincodeAutorization } from '../actions/navigation';

function userFetch() {
  return Api.get('/me')
    .then(response => new LoginUser(response.data.user));
}

function userLoginViaApi(values) {
  return Api.post('/logins', values)
    .then(response => new LoginUser(response.data.user));
}

function saveToken(token) {
  if (token) {
    AsyncStorage.setItem(Api.tokenName, token);
  } else {
    AsyncStorage.removeItem(Api.tokenName);
  }
  if (Api.currentToken !== token) {
    Api.createApiWithToken(token);
  }
}

export const login = function* login(action) {
  try {
    const user = yield call(userLoginViaApi,
      { login: action.payload.login, password: action.payload.password });

    saveToken(user.api_token);
    yield put(setUser(user));
    yield put(loginSuccess());
  } catch (err) {
    if (err.response && err.response.status === 422) {
      yield put(setFailure({ error: ' : Username or password is incorrect' }));
    } else {
      yield put(setFailure({ error: ' : Something went wrong' }));
    }
  }
};

export const loginData = function* loginData() {
  yield takeLatest(SESSION.LOGIN, login);
};

export const logout = function* logout() {
  saveToken(undefined);
  yield put(logoutSuccess());
};

export const logoutData = function* logoutData() {
  yield takeLatest(SESSION.LOGOUT, logout);
};

export const dynamicInitialRoute = function* dynamicInitialRoute() {
  try {
    const token = yield call(AsyncStorage.getItem, Api.tokenName);
    Api.createApiWithToken(token);

    if (!token) {
      yield put(loginRequest());
    } else {
      yield put(isFetchingUser());
      const user = yield call(userFetch);
      saveToken(user.api_token);
      yield put(setUser(user));
      yield put(loginSuccess());
    }
  } catch (err) {
    if (err.request && err.request.status === 401) {
      yield put(loginRequest());
    } else {
      yield put(setFailure({ error: err }));
    }
  }
};

export const checkPincode = function* checkPincode() {
  const pincode = yield call(AsyncStorage.getItem, 'pincode');
  if (pincode) {
    yield put(openPincodeAutorization());
  } else {
    yield call(dynamicInitialRoute);
  }
};

export const checkPincodeData = function* checkPincodeData() {
  yield takeLatest(APP.CHECK_PINCODE, checkPincode);
};


export const dynamicInitialRouteData = function* dynamicInitialRouteData() {
  yield takeLatest(APP.DYNAMIC_INITIAL_ROUTE, dynamicInitialRoute);
};
