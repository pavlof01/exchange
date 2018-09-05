import { all, fork } from 'redux-saga/effects';
import {
  dynamicInitialRouteData,
  loginData,
  logoutData,
  checkPincodeData,
} from './authorization';
import {
  signUpData,
} from './signup';
import {
  recoverData,
} from './recoverPassword';
import {
  resetTradesData,
  tradesData,
  resetTradesAfterSetNew,
} from './trades';
import {
  fetchExchangeRatesData,
} from './exchangeRates';

const rootSagas = function* root() {
  yield all([
    fork(checkPincodeData),
    fork(dynamicInitialRouteData),
    fork(loginData),
    fork(logoutData),
    fork(signUpData),
    fork(recoverData),
    fork(resetTradesData),
    fork(tradesData),
    fork(resetTradesAfterSetNew),
    fork(fetchExchangeRatesData),
  ]);
};

export default rootSagas;
