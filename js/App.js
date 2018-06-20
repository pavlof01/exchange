import React, { Component } from 'react';

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