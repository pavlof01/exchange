import {all, fork} from 'redux-saga/effects';
import {
    loginData,
    logoutData,
    loginOnSuccessData,
} from './authorization';
import {
    signUpData,
} from './signup';
import {
    recoverData
} from './recoverPassword';
const rootSagas = function* root() {
    yield all([
        fork(loginData),
        fork(logoutData),
        fork(loginOnSuccessData),
        fork(signUpData),
        fork(recoverData),
    ]);
};

export default rootSagas;
