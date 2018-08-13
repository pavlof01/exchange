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
