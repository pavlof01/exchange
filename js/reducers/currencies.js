import { CURRENCIES } from '../actions'

const initial = {
  list: [],
};

const currencyFilter = new Set();

currencyFilter.add("CNY");
currencyFilter.add("EUR");
currencyFilter.add("GBP");
currencyFilter.add("USD");
currencyFilter.add("RUB");

export default (state = initial, action) => {
  switch (action.type) {
    case CURRENCIES.FETCH_CURRENCIES_STARTED: return {
      ...state, pending: true
    };

    case CURRENCIES.FETCH_CURRENCIES_SUCCEED: return {
      ...state, pending: false, list: action.currencies.filter((cur) => currencyFilter.has(cur.code))
    };

    case CURRENCIES.FETCH_CURRENCIES_FAILURE: return {
      ...state, pending: false
    };

    default: return state;
  }
};