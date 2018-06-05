import axios from 'axios'
import { API_BASE_URL } from '../config.json';
import { AsyncStorage } from 'react-native'

export default class Api {
  static tokenName = 'nekotIpa';

  static get instance() {
    return axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Access-Token': AsyncStorage.getItem(Api.tokenName)
      }
    });
  }

  static get(uri, params = {}) {
    return Api.instance.get(uri, {params: params});
  }

  static post(uri, params = {}) {
    return Api.instance.post(uri, params);
  }

  static patch(uri, params = {}) {
    return Api.instance.patch(uri, params);
  }

  static delete(uri) {
    return Api.instance.delete(uri);
  }
}
