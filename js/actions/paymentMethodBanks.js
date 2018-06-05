import { PAYMENT_METHOD_BANKS } from '../actions'
import Api from '../services/Api'

export function fetch(dispatch) {
  Api.get('/payment_method_banks')
    .then(response => dispatch(fetchSucceed(response.data.banks)))
    .catch(response => dispatch(fetchFailure('Ошибка /payment_method_banks')));

  return { type: PAYMENT_METHOD_BANKS.FETCH_PAYMENT_METHOD_BANKS_STARTED }
}

function fetchSucceed(banks) {
  return { type: PAYMENT_METHOD_BANKS.FETCH_PAYMENT_METHOD_BANKS_SUCCEED, banks: banks }
}

function fetchFailure(error) {
  return { type: PAYMENT_METHOD_BANKS.FETCH_PAYMENT_METHOD_BANKS_FAILURE, error: error }
}