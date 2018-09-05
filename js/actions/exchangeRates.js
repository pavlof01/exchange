import { EXCHANGE_RATES } from '../actions';

/**
 * @param {string} cryptoCurrency - код криптовалюты. Например: 'BTC'.
 * @param {string} fiatCurrency - код фиатной валюты. Например: 'USD'.
 */
export function fetch(cryptoCurrency, fiatCurrency) {
  return {
    type: EXCHANGE_RATES.FETCH_EXCHANGE_RATES_STARTED,
    payload: {
      cryptoCurrency,
      fiatCurrency,
    },
  };
}

export function fetchSucceed(payload) {
  return {
    type: EXCHANGE_RATES.FETCH_EXCHANGE_RATES_SUCCEED,
    rates: payload.rates,
    rate: payload.rate,
    fiatCurrency: payload.fiatCurrency,
  };
}

export function fetchFailure(error) {
  return { type: EXCHANGE_RATES.FETCH_EXCHANGE_RATES_FAILURE, error };
}
