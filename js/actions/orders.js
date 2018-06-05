import { ORDERS } from '../actions'
import Api from '../services/Api'
import { keysToSnakeCase } from '../helpers'

export function fetch(dispatch, params = {}) {
  Api.get('/pro/search', keysToSnakeCase(params))
    .then(response => dispatch(fetchSucceed(response.data)))
    .catch(response => dispatch(fetchFailure('Ошибка /pro')));

  return { type: ORDERS.FETCH_ORDERS_STARTED }
}

function fetchSucceed(data) {
  return { type: ORDERS.FETCH_ORDERS_SUCCEED, ...data }
}

function fetchFailure(error) {
  return { type: ORDERS.FETCH_ORDERS_FAILURE, error: error }
}
