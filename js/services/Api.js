import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { dispatch } from 'redux';
import { API_BASE_URL } from '../config.json';
import { logout } from '../actions/session';
import store from '../store';

export default class Api {
  static tokenName = 'nekotIpa';

  static getInstance = () => {
    if (!Api.instance) {
      Api.createApiWithToken(Api.currentToken);
    }
    return Api.instance;
  }

  static createApiWithToken(value) {
    Api.currentToken = value;
    Api.instance = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Basic ZXhjaGFuZ2U6MTIzNjU0',
        'X-Access-Token': value,
      },
    });

    Api.instance.interceptors.response.use(
      (response) => response,
      (onError) => {
        const request = onError.config;
        if (onError.response.status === 401) {
          return AsyncStorage.getItem(Api.tokenName)
            .then(token => {
              return axios.post(`${API_BASE_URL}/auths/renew_api_token`, { api_token: token })
            }).then((tokenResponse) => {
              const newToken = tokenResponse.data.api_token;
              return AsyncStorage.setItem(Api.tokenName, newToken)
                .then(() => {
                  axios.defaults.headers.common['X-Access-Token'] = newToken;
                  request.headers['X-Access-Token'] = newToken;
                  Api.currentToken = newToken;
                  Api.createApiWithToken(newToken);
                  return axios(request);
                });
            }).catch(() => {
              store.dispatch(logout());
              return Promise.reject(onError);
            });
        }
        return Promise.reject(onError);
      },
    );
  }

  static get(uri, params = {}) {
    return Api.getInstance().get(uri, { params });
  }

  static post(uri, params = {}) {
    return Api.getInstance().post(uri, params);
  }

  static patch(uri, params = {}) {
    return Api.getInstance().patch(uri, params);
  }

  static delete(uri) {
    return Api.getInstance().delete(uri);
  }
}
