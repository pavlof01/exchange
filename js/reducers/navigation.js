import { NavigationActions } from 'react-navigation';
import AppNavigator from '../AppNavigator';

import {
    SIGN_UP_REQUEST,
} from '../actions/signUp';
import {
    RECOVER_PASSWORD_SUCCESS,
    RECOVER_PASSWORD_REQUEST,
} from '../actions/recoverPassword';
import {SESSION} from "../actions";
import {NEW_TRADE_REQUEST} from "../actions/navigation";
const firstAction = AppNavigator.router.getActionForPathAndParams('SplashScreen');
const initialState = AppNavigator.router.getStateForAction(firstAction);

export default function navigationReducer(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case SESSION.LOGIN_SUCCESS:
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Main' }),
        state
      );
      break;
      case SESSION.LOGIN_REQUEST:
      case SESSION.LOGOUT_SUCCESS:
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
      case NEW_TRADE_REQUEST:
          nextState = AppNavigator.router.getStateForAction(
              NavigationActions.navigate({ routeName: 'NewTrade', params: {ad: action.ad }}),
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
