import { CRYPT_VALUE } from '../actions';

const initial = {
  pending: false,
};

export default (state = initial, action) => {
  const { type, ...rates } = action;

  switch (type) {
    case CRYPT_VALUE.FETCH_CRYPT_VALUE_START: return {
      ...state, pending: true,
    };

    case CRYPT_VALUE.FETCH_CRYPT_VALUE_SUCCEED: return {
      ...state, ...rates, pending: false,
    };

    case CRYPT_VALUE.FETCH_CRYPT_VALUE_FAILURE: return {
      ...state, pending: false,
    };

    default: return state;
  }
};
