import {
  call,
  put,
  takeLatest,
  select,
} from 'redux-saga/effects';
import {
  TRADES,
  CURRENT_TRADE,
} from '../actions';
import {
  refreshTrades,
  fetchTradesSuccess,
  fetchTradesError,
} from '../actions/trades';
import Api from '../services/Api';

function fetchTradesViaApi(filterParams) {
  return Api.get('/trades', filterParams)
    .then((response) => {
      const page = filterParams.page || 0;
      if (response && response.data && response.data.trades) {
        return {
          trades: response.data.trades,
          limit: filterParams.limit,
          page,
        };
      }
      return null;
    });
}

export const fetchTradesFlow = function* fetchTradesFlow(action) {
  try {
    const tradesPage = yield call(fetchTradesViaApi, action.payload);
    yield put(fetchTradesSuccess(tradesPage));
  } catch (error) {
    yield put(fetchTradesError(error));
  }
};

export const resetTradesAfterSetNewFlow = function* resetTradesAfterSetNewFlow(action) {
  const trades = yield select(state => state.trades.get('items').toJS());
  const isNewTrade = yield call(() => {
    let newTrade = true;
    trades.forEach((trade) => {
      if (action.trade && action.trade.id && trade.id === action.trade.id) {
        newTrade = false;
      }
    });
    return newTrade;
  });
  if (isNewTrade) {
    const params = {
      scope: 'info_panel',
      limit: 15,
      page: 1,
    };
    yield put(refreshTrades(params));
  }
};

export const tradesData = function* tradesData() {
  yield takeLatest(TRADES.FETCH_TRADES_STARTED, fetchTradesFlow);
};

export const resetTradesData = function* resetTradesData() {
  yield takeLatest(TRADES.REFRESH_TRADES, fetchTradesFlow);
};

/**
 * Данная сага следит за появлением новой сделки.
 * Если появляется сделка с новым id, запускает обновление списка trades.
 * @return {IterableIterator<*>}
 */
export const resetTradesAfterSetNew = function* resetTradesAfterSetNew() {
  yield takeLatest(CURRENT_TRADE.CURRENT_TRADE_SET, resetTradesAfterSetNewFlow);
};
