import { I18N } from '../actions'
import Api from '../services/Api'
import I18n from '../services/I18n'
import { AsyncStorage } from 'react-native'

export function fetchDictionary(dispatch, locale) {
  Api.get('/translations').then(
    response => dispatch(setDictionary(response.data.translations))
  );

  return { type: I18N.I18N_FETCH_DICTIONARY_STARTED, locale: locale }
}

export function setLocale(locale) {
  let newLocale = I18n.availableLocales.indexOf(locale) > -1 ? locale : 'en';
    AsyncStorage.setItem('locale', newLocale);
  return { type: I18N.I18N_SET_LOCALE, locale: newLocale }
}

export function setDictionary(dictionary) {
  return { type: I18N.I18N_SET_DICTIONARY, dictionary: dictionary }
}