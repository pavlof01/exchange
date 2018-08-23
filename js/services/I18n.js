import store from '../store'
import { objEach } from '../helpers'

export default class I18n {
  static availableLocales = ['en', 'ru'];

  static translate(locale, dictionary, key, params = {}) {
    let dictionaryItem = dictionary[key];
    // if (!dictionaryItem) return 'translation missing: ' + key;
    if (!dictionaryItem) return;
    let sentence = dictionaryItem[locale] || dictionaryItem['en'];
    objEach(params, (key, value) => sentence = sentence.replace(`%{${key}}`, value));
    return sentence;
  }

  static t(key, params) {
    return I18n.translate(
      store.getState().i18n.locale,
      store.getState().i18n.dictionary,
      key,
      params,
    );
  }
}
