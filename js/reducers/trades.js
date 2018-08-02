import { fromJS, List } from 'immutable';
import { TRADES } from '../actions';

const initialState = fromJS({
  isFetch: false,
  items: [],
  lastLoadedPage: 0,
  isReachEnd: false,
  error: null,
});

const tradesReducer = (state = initialState, action) => {
  switch (action.type) {
    case TRADES.REFRESH_TRADES:
      return state
        .set('isFetch', true)
        .set('items', List([])) // eslint-disable-line new-cap
        .set('lastLoadedPage', 0)
        .set('isReachEnd', false)
        .set('error', null);

    case TRADES.FETCH_TRADES_STARTED:
      return state
        .set('isFetch', true)
        .set('error', null);

    case TRADES.FETCH_TRADES_SUCCEED: {
      const {
        trades,
        page,
      } = action.payload;
      const oldTrades = state.get('items');
      const newTrades = List([...oldTrades, ...trades]); // eslint-disable-line new-cap
      return state
        .set('isFetch', false)
        .set('items', newTrades)
        .set('lastLoadedPage', page)
        .set('isReachEnd', trades.length === 0 || false)
        .set('error', null);
    }

    case TRADES.FETCH_TRADES_FAILURE:
      return state
        .set('isFetch', false)
        .set('error', action.payload);

    default:
      return state;
  }
};

export default tradesReducer;
