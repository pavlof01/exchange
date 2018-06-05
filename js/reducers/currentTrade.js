import { CURRENT_TRADE } from '../actions'

const initial = {
  trade: null,
};

export default (state = initial, action) => {
  switch (action.type) {
    case CURRENT_TRADE.CURRENT_TRADE_SET: return {
      ...state, trade: action.trade
    };

    case CURRENT_TRADE.CURRENT_TRADE_UPDATE:
      return state.trade && state.trade.id === action.trade.id ?
        {...state, trade: action.trade} :
        state;

    default: return state;
  }
};