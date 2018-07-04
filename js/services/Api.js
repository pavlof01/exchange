import axios from 'axios'
import { API_BASE_URL } from '../config.json';

export default class Api {
  static tokenName = 'nekotIpa';

  static createApiWithToken(value) {
    Api.currentToken = value;
    Api.instance = axios.create({
        baseURL: API_BASE_URL,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Basic ZXhjaGFuZ2U6MTIzNjU0',
            'X-Access-Token': value,
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
