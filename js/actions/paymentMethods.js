import { PAYMENT_METHODS } from '../actions'
import Api from '../services/Api'

export function fetch(dispatch) {
  Api.get('/payment_methods')
    .then(response => dispatch(fetchSucceed(response.data.payment_methods)))
    .catch(response => dispatch(fetchFailure('Ошибка /payment_methods')));

  return { type: PAYMENT_METHODS.FETCH_PAYMENT_METHODS_STARTED }
}

function fetchSucceed(paymentMethods) {
  return { type: PAYMENT_METHODS.FETCH_PAYMENT_METHODS_SUCCEED, paymentMethods: paymentMethods }
}

function fetchFailure(error) {
  return { type: PAYMENT_METHODS.FETCH_PAYMENT_METHODS_FAILURE, error: error }
}