import { ORDERS_FILTER, POSITION, SESSION } from '../actions';
import User from '../models/User';

const initial = {
  type: 'buy',
  sort: '-price',
  currencyCode: 'USD',
  cryptoCurrencyCode: 'BTC',
  countryCode: 'US',
  withCorrectLimits: true,
  paymentMethodCode: null,
  smsRequired: null,
  page: 1,
  limit: 15,
};

export default (state = initial, action) => {
  switch (action.type) {
    case ORDERS_FILTER.UPDATE_ORDERS_FILTER:
      action.values.currencyCode && User.setFavoriteCurrencyCode(action.values.currencyCode);
      action.values.countryCode && User.setFavoriteCountryCode(action.values.countryCode);
      return { ...state, ...action.values };

    case POSITION.GET_POSITION_RESULT: return {
      ...state,
      currencyCode: action.location.currencyCode,
      countryCode: action.location.countryCode,
    };

    case SESSION.SESSION_SET_USER:
      return {
        ...state,
        currencyCode: action.user.currencyCode || state.currencyCode,
        countryCode: action.user.countryCode || state.countryCode,
      };

    default: return state;
  }
};
