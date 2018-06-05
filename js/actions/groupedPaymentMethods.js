import { GROUPED_PAYMENT_METHODS } from '../actions'
import Api from '../services/Api'

export function fetch(dispatch) {
  Api.get('/payment_methods/grouped')
    .then(response => dispatch(fetchSucceed(response.data.payment_methods)))
    .catch(response => dispatch(fetchFailure('Ошибка /payment_methods')));

  return { type: GROUPED_PAYMENT_METHODS.FETCH_GROUPED_PAYMENT_METHODS_STARTED }
}

function fetchSucceed(paymentMethods) {
  return { type: GROUPED_PAYMENT_METHODS.FETCH_GROUPED_PAYMENT_METHODS_SUCCEED, paymentMethods: paymentMethods }
}

function fetchFailure(error) {
  return { type: GROUPED_PAYMENT_METHODS.FETCH_GROUPED_PAYMENT_METHODS_FAILURE, error: error }
}