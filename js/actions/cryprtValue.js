import Api from '../services/Api';
import { CRYPT_VALUE } from '../actions';

export function fetch(dispatch, params) {
  Api.get('/exchange_rates?BTC=USD,USD&USD=USD', params) // FETCH RUB exchange_rates?BTC=USD,RUB&USD=RUB
    .then(response => dispatch(fetchSucceed(response.rates)))
    .catch(() => dispatch(fetchFailure('Ошибка /exchange_rates')));

  return { type: CRYPT_VALUE.FETCH_CRYPT_VALUE_START };
}

function fetchSucceed(rates) {
  return { type: CRYPT_VALUE.FETCH_CRYPT_VALUE_SUCCEED, ...rates };
}

function fetchFailure(error) {
  return { type: CRYPT_VALUE.FETCH_CRYPT_VALUE_FAILURE, error };
}

export function getCached(state) {
  return (sourceCode, destCode) => (state.exchangeRates[`${sourceCode}_${destCode}`]);
}
