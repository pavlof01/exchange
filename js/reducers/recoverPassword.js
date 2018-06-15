import { Record } from 'immutable';
import {
    RECOVER_PASSWORD_SUCCESS,
    RECOVER_PASSWORD_ERROR,
    RECOVER_PASSWORD_REQUEST
} from '../actions/recoverPassword';

const Form = Record({
  error: null,
  isFetching: false,
  isSent: false,
  fields: new (Record({
    email: '',
  }))(),
});

const InitialState = Record({
  form: new Form(),
});

const initialState = new InitialState();

export default function recoverPassword(state = initialState, action) {
  switch (action.type) {

    case RECOVER_PASSWORD_SUCCESS: {
      return state
        .setIn(['form', 'isSent'], true);
    }
    case RECOVER_PASSWORD_ERROR: {
      return state
        .setIn(['form', 'isSent'], false)
        .setIn(['form', 'error'], action.payload.error);
    }
    case RECOVER_PASSWORD_REQUEST: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
