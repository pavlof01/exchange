import Api from '../services/Api';
import { CRYPT_VALUE } from '../actions';

export function fetch(dispatch, params = { crypt: 'BTC' }) {
  const { crypt } = params;
  Api.get(`/exchange_rates?${crypt}=USD,RUB,EUR&USD=USD,RUB,EUR`, params)
    .then(response => dispatch(fetchSucceed(response.data.rates)))
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
