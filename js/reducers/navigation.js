import { NavigationActions } from 'react-navigation';
import AppNavigator from '../AppNavigator';

import {
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    LOGIN_REQUEST,
} from '../actions/login';
import {
    SIGN_UP_REQUEST,
} from '../actions/signUp';
import {
    RECOVER_PASSWORD_SUCCESS,
    RECOVER_PASSWORD_REQUEST,
} from '../actions/recoverPassword';
const firstAction = AppNavigator.router.getActionForPathAndParams('Login');
const initialState = AppNavigator.router.getStateForAction(firstAction);

export default function navigationReducer(state = initialState, action) {
  let nextState;
  switch (action.type) {

    case LOGIN_SUCCESS:
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Home' }),
        state
      );
      break;
      case LOGIN_REQUEST:
      case LOGOUT_SUCCESS:
        nextState = AppNavigator.router.getStateForAction(
          NavigationActions.navigate({ routeName: 'Login' }),
          state
        );
        break;
      case SIGN_UP_REQUEST:
          nextState = AppNavigator.router.getStateForAction(
              NavigationActions.navigate({ routeName: 'SignUp' }),
              state
          );
          break;
      case RECOVER_PASSWORD_REQUEST:
          nextState = AppNavigator.router.getStateForAction(
              NavigationActions.navigate({ routeName: 'RecoverPassword' }),
              state
          );
          break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }
  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}
