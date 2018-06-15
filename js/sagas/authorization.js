import {call, put, takeLatest} from 'redux-saga/effects';
import {
    LOGOUT,
    LOGIN,
    LOGIN_SUCCESS,
    logoutSuccess,
    loginSuccess,
    loginFailure,
    loginSetUser,
} from '../actions/authActions';
import LoginUser from "../models/User/Login";
import Api from "../services/Api";


function userLoginViaApi(values) {
    return Api.post('/logins', values)
        .then(response => {
            return new LoginUser(response.data.user);
        })
}

export const login = function* login(action) {
    try {
        const user = yield call(userLoginViaApi, {login: action.payload.login, password: action.payload.password});

        const result = {
            user,
        };
        yield put(loginSuccess(result));
    } catch (err) {
        if (err.response.status === 422) {
            yield put(loginFailure({error: 'Не правильный логин или пароль'}));
        } else {
            yield put(loginFailure({error: 'Что-то пошло не так, повторите позже'}));
        }
    }
};

export const loginData = function* loginData() {
    yield takeLatest(LOGIN, login);
};

export const loginOnSuccess = function* loginOnSuccess(action) {
    yield put(loginSetUser(action.payload.user));
};

export const loginOnSuccessData = function* loginOnSuccessData() {
    yield takeLatest(LOGIN_SUCCESS, loginOnSuccess);
};

export const logout = function* logout() {
    yield put(logoutSuccess());
};

export const logoutData = function* logoutData() {
    yield takeLatest(LOGOUT, logout);
};
