import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';
import {
  TRADES,
} from '../actions';
import {
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

export const tradesData = function* tradesData() {
  yield takeLatest(TRADES.FETCH_TRADES_STARTED, fetchTradesFlow);
};

export const resetTradesData = function* resetTradesData() {
  yield takeLatest(TRADES.REFRESH_TRADES, fetchTradesFlow);
};
