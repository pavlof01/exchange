import { CURRENCIES } from '../actions';

const initial = {
  list: [],
  selected: 'BTC',
};

export default (state = initial, action) => {
  switch (action.type) {
    case CURRENCIES.FETCH_CURRENCIES_STARTED: return {
      ...state, pending: true,
    };

    case CURRENCIES.FETCH_CURRENCIES_SUCCEED: return {
      ...state, pending: false, list: action.cryptoCurrencies,
    };

    case CURRENCIES.FETCH_CURRENCIES_FAILURE: return {
      ...state, pending: false,
    };

    case CURRENCIES.SET_SELECTED_CURRENCY: return {
      ...state, selected: action.selectedCurrency,
    };

    default: return state;
  }
};
