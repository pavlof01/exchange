import { TRADES } from '../actions';

export function refreshTrades(filterParams) {
  return {
    type: TRADES.REFRESH_TRADES,
    payload: filterParams,
  };
}

export function fetchTrades(filterParams) {
  return {
    type: TRADES.FETCH_TRADES_STARTED,
    payload: filterParams,
  };
}

export function fetchTradesSuccess(tradesPage) {
  return {
    type: TRADES.FETCH_TRADES_SUCCEED,
    payload: tradesPage,
  };
}

export function fetchTradesError(error) {
  return {
    type: TRADES.FETCH_TRADES_FAILURE,
    payload: error,
  };
}
