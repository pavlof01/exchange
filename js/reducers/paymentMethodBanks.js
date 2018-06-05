import { PAYMENT_METHOD_BANKS } from '../actions'

const initial = {
    list: [],
};

export default (state = initial, action) => {
  switch (action.type) {
    case PAYMENT_METHOD_BANKS.FETCH_PAYMENT_METHOD_BANKS_STARTED: return {
      ...state, pending: true
    };

    case PAYMENT_METHOD_BANKS.FETCH_PAYMENT_METHOD_BANKS_SUCCEED: return {
      ...state, pending: false, list: action.banks
    };

    case PAYMENT_METHOD_BANKS.FETCH_PAYMENT_METHOD_BANKS_FAILURE: return {
      ...state, pending: false
    };

    default: return state;
  }
};