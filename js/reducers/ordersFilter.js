import { ORDERS_FILTER, POSITION } from '../actions'
import User from '../models/User'

const initial = {
  currencyCode: User.getFavoriteCurrencyCode() || 'USD',
  cryptoCurrencyCode: 'BTC',
  countryCode: User.getFavoriteCountryCode() || 'US',
  withCorrectLimits: true,
  paymentMethodCode: null,
  smsRequired: null,
  sort: null,
  page: 1,
  limit: 2,
};

export default (state = initial, action) => {
  switch (action.type) {
    case ORDERS_FILTER.UPDATE_ORDERS_FILTER:
      action.values.currencyCode && User.setFavoriteCurrencyCode(action.values.currencyCode);
      action.values.countryCode && User.setFavoriteCountryCode(action.values.countryCode);
      return {...state, ...action.values};

    case POSITION.GET_POSITION_RESULT: return {
      ...state,
      currencyCode: action.location.currencyCode,
      countryCode: action.location.countryCode
    };

    // case SESSION.SESSION_SET_USER:
    //   return {
    //     ...state,
    //     currencyCode: action.user.currencyCode || state.currencyCode,
    //     countryCode: action.user.countryCode || state.countryCode,
    //   };

    default: return state;
  }
};