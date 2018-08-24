import { EXCHANGE_RATES } from '../actions'
import Api from '../services/Api'

export function fetch(dispatch, params) {
  Api.get('/exchange_rates?BTC=USD,USD&retrospective=true', params)
    .then(response => dispatch(fetchSucceed(response.data.rates)))
    .catch(response => dispatch(fetchFailure('Ошибка /exchange_rates')));

  return { type: EXCHANGE_RATES.FETCH_EXCHANGE_RATES_STARTED }
}

function fetchSucceed(rates) {
  return { type: EXCHANGE_RATES.FETCH_EXCHANGE_RATES_SUCCEED, ...rates }
}

function fetchFailure(error) {
  return { type: EXCHANGE_RATES.FETCH_EXCHANGE_RATES_FAILURE, error: error }
}

export function getCached(state) {
  return (sourceCode, destCode) => (state.exchangeRates[sourceCode + '_' + destCode])
}