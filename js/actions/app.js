import { APP } from '../actions';

export function ready() {
  return { type: APP.APP_READY };
}

export function dynamicInitialRoute() {
  return { type: APP.DYNAMIC_INITIAL_ROUTE };
}

export function checkPincode() {
  return { type: APP.CHECK_PINCODE };
}

export function setTradeIdForRedirect(tradeId) {
  return {
    type: APP.SET_TRADE_ID_FOR_REDIRECT,
    payload: { tradeId },
  };
}

export function removeTradeId() {
  return { type: APP.REMOVE_TRADE_ID };
}
