import { AsyncStorage } from 'react-native'

export default class User {
  constructor(object) {
    for (let key in object) {
      if (object.hasOwnProperty(key)) {
        this[key] = object[key];
      }
    }
  }

  static setCurrencyCode(code) {
      AsyncStorage.setItem('currencyCode', code)
  }

  static setFavoriteCurrencyCode(code) {
      AsyncStorage.setItem('favoriteCurrencyCode', code)
  }

  static getFavoriteCurrencyCode(code) {
    return AsyncStorage.getItem('favoriteCurrencyCode')
  }

  static setCountryCode(code) {
      AsyncStorage.setItem('countryCode', code)
  }

  static setFavoriteCountryCode(code) {
      AsyncStorage.setItem('favoriteCountryCode', code)
  }

  static getFavoriteCountryCode(code) {
    return AsyncStorage.getItem('favoriteCountryCode')
  }

  static setPlaceId(id) {
      AsyncStorage.setItem('placeId', id)
  }

  static approximateTradesCount(count) {
    if (count > 1000) {
      return count - count % 100 + '+';
    } else if (count > 100) {
      return count - count % 50 + '+';
    } else if (count > 10) {
      return count - count % 10 + '+';
    } else {
      return count;
    }
  }

  static approximateTradingAmount(amount) {
    if (amount > 250) {
      return '250+';
    } else if (amount > 100) {
      return '100-250';
    } else if (amount > 50) {
      return '50-100';
    } else if (amount > 20) {
      return '20-50';
    } else if (amount > 5) {
      return '5-20';
    } else if (amount > 2) {
      return '2-5';
    } else if (amount > 1) {
      return '1-2';
    } else if (amount > 0.5) {
      return '0.5-1';
    } else if (amount > 0.25) {
      return '0.25-0.5';
    } else {
      return '0-0.25';
    }
  }
}
