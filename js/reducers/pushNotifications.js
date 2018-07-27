import { Record } from 'immutable';
import { NOTIFICATION_SET_PUSH_TOKEN } from '../actions/pushNotifications';

const InitialState = Record({
  pushToken: '',
});

const initialState = new InitialState();

export default (state = initialState, action) => {
  switch (action.type) {
    case NOTIFICATION_SET_PUSH_TOKEN:
      return state.set('pushToken', action.payload);
    default:
      return state;
  }
};
