import { NavigationActions, StackActions } from 'react-navigation';
import AppNavigator from '../AppNavigator';

import {
  SIGN_UP_REQUEST,
} from '../actions/signUp';
import {
  RECOVER_PASSWORD_REQUEST,
} from '../actions/recoverPassword';
import { SESSION } from '../actions';
import {
  RESET_NAVIGATION,
  NEW_TRADE_REQUEST,
  OPEN_FEEDBACK_REQUEST,
  OPEN_PROFILE_REQUEST,
  OPEN_TRADE_REQUEST,
  OPEN_ADS,
  IDINFO,
  PHONE_VERIFY,
  IDENTITY_DOCS,
  PINCODE,
  SELECT_COUNTRIES,
  SELECT_NATIVE_CURRENCY,
  SELECT_LANGUAGE,
  OPEN_PINCODE_AUTORIZATION,
  OPEN_TRANSACTIONS,
} from '../actions/navigation';

const firstAction = AppNavigator.router.getActionForPathAndParams('SplashScreen');
const initialState = AppNavigator.router.getStateForAction(firstAction);

export default function navigationReducer(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case RESET_NAVIGATION: {
      const resetToMain = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Main' }),
        ],
      });
      nextState = AppNavigator.router.getStateForAction(resetToMain, state);
      break;
    }
    case SESSION.LOGIN_SUCCESS:
      nextState = AppNavigator.router.getStateForAction(
        StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Main' }),
          ],
        }),
        state,
      );
      break;
    case SESSION.LOGIN_REQUEST:
    case SESSION.LOGOUT_SUCCESS:
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Login' }),
        state,
      );
      break;
    case SIGN_UP_REQUEST:
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'SignUp' }),
        state,
      );
      break;
    case RECOVER_PASSWORD_REQUEST:
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'RecoverPassword' }),
        state,
      );
      break;
    case NEW_TRADE_REQUEST:
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'NewTrade', params: { ad: action.ad } }),
        state,
      );
      break;
    case OPEN_TRADE_REQUEST: {
      const resetAction = StackActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({
            routeName: 'Main',
            action: NavigationActions.navigate({ routeName: 'Trades' }),
          }),
          NavigationActions.navigate({ routeName: 'Trade' }),
        ],
      });
      nextState = AppNavigator.router.getStateForAction(resetAction, state);
      break;
    }
    case OPEN_PROFILE_REQUEST:
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Profile', params: { profile: action.profile } }),
        state,
      );
      break;
    case OPEN_FEEDBACK_REQUEST:
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Feedback', params: { user_name: action.user_name } }),
        state,
      );
      break;
    case OPEN_ADS:
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Ads' }),
        state,
      );
      break;
    case IDINFO:
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'IdInfo' }),
        state,
      );
      break;
    case IDENTITY_DOCS:
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'IdentityDocs' }),
        state,
      );
      break;
    case PHONE_VERIFY:
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'PhoneVerify' }),
        state,
      );
      break;
    case PINCODE:
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Pincode' }),
        state,
      );
      break;
    case SELECT_COUNTRIES:
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'SelectCountries' }),
        state,
      );
      break;
    case SELECT_NATIVE_CURRENCY:
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'SelectNativeCurrency' }),
        state,
      );
      break;
    case SELECT_LANGUAGE:
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'SelectLanguage' }),
        state,
      );
      break;
    case OPEN_PINCODE_AUTORIZATION:
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'PincodeAutorization' }),
        state,
      );
      break;
    case OPEN_TRANSACTIONS:
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Transactions' }),
        state,
      );
      break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }
  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}
