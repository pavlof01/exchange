import { HOME_FILTER, POSITION, SESSION } from '../actions';

const initial = {
  currencyCode: 'RUB',
  cryptoCurrencyCode: 'BTC',
};

export default (state = initial, action) => {
  const { type, ...values } = action;

  switch (type) {
    case HOME_FILTER.UPDATE_HOME_FILTER: return {
      ...state, ...values,
    };

    case POSITION.GET_POSITION_RESULT: return {
      ...state, currencyCode: action.location.currencyCode,
    };

    case SESSION.SESSION_SET_USER:
      return action.user.currencyCode
        ? { ...state, currencyCode: action.user.currencyCode }
        : state;

    default: return state;
  }
};
