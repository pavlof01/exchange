import { APP, SESSION } from '../actions';

const initial = {
  ready: false,
};

export default (state = initial, action) => {
  switch (action.type) {
    case APP.APP_READY: return {
      ...state, ready: true,
    };

    case SESSION.FETCHING_USER: return {
      ...state, ready: false,
    };

    case SESSION.FETCH_USER_FAILURE: return {
      ...state, ready: true,
    };

    case SESSION.SESSION_SET_USER: return {
      ...state, ready: true,
    };

    default: return state;
  }
};
