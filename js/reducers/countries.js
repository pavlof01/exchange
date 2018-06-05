import { COUNTRIES } from '../actions'

const initial = {
    list: [],
    phone_codes: []
};

export default (state = initial, action) => {
  switch (action.type) {
    case COUNTRIES.FETCH_COUNTRIES_STARTED: return {
      ...state, pending: true
    };

    case COUNTRIES.FETCH_COUNTRIES_SUCCEED: return {
      ...state, pending: false, list: action.countries
    };

    case COUNTRIES.FETCH_COUNTRIES_FAILURE: return {
      ...state, pending: false
    };

    case COUNTRIES.FETCH_PHONE_CODES_SUCCEED: return {
      ...state, phone_codes: action.data, pending: false
    };

    default: return state;
  }
};