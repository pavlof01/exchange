import {
  Platform,
  NativeModules,
} from 'react-native';
import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import ru from 'react-intl/locale-data/ru';

import enTranslationMessages from '../translations/en.json';
import ruTranslationMessages from '../translations/ru.json';

addLocaleData(en);
addLocaleData(ru);

export const appLocales = [
  'en',
  'ru',
];

export const getLocaleDisplayName = (locale) => {
  switch (locale) {
    case 'en':
      return 'English';
    case 'ru':
      return 'Русский';
    default:
      return '';
  }
};

export const DEFAULT_LOCALE = appLocales[0];

const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages = locale !== DEFAULT_LOCALE
    ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages)
    : {};
  const flattenFormattedMessages = (formattedMessages, key) => {
    const formattedMessage = !messages[key] && locale !== DEFAULT_LOCALE
      ? defaultFormattedMessages[key]
      : messages[key];
    return Object.assign(formattedMessages, { [key]: formattedMessage });
  };
  return Object.keys(messages).reduce(flattenFormattedMessages, {});
};

export const translationMessages = {
  en: formatTranslationMessages('en', enTranslationMessages),
  ru: formatTranslationMessages('ru', ruTranslationMessages),
};

/**
 * Возвращает текущую локализацию девайса.
 * @return {string} - текущая локализация девайса. Например - 'ru'.
 */
export function getSystemLanguageCode() {
  let systemLanguage = 'en';
  try {
    systemLanguage = (Platform.OS === 'android')
      ? NativeModules.I18nManager.localeIdentifier
      : NativeModules.SettingsManager.settings.AppleLocale;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn(`getSystemLanguageCode() - ${e}.\nReturn default 'en' language`);
  }
  return systemLanguage.substring(0, 2);
}

/**
 * Возвращает текущую поддерживаемую локализацию девайса.
 * @return {string} - текущая поддерживаемая локализация девайса. Например - 'ru'.
 */
export function getAvailableSystemLanguageCode() {
  const systemLanguage = getSystemLanguageCode();
  if (appLocales.indexOf(systemLanguage) === -1) {
    return DEFAULT_LOCALE;
  }
  return systemLanguage;
}
