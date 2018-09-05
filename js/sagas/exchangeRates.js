import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';
import { EXCHANGE_RATES } from '../actions';
import Api from '../services/Api';
import { fetchFailure, fetchSucceed } from '../actions/exchangeRates';

/**
 * Загружает актуальные изменения курса.
 *
 * @param {string} cryptoCurrency - код криптовалюты. Например: 'BTC'.
 * @param {string} fiatCurrency - код фиатной валюты. Например: 'USD'.
 * @return {Promise}
 */
function fetchExchangeRatesViaApi(cryptoCurrency, fiatCurrency) {
  return Api.get(`/exchange_rates?${cryptoCurrency}=${fiatCurrency}&retrospective=true`)
    .then(response => (response.data));
}

export const fetchExchangeRatesFlow = function* fetchExchangeRatesFlow(action) {
  const {
    cryptoCurrency,
    fiatCurrency,
  } = action.payload;
  try {
    const responseData = yield call(
      fetchExchangeRatesViaApi, cryptoCurrency, fiatCurrency,
    );
    yield put(fetchSucceed(responseData.rates[`${cryptoCurrency}_${fiatCurrency}`]));
  } catch (error) {
    yield put(fetchFailure(error));
  }
};

export const fetchExchangeRatesData = function* fetchExchangeRatesData() {
  yield takeLatest(EXCHANGE_RATES.FETCH_EXCHANGE_RATES_STARTED, fetchExchangeRatesFlow);
};
