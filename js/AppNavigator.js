import React from 'react';
import { StackNavigator } from 'react-navigation';

import Home from './containers/Home/Index';

const AppNavigator = StackNavigator({
        Home: { screen: Home },
    },
    {
        initialRouteName: 'Home',
    }
);

export default AppNavigator;
