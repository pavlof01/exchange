import { EXCHANGE_RATES } from '../actions';

const initial = {
  pending: false,
  rates: null,
  rate: 0,
};

export default (state = initial, action) => {
  const { type, ...rates } = action;

  switch (type) {
    case EXCHANGE_RATES.FETCH_EXCHANGE_RATES_STARTED: return {
      ...state, pending: true,
    };

    case EXCHANGE_RATES.FETCH_EXCHANGE_RATES_SUCCEED: return {
      ...state, ...rates, pending: false,
    };

    case EXCHANGE_RATES.FETCH_EXCHANGE_RATES_FAILURE: return {
      ...state, pending: false,
    };

    default: return state;
  }
};
