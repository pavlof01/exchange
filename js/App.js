import React, { Component } from 'react';
import { AsyncStorage, Platform, BackHandler } from 'react-native';
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
import Api from "./services/Api";
import {signUpRequest} from "./actions/signUp";
import { setPushToken } from './actions/pushNotifications';

export const navMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav,
);
const addListener = createReduxBoundAddListener('root');
const navigationPropConstructor = createNavigationPropConstructor('root');


class App extends Component {
  constructor(props) {
    super(props);
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
    initializeListeners('root', this.props.nav);
    const { dispatch, nav } = this.props;
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
      Api.post('/one_signal_players', { token: userId });
    });
  }

    onReceived = (notification) => {
      console.warn('Notification received: ', notification);
    };

    onOpened = (openResult) => {
      console.log('Message: ', openResult.notification.payload.body);
      console.log('Data: ', openResult.notification.payload.additionalData);
      console.log('isActive: ', openResult.notification.isAppInFocus);
      console.log('openResult: ', openResult);
    };

    onIds = (device) => {
      console.warn(JSON.stringify(device, null, 2));
    };

    render() {
      const navigation = navigationPropConstructor(
        this.props.dispatch,
        this.props.nav,
        addListener,
      );
      return (
        <AppNavigator
          navigation={navigation}
        />
      );
    }
}

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(App);
