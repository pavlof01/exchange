import { AsyncStorage } from 'react-native';
import { I18N } from '../actions';
import Api from '../services/Api';
import I18n from '../services/I18n';

export function fetchDictionary(dispatch, locale) {
  Api.get('/translations').then(
    response => dispatch(setDictionary(response.data.translations)),
  );

  return { type: I18N.I18N_FETCH_DICTIONARY_STARTED, locale };
}

export function setLocale(locale) {
  // const newLocale = I18n.availableLocales.indexOf(locale) > -1 ? locale : 'en';
  // AsyncStorage.setItem('locale', locale);
  return { type: I18N.I18N_SET_LOCALE, locale };
}

export function setDictionary(dictionary) {
  return { type: I18N.I18N_SET_DICTIONARY, dictionary };
}
