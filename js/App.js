import React, { Component } from 'react';
import { Platform, BackHandler } from 'react-native';
import {  NavigationActions } from 'react-navigation';

import AppNavigator from './AppNavigator';
import { connect } from 'react-redux';
import {
    createReduxBoundAddListener,
    createNavigationPropConstructor,
    initializeListeners, createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';

export const navMiddleware = createReactNavigationReduxMiddleware(
    "root",
    state => state.nav,
);
const addListener = createReduxBoundAddListener("root");
const navigationPropConstructor = createNavigationPropConstructor("root");


class App extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        initializeListeners("root", this.props.nav);
        const { dispatch, nav } = this.props;
        if (Platform.OS === 'android') {
            this.backButtonListener = BackHandler.addEventListener('hardwareBackPress', () => {
                if (nav.routes.length === 1 && (nav.routes[0].routeName === 'Main' ||
                    nav.routes[0].routeName === 'Home')) {
                    return false;
                }
                dispatch(NavigationActions.back());
                return true;
            });
        }
    }

    render() {
        const navigation = navigationPropConstructor(
            this.props.dispatch,
            this.props.nav,
            addListener
        );
    return (
        <AppNavigator
            navigation={navigation}
        />
    );
  }
}

const mapStateToProps = (state) => ({
    nav: state.nav,
});

export default connect(mapStateToProps)(App);