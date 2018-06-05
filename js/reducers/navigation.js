import { NavigationActions } from 'react-navigation';
import AppNavigator from '../AppNavigator';
/*import {
  SKIP_AUTH,
  RESET_TO_HOME, SHOW_ORDERS,
} from '../../actions/navigation';
import {
  IS_USER_ACCEPT_TUTORIAL_SUCCESS,
} from '../../actions/authorization';
import { ORDER_PRODUCT_SUCCESS } from '../../actions/product';
import {
  ORDER_CART_ITEMS_SUCCESS,
  PAYMENT_SUCCESS,
  PAYMENT_ERROR,
} from '../../actions/cart';*/

const firstAction = AppNavigator.router.getActionForPathAndParams('Splash');
const initialState = AppNavigator.router.getStateForAction(firstAction);

export default function navigationReducer(state = initialState, action) {
  let nextState;
  switch (action.type) {

   /* case IS_USER_ACCEPT_TUTORIAL_SUCCESS:
      const authSceneKey = (action.payload.isUserLogin) ? 'Home' : 'Authorization';
      const nextSceneKey = (action.payload.isAcceptTutorial) ? authSceneKey : 'Tutorial';
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: nextSceneKey }),
          ],
        }),
        state
      );
      break;

    case SKIP_AUTH:
    case RESET_TO_HOME:
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Home' }),
          ],
        }),
        state
      );
      break;

    case SHOW_ORDERS:
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.reset({
          index: 1,
          actions: [
            NavigationActions.navigate({ routeName: 'Home' }),
            NavigationActions.navigate({ routeName: 'Order' }),
          ],
        }),
        state
      );
      break;

    case ORDER_PRODUCT_SUCCESS:
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'OrderSuccess' }),
        state
      );
      break;

    case ORDER_CART_ITEMS_SUCCESS:
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'PaymentWebView' }),
        state
      );
      break;

    case PAYMENT_SUCCESS:
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'OrderSuccess' }),
        state
      );
      break;

    case PAYMENT_ERROR:
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Cart' }),
        state
      );
      break;
*/
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}
