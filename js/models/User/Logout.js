import User from "../User";
import { AsyncStorage } from 'react-native'

export default class LogoutUser extends User {
  get isLogged() {
    return false;
  }

  get currencyCode() {
    return AsyncStorage.getItem('currencyCode')
  }

  get countryCode() {
    return AsyncStorage.getItem('countryCode')
  }

  get placeId() {
    return AsyncStorage.getItem('placeId')
  }
}
