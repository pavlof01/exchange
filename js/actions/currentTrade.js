import { CURRENT_TRADE } from '../actions';
import Api from '../services/Api';

export function fetch(dispatch, id) {
  Api.get(`/trades/${id}`)
    .then(response => dispatch(set(response.data.trade)));

  return { type: CURRENT_TRADE.CURRENT_TRADE_SET, trade: { id } };
}

export function fetchFromTrade(dispatch, trade) {
  Api.get(`/trades/${trade.id}`)
    .then(response => dispatch(set(response.data.trade)));

  return { type: CURRENT_TRADE.CURRENT_TRADE_SET, trade };
}

export function set(trade) {
  return { type: CURRENT_TRADE.CURRENT_TRADE_SET, trade };
}

export function update(trade) {
  return { type: CURRENT_TRADE.CURRENT_TRADE_UPDATE, trade };
}
