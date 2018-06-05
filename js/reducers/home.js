import { HOME } from '../actions'

const initial = {
  appLifetime: 0,
  totalAmount: 0,
  adBuyCount: 0,
  adSellCount: 0,
  adBuyMaxPrice: 0,
  adSellMinPrice: 0,
  walletCount: 0,
  tradesCount: 0,
  pending: false,
};

export default (state = initial, action) => {
  let {type, ...home} = action;

  switch (type) {
    case HOME.FETCH_HOME_STARTED: return {
      ...state, pending: true
    };

    case HOME.FETCH_HOME_SUCCEED: return {
      ...state, ...home, pending: false
    };

    case HOME.FETCH_HOME_FAILURE: return {
      ...state, pending: false
    };

    default: return state;
  }
};