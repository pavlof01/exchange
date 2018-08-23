import store from '../store';
import { objEach } from '../helpers';

export default class I18n {
  static availableLocales = ['en', 'ru'];

  static translate(locale, dictionary, key, params = {}) {
    const dictionaryItem = dictionary[key];
    // if (!dictionaryItem) return 'translation missing: ' + key;
    if (!dictionaryItem) return;
    let sentence = dictionaryItem[locale] || dictionaryItem.en;
    objEach(params, (objKey, value) => { sentence = sentence.replace(`%{${objKey}}`, value); });
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
