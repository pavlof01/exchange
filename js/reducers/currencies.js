import { CURRENCIES } from '../actions'

const initial = {
  list: [],
};

export default (state = initial, action) => {
  switch (action.type) {
    case CURRENCIES.FETCH_CURRENCIES_STARTED: return {
      ...state, pending: true
    };

    case CURRENCIES.FETCH_CURRENCIES_SUCCEED: return {
      ...state, pending: false, list: action.currencies
    };

    case CURRENCIES.FETCH_CURRENCIES_FAILURE: return {
      ...state, pending: false
    };

    default: return state;
  }
};