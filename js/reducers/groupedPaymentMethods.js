import { GROUPED_PAYMENT_METHODS } from '../actions'

const initial = {
  list: [],
};

export default (state = initial, action) => {
  switch (action.type) {
    case GROUPED_PAYMENT_METHODS.FETCH_GROUPED_PAYMENT_METHODS_STARTED: return {
      ...state, pending: true
    };

    case GROUPED_PAYMENT_METHODS.FETCH_GROUPED_PAYMENT_METHODS_SUCCEED: return {
      ...state, pending: false, list: action.paymentMethods
    };

    case GROUPED_PAYMENT_METHODS.FETCH_GROUPED_PAYMENT_METHODS_FAILURE: return {
      ...state, pending: false
    };

    default: return state;
  }
};