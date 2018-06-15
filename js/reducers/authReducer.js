import { Record } from 'immutable';
import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_SET_USER,
    LOGOUT_SUCCESS,
} from '../actions/authActions';
import LogoutUser from '../models/User/Logout'

const Form = Record({
  error: null,
  isFetching: false,
  fields: new (Record({
    username: '',
    password: '',
    showPassword: false,
  }))(),
});

const InitialState = Record({
  form: new Form(),
  user: new LogoutUser({}),
});

const initialState = new InitialState();

export default function authReducer(state = initialState, action) {
  switch (action.type) {

    case LOGIN: {
      return state
        .setIn(['form', 'isFetching'], true)
        .setIn(['form', 'error'], null);
    }

    case LOGIN_SUCCESS: {
      return state.setIn(['form', 'isFetching'], false);
    }

    case LOGIN_FAILURE: {
      return state
        .setIn(['form', 'isFetching'], false)
        .setIn(['form', 'error'], action.payload.error);
    }

    case LOGIN_SET_USER: {
      return state
       .setIn(['user'], action.user);
    }

    case LOGOUT_SUCCESS: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}
