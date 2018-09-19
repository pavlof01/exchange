import React, { Component } from 'react';
import { Platform, BackHandler } from 'react-native';
import { NavigationActions } from 'react-navigation';
import OneSignal from 'react-native-onesignal';
import { connect } from 'react-redux';
import {
  createReduxBoundAddListener,
  createNavigationPropConstructor,
  initializeListeners,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import AppNavigator from './AppNavigator';
import { ONE_SIGNAL_APP_ID } from './config.json';
import Api from './services/Api';
import { setPushToken } from './actions/pushNotifications';
import { setTradeIdForRedirect } from './actions/app';
import { translationMessages } from './utils/i18n';
import LanguageProvider from './containers/LanguageProvider';

export const navMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav,
);
const addListener = createReduxBoundAddListener('root');
const navigationPropConstructor = createNavigationPropConstructor('root');


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    OneSignal.init(ONE_SIGNAL_APP_ID);

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  componentDidMount() {
    const { dispatch, nav } = this.props;
    initializeListeners('root', nav);
    if (Platform.OS === 'android') {
      this.backButtonListener = BackHandler.addEventListener('hardwareBackPress', () => {
        if (nav.routes.length === 1 && (nav.routes[0].routeName === 'Main'
          || nav.routes[0].routeName === 'Home')) {
          return false;
        }
        dispatch(NavigationActions.back());
        return true;
      });
    }

    // Check push notification and OneSignal subscription statuses
    OneSignal.getPermissionSubscriptionState((status) => {
      const { userId } = status;
      dispatch(setPushToken(userId));
      if (Api.instance) {
        Api.post('/one_signal_players', { token: userId });
      }
    });
  }

  onReceived = (notification) => {
    console.warn('Notification received: ', notification);
  };

  onOpened = (openResult) => {
    const { dispatch } = this.props;
    if (openResult.notification.isAppInFocus) {
      console.warn('Notification onOpened: ', JSON.stringify(openResult, null, 2));
    } else {
      const { type } = openResult.notification.payload.additionalData;
      console.warn('Notification onOpened: ', JSON.stringify(openResult, null, 2));
      if (type === 'Notification::NotReadTradeMessage') {
        const tradeId = 5436; // openResult.notification.payload.additionalData.trade_id;
        dispatch(setTradeIdForRedirect(tradeId));
      }
    }
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  };

  onIds = (device) => {
    console.warn(JSON.stringify(device, null, 2));
  };

  render() {
    const { dispatch, nav } = this.props;
    const navigation = navigationPropConstructor(
      dispatch,
      nav,
      addListener,
    );
    return (
      <LanguageProvider messages={translationMessages}>
        <AppNavigator
          navigation={navigation}
        />
      </LanguageProvider>
    );
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(App);
