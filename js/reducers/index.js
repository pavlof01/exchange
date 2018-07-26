import { combineReducers } from 'redux'
import app from './app'
import session from './session'
import profile from './profile'
import home from './home'
import homeFilter from './homeFilter'
import exchangeRates from './exchangeRates'
import currencies from './currencies'
import cryptoCurrencies from './cryptoCurrencies'
import paymentMethods from './paymentMethods'
import countries from './countries'
import ordersFilter from './ordersFilter'
import orders from './orders'
import mainSocket from './mainSocket'
import i18n from './i18n'
import currentTrade from './currentTrade'
import partnerActivity from './partnerActivity'
import groupedPaymentMethods from './groupedPaymentMethods'
import paymentMethodBanks from './paymentMethodBanks'
import navigation from './navigation';
import signUp from './signUp';
import recoverPassword from './recoverPassword';

export default combineReducers({
  nav: navigation,
  signUp,
  recoverPassword,
  app,
  session,
  profile,
  home,
  homeFilter,
  exchangeRates,
  currencies,
  cryptoCurrencies,
  paymentMethods,
  countries,
  ordersFilter,
  orders,
  mainSocket,
  i18n,
  currentTrade,
  partnerActivity,
  groupedPaymentMethods,
  paymentMethodBanks,
});
