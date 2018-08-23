import { SESSION } from '../actions';
import getPosition from '../actions/position';

export default store => next => (action) => {
  if (action.type === SESSION.SESSION_SET_USER) {
    store.dispatch(getPosition(action.user, store.dispatch));
  }

  next(action);
};
