import { fromJS, List } from 'immutable';

const initialState = fromJS({
  isRefreshing: false,
  isFetching: false,
  items: [],
  error: null,
  lastLoadedPage: 0,
  isReachEnd: false,
});

/**
 * Базовая фабрика для reducer'а простого списка.
 *
 * @param {string} FETCH_LIST_STARTED_TYPE - тип действия,
 * при котором происходит старт загрузки списка.
 * @param {string} FETCH_LIST_SUCCESS_TYPE - тип действия,
 * при котором происходит успешная загрузка списка.
 * @param {string} FETCH_LIST_FAILURE_TYPE - тип действия,
 * при котором происходит ошибка загрузки списка.
 * @param {string} [REFRESH_LIST_TYPE] - тип действия при котором происходит ошибка загрузки списка.
 * @return {Object} reducer списка.
 */
export function reducerPaginatedListFactory( // eslint-disable-line import/prefer-default-export
  FETCH_LIST_STARTED_TYPE,
  FETCH_LIST_SUCCESS_TYPE,
  FETCH_LIST_FAILURE_TYPE,
  REFRESH_LIST_TYPE,
) {
  return (state = initialState, action) => {
    if (REFRESH_LIST_TYPE && action.type === REFRESH_LIST_TYPE) {
      return state
        .set('isRefreshing', true)
        .set('items', List([])) // eslint-disable-line new-cap
        .set('lastLoadedPage', 0)
        .set('isReachEnd', false)
        .set('error', null);
    }
    switch (action.type) {
      case FETCH_LIST_STARTED_TYPE: {
        return state
          .set('isFetching', true)
          .set('error', null);
      }
      case FETCH_LIST_SUCCESS_TYPE: {
        const items = state.get('items').toJS();
        const newItems = items.concat(action.payload.items);
        return state
          .set('isRefreshing', false)
          .set('isFetching', false)
          .set('items', List(newItems)) // eslint-disable-line new-cap
          .set('lastLoadedPage', action.payload.page)
          .set('isReachEnd', action.payload.items.length === 0 || false)
          .set('error', null);
      }
      case FETCH_LIST_FAILURE_TYPE: {
        return state
          .set('isRefreshing', false)
          .set('isFetching', false)
          .set('error', action.payload);
      }
      default:
        return state;
    }
  };
}
