import {all, fork} from 'redux-saga/effects';
import {
    dynamicInitialRouteData,
    loginData,
    logoutData,
} from './authorization';
import {
    signUpData,
} from './signup';
import {
    recoverData
} from './recoverPassword';
const rootSagas = function* root() {
    yield all([
        fork(dynamicInitialRouteData),
        fork(loginData),
        fork(logoutData),
        fork(signUpData),
        fork(recoverData),
    ]);
};

export default rootSagas;
