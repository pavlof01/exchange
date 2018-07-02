import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import SplashScreen from './containers/SplashScreen'
import Offers from './containers/Offers/Index';
import Wallet from './containers/Wallet/Index';
import Trades from './containers/Trades/Index';
import Settings from './containers/Settings/Index';
import Login from './containers/Login/Index';
import SignUp from "./containers/SignUp/Index";
import RecoverPassword from "./containers/RecoverPassword/Index";
import {bottomBarStyle, createBottomBarOptions} from "./style/navigation";
import NewTrade from "./components/NewTrade";

const Main = createBottomTabNavigator({
    Offers: { screen: Offers, navigationOptions: createBottomBarOptions(require('./img/ic_offer.png')) },
    Wallet: { screen: Wallet, navigationOptions: createBottomBarOptions(require('./img/ic_wallet.png'))  },
    Trades: { screen: Trades, navigationOptions: createBottomBarOptions(require('./img/ic_trades.png'))  },
    Settings: { screen: Settings, navigationOptions: createBottomBarOptions(require('./img/ic_settings.png')) },
}, bottomBarStyle);

const AppNavigator = createStackNavigator({
        Main: { screen: Main, navigationOptions: () => ({ header: props => null }) },
        NewTrade: { screen: NewTrade },
        Login: { screen: Login },
        SignUp: { screen: SignUp },
        RecoverPassword: { screen: RecoverPassword },
        SplashScreen: { screen: SplashScreen },
    }
);

export default AppNavigator;
