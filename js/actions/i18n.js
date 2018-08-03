import { AsyncStorage } from 'react-native';
import { I18N } from '../actions';
import Api from '../services/Api';
import {
  appLocales,
  DEFAULT_LOCALE,
} from '../utils/i18n';

export function fetchDictionary(dispatch, locale) {
  Api.get('/translations').then(
    response => dispatch(setDictionary(response.data.translations)),
  );

  return { type: I18N.I18N_FETCH_DICTIONARY_STARTED, locale };
}

export function setLocale(locale) {
  const newLocale = appLocales.indexOf(locale) > -1 ? locale : DEFAULT_LOCALE;
  return { type: I18N.I18N_SET_LOCALE, locale: newLocale };
}

export function setDictionary(dictionary) {
  return { type: I18N.I18N_SET_DICTIONARY, dictionary };
}
