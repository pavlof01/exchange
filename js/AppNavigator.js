import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import SplashScreen from './containers/SplashScreen';
import OffersScreen from './containers/Offers/Index';
import WalletScreen from './containers/Wallet/Index';
import TradesScreen from './containers/Trades/Index';
import SettingsScreen from './containers/Settings/Index';
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
import Pincode from './containers/Pincode/Index';
import SelectCountries from './containers/Settings/SelectCountries';
import SelectNativeCurrency from './containers/Settings/SelectNativeCurr';
import SelectLanguage from './containers/Settings/SelectLanguage';
import PincodeAutorization from './containers/PincodeAutorization';
import Transactions from './containers/Transactions';
import {
  bottomBarStyle,
  createBasicNavigationOptions,
  createBottomBarOptions,
} from './style/navigation';

const Main = createBottomTabNavigator({
  Offers: { screen: OffersScreen, navigationOptions: ({ navigation }) => (createBottomBarOptions(navigation, require('./img/ic_offer.png'))) },
  Wallet: { screen: WalletScreen, navigationOptions: ({ navigation }) => (createBottomBarOptions(navigation, require('./img/ic_wallet.png'))) },
  Trades: { screen: TradesScreen, navigationOptions: ({ navigation }) => (createBottomBarOptions(navigation, require('./img/ic_trades.png'))) },
  Settings: { screen: SettingsScreen, navigationOptions: ({ navigation }) => (createBottomBarOptions(navigation, require('./img/ic_settings.png'))) },
}, bottomBarStyle);

const AppNavigator = createStackNavigator({
  Main: { screen: Main, navigationOptions: () => ({ header: () => null }) },
  NewTrade: { screen: NewTrade, navigationOptions: () => ({ header: () => null }) },
  Trade: { screen: Trade },
  Feedback: { screen: Feedback },
  Profile: { screen: Profile },
  Login: { screen: Login, navigationOptions: () => ({ header: () => null }) },
  SignUp: { screen: SignUp, navigationOptions: () => ({ header: () => null }) },
  RecoverPassword: { screen: RecoverPassword },
  SplashScreen: { screen: SplashScreen },
  Ads: { screen: Ads },
  IdInfo: { screen: IdInfo },
  IdentityDocs: { screen: IdentityDocs },
  PhoneVerify: { screen: PhoneVerify },
  Pincode: { screen: Pincode, navigationOptions: () => ({ header: () => null }) },
  SelectCountries: { screen: SelectCountries },
  SelectNativeCurrency: { screen: SelectNativeCurrency },
  SelectLanguage: { screen: SelectLanguage },
  PincodeAutorization: { screen: PincodeAutorization },
  Transactions: { screen: Transactions, navigationOptions: () => ({ header: () => null }) },
});

export default AppNavigator;
