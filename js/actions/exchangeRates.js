import { EXCHANGE_RATES } from '../actions';

/**
 * @param {string} cryptoCurrency - код криптовалюты. Например: 'BTC'.
 * @param {string} fiatCurrency - код фиатной валюты. Например: 'USD'.
 */
export function fetch(cryptoCurrency, fiatCurrency) {
  console.warn(JSON.stringify(cryptoCurrency, null, 2) + ' ' + JSON.stringify(fiatCurrency, null, 2));
  return {
    type: EXCHANGE_RATES.FETCH_EXCHANGE_RATES_STARTED,
    payload: {
      cryptoCurrency,
      fiatCurrency,
    },
  };
}

export function fetchSucceed(rates) {
  console.warn(JSON.stringify(rates, null, 2));
  return { type: EXCHANGE_RATES.FETCH_EXCHANGE_RATES_SUCCEED, rates };
}

export function fetchFailure(error) {
  return { type: EXCHANGE_RATES.FETCH_EXCHANGE_RATES_FAILURE, error };
}

export function getCached(state) {
  return (sourceCode, destCode) => (state.exchangeRates[sourceCode + '_' + destCode]);
}
