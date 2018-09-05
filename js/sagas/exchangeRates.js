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

/**
 * Загружает текущий курс.
 *
 * @param {string} cryptoCurrency - код криптовалюты. Например: 'BTC'.
 * @param {string} fiatCurrency - код фиатной валюты. Например: 'USD'.
 * @return {Promise}
 */
function fetchExchangeRateViaApi(cryptoCurrency, fiatCurrency) {
  return Api.get(`/exchange_rates?${cryptoCurrency}=${fiatCurrency}`)
    .then(response => (response.data));
}

/**
 * Загружает текущий курс и актуальные изменения курса.
 *
 * @param {string} cryptoCurrency - код криптовалюты. Например: 'BTC'.
 * @param {string} fiatCurrency - код фиатной валюты. Например: 'USD'.
 * @return {Promise}
 */
function fetchExchangeRateValues(cryptoCurrency, fiatCurrency) {
  return Promise.all([
    fetchExchangeRatesViaApi(cryptoCurrency, fiatCurrency),
    fetchExchangeRateViaApi(cryptoCurrency, fiatCurrency),
  ]).then((results) => {
    const rates = results[0].rates[`${cryptoCurrency}_${fiatCurrency}`];
    const rate = results[1].rates[`${cryptoCurrency}_${fiatCurrency}`];
    return {
      rates,
      rate,
    };
  });
}

export const fetchExchangeRatesFlow = function* fetchExchangeRatesFlow(action) {
  const {
    cryptoCurrency,
    fiatCurrency,
  } = action.payload;
  try {
    const responseData = yield call(
      fetchExchangeRateValues, cryptoCurrency, fiatCurrency,
    );
    yield put(fetchSucceed(responseData));
  } catch (error) {
    yield put(fetchFailure(error));
  }
};

export const fetchExchangeRatesData = function* fetchExchangeRatesData() {
  yield takeLatest(EXCHANGE_RATES.FETCH_EXCHANGE_RATES_STARTED, fetchExchangeRatesFlow);
};
