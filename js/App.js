import React, { Component } from 'react';

import { Platform, BackHandler } from 'react-native';
import AppNavigator from './AppNavigator';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    nav: state.nav,
});

class App extends Component {

    constructor(props) {
        super(props);
        this.backButtonListener = null;
    }

    componentDidMount() {
        const { dispatch, nav } = this.props;
        if (Platform.OS === 'android') {
            this.backButtonListener = BackHandler.addEventListener('hardwareBackPress', () => {
                if (nav.routes.length === 1 && (nav.routes[0].routes[0].routeName === 'Authorization' ||
                    nav.routes[0].routes[0].routeName === 'Home')) {
                    return false;
                }
                dispatch(NavigationActions.back());
                return true;
            });
        }
    }

    componentWillUnmount() {
        this.backButtonListener.remove();
    }


    render() {
    return (
        <AppNavigator/>
    );
  }
}

export default connect(mapStateToProps)(App);
