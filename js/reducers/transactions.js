import { SESSION } from '../actions';
import { reducerPaginatedListFactory } from './heplers/basePaginatedList';

export const transactionsReducer = reducerPaginatedListFactory(
  SESSION.FETCH_TRANSACTIONS_STARTED,
  SESSION.FETCH_TRANSACTIONS_SUCCEED,
  SESSION.FETCH_TRANSACTIONS_FAILURE,
  SESSION.REFRESH_TRANSACTIONS,
);

export default transactionsReducer;
