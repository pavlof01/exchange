import React from 'react';
import { StackNavigator } from 'react-navigation';

import Home from './containers/Home/Index';
import Login from './containers/Login/Index';
import SignUp from "./containers/SignUp/Index";
import RecoverPassword from "./containers/RecoverPassword/Index";

const AppNavigator = StackNavigator({
        Home: { screen: Home },
        Login: { screen: Login },
        SignUp: { screen: SignUp },
        RecoverPassword: { screen: RecoverPassword },

    }
);

export default AppNavigator;
