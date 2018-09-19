import { APP, SESSION } from '../actions';

const initial = {
  ready: false,
  tradeId: null,
};

export default (state = initial, action) => {
  switch (action.type) {
    case APP.APP_READY: return {
      ...state, ready: true,
    };

    case SESSION.FETCHING_USER: return {
      ...state, ready: false,
    };

    case SESSION.FETCH_USER_FAILURE: return {
      ...state, ready: true,
    };

    case SESSION.SESSION_SET_USER: return {
      ...state, ready: true,
    };

    case APP.SET_TRADE_ID_FOR_REDIRECT: return {
      ...state, tradeId: action.payload.tradeId,
    };

    case APP.REMOVE_TRADE_ID: return {
      ...state, tradeId: null,
    };

    default: return state;
  }
};
