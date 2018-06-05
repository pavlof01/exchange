import { CURRENCIES } from '../actions'
import Api from '../services/Api'

export function fetch(dispatch) {
  Api.get('/currencies')
    .then(response => dispatch(fetchSucceed(response.data)))
    .catch(response => dispatch(fetchFailure('Ошибка /currencies')));

  return { type: CURRENCIES.FETCH_CURRENCIES_STARTED }
}

function fetchSucceed(data) {
  return { type: CURRENCIES.FETCH_CURRENCIES_SUCCEED, ...data }
}

function fetchFailure(error) {
  return { type: CURRENCIES.FETCH_CURRENCIES_FAILURE, error: error }
}

export function setSelectedCurrency(currency) {
  return { type: CURRENCIES.SET_SELECTED_CURRENCY, selectedCurrency: currency }
}