import {ORDERS_FILTER, SESSION} from '../actions'
import { fetch } from '../actions/orders'

export default store => next => action => {
  if (action.type === ORDERS_FILTER.UPDATE_ORDERS_FILTER) {
    store.dispatch(fetch(store.dispatch, {...store.getState().ordersFilter, ...action.values}));
  } else if (action.type === SESSION.SESSION_SET_USER) {
    store.dispatch(fetch(store.dispatch, {...store.getState().ordersFilter, currencyCode: action.user.currencyCode, countryCode: action.user.countryCode}));
  }

  next(action);
}