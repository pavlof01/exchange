import { put, takeLatest } from 'redux-saga/effects';
import {
  RECOVER_PASSWORD,
  recoverSuccess,
  recoverError,
} from '../actions/recoverPassword';
import Api from '../services/Api';

export const recover = function* recover(action) {
  try {
    Api.post('/users/passwords', action.payload).then(
      yield put(recoverSuccess()),
    );
  } catch (err) {
    yield put(recoverError({ error: 'Что-то пошло не так, повторите позже' }));
  }
};

export const recoverData = function* recoverData() {
  yield takeLatest(RECOVER_PASSWORD, recover);
};
