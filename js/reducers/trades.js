import { fromJS, List } from 'immutable';
import { TRADES } from '../actions';

const initialState = fromJS({
  isFetch: false,
  items: [],
  error: null,
});

const tradesReducer = (state = initialState, action) => {
  switch (action.type) {
    case TRADES.FETCH_TRADES_STARTED:
      return state
        .set('isFetch', true)
        .set('items', List([])) // eslint-disable-line new-cap
        .set('error', null);

    case TRADES.FETCH_TRADES_SUCCEED:
      return state
        .set('isFetch', false)
        .set('items', List(action.payload)) // eslint-disable-line new-cap
        .set('error', null);

    case TRADES.FETCH_TRADES_FAILURE:
      return state
        .set('isFetch', false)
        .set('error', action.payload);

    default:
      return state;
  }
};

export default tradesReducer;
