import { ORDERS } from '../actions'

const initial = {
  list: [],
  page: null,
  pages: null,
  total: null,
  pending: false,
};

export default (state = initial, action) => {
  switch (action.type) {
    case ORDERS.FETCH_ORDERS_STARTED: return {
      ...state, pending: true
    };

    case ORDERS.FETCH_ORDERS_SUCCEED: return {
      ...state,
      pending: false,
      list: action.ads,
      page: action.page,
      pages: action.pages,
      total: action.total,
    };

    case ORDERS.FETCH_ORDERS_FAILURE: return {
      ...state, pending: false
    };

    default: return state;
  }
};