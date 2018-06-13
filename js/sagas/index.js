import {all, fork} from 'redux-saga/effects';
import {
    loginData,
    logoutData, loginOnSuccessData,
} from './authorization';
import {
    signUpData,
} from './signup';
const rootSagas = function* root() {
    yield all([
        fork(loginData),
        fork(logoutData),
        fork(loginOnSuccessData),
        fork(signUpData),
    ]);
};

export default rootSagas;
