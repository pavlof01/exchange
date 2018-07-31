import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import SplashScreen from './containers/SplashScreen';
import Offers from './containers/Offers/Index';
import Wallet from './containers/Wallet/Index';
import Trades from './containers/Trades/Index';
import Settings from './containers/Settings/Index';
import Login from './containers/Login/Index';
import SignUp from './containers/SignUp/Index';
import RecoverPassword from './containers/RecoverPassword/Index';
import NewTrade from './containers/NewTrade/Index';
import Trade from './containers/Trade/Index';
import Profile from './containers/UserProfile/Index';
import Feedback from './containers/Feedback/Index';
import Ads from './containers/Ads/Index';
import IdInfo from './components/Settings/components/IdInfo';
import IdentityDocs from './components/Settings/components/IdentityDoc';
import PhoneVerify from './components/Settings/components/PhoneVerify';
import Pincode from './containers/Pincode/Index/';

import { bottomBarStyle, createBottomBarOptions } from './style/navigation';

const Main = createBottomTabNavigator({
  Offers: { screen: Offers, navigationOptions: createBottomBarOptions('app.navigation.bottomLabel.Offers', require('./img/ic_offer.png')) },
  Wallet: { screen: Wallet, navigationOptions: createBottomBarOptions('app.navigation.bottomLabel.Wallet', require('./img/ic_wallet.png')) },
  Trades: { screen: Trades, navigationOptions: createBottomBarOptions('app.navigation.bottomLabel.Trades', require('./img/ic_trades.png')) },
  Settings: { screen: Settings, navigationOptions: createBottomBarOptions('app.navigation.bottomLabel.Settings', require('./img/ic_settings.png')) },
}, bottomBarStyle);

const AppNavigator = createStackNavigator({
  Main: { screen: Main, navigationOptions: () => ({ header: props => null }) },
  NewTrade: { screen: NewTrade },
  Trade: { screen: Trade },
  Feedback: { screen: Feedback },
  Profile: { screen: Profile },
  Login: { screen: Login },
  SignUp: { screen: SignUp },
  RecoverPassword: { screen: RecoverPassword },
  SplashScreen: { screen: SplashScreen },
  Ads: { screen: Ads },
  IdInfo: { screen: IdInfo },
  IdentityDocs: { screen: IdentityDocs },
  PhoneVerify: { screen: PhoneVerify },
  Pincode: { screen: Pincode },
},
);

export default AppNavigator;
