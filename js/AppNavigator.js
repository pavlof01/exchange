import React from 'react';
import { StackNavigator, createBottomTabNavigator } from 'react-navigation';

import Offers from './containers/Offers/Index';
import Wallet from './containers/Wallet/Index';
import Trades from './containers/Trades/Index';
import Settings from './containers/Settings/Index';
import Login from './containers/Login/Index';
import SignUp from "./containers/SignUp/Index";
import RecoverPassword from "./containers/RecoverPassword/Index";

const Main = createBottomTabNavigator({
    Offers: { screen: Offers },
    Wallet: { screen: Wallet },
    Trades: { screen: Trades },
    Settings: { screen: Settings },
});

const AppNavigator = StackNavigator({
        Main: { screen: Main, navigationOptions: () => ({
                header: props => null,
            }), },
        Login: { screen: Login },
        SignUp: { screen: SignUp },
        RecoverPassword: { screen: RecoverPassword },

    }
);

export default AppNavigator;
