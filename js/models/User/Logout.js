import { AsyncStorage } from 'react-native';
import User from '../User';

export default class LogoutUser extends User {
  /* eslint-disable class-methods-use-this */
  get isLogged() {
    return false;
  }

  get currencyCode() {
    return AsyncStorage.getItem('currencyCode');
  }

  get countryCode() {
    return AsyncStorage.getItem('countryCode');
  }

  get placeId() {
    return AsyncStorage.getItem('placeId');
  }
  /* eslint-enable class-methods-use-this */
}
