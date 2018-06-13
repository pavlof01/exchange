import { Record } from 'immutable';
import {
    SIGN_UP,
    SIGN_UP_SUCCESS,
    SIGN_UP_ERROR,
} from '../actions/signUp';
import LogoutUser from '../models/User/Logout'

const Form = Record({
  error: null,
  isFetching: false,
  isSuccess: false,
  state: SIGN_UP,
  fields: new (Record({
    username: '',
    email: '',
    password: '',
    passwordRepeat: '',
    showPassword: false,
  }))(),
});

const InitialState = Record({
  form: new Form(),
  user: new LogoutUser({}),
});

const initialState = new InitialState();

export default function signUp(state = initialState, action) {
  switch (action.type) {

    case SIGN_UP: {
      return state
        .setIn(['form', 'isFetching'], true)
        .setIn(['form', 'isSuccess'], false)
        .setIn(['form', 'error'], null);
    }

    case SIGN_UP_SUCCESS: {
      return state.setIn(['form', 'isFetching'], false)
          .setIn(['form', 'isSuccess'], true);
    }

    case SIGN_UP_ERROR: {
      return state
        .setIn(['form', 'isFetching'], false)
        .setIn(['form', 'isSuccess'], false)
        .setIn(['form', 'error'], action.payload.error);
    }

    default: {
      return state;
    }
  }
}
