import {all, fork} from 'redux-saga/effects';
import {
    loginData,
    logoutData, loginOnSuccessData,
} from './authorization';

const rootSagas = function* root() {
    yield all([
        fork(loginData),
        fork(logoutData),
        fork(loginOnSuccessData),
    ]);
};

export default rootSagas;
