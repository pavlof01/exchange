import { TRADES } from '../actions';

export function fetchTrades(filterParams) {
  return {
    type: TRADES.FETCH_TRADES_STARTED,
    payload: filterParams,
  };
}

export function fetchTradesSuccess(trades) {
  return {
    type: TRADES.FETCH_TRADES_SUCCEED,
    payload: trades,
  };
}

export function fetchTradesError(error) {
  return {
    type: TRADES.FETCH_TRADES_FAILURE,
    payload: error,
  };
}
