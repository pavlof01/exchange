import { CURRENT_TRADE } from '../actions'
import Api from '../services/Api'
import { keysToCamelCase } from '../helpers'

export function fetch(dispatch, id) {
  Api.get('/trades/' + id)
    .then(response => dispatch(set(response.data.trade)));

  return { type: CURRENT_TRADE.CURRENT_TRADE_SET, trade: null }
}

export function set(trade) {
  return { type: CURRENT_TRADE.CURRENT_TRADE_SET, trade: keysToCamelCase(trade) }
}

export function update(trade) {
  return { type: CURRENT_TRADE.CURRENT_TRADE_UPDATE, trade: keysToCamelCase(trade) }
}