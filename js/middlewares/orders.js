import { ORDERS_FILTER } from '../actions'
import { fetch } from '../actions/orders'

export default store => next => action => {
  if (action.type === ORDERS_FILTER.UPDATE_ORDERS_FILTER) {
    fetch(store.dispatch, {...store.getState().ordersFilter, ...action.values});
  }

  next(action);
}