import React from 'react';
import { StackNavigator } from 'react-navigation';

import Home from './containers/Home/Index';
import Login from './containers/Login/Index';

const AppNavigator = StackNavigator({
        Home: { screen: Home },
        Login: { screen: Login },
    }
);

export default AppNavigator;
