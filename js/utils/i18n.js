import {
  Platform,
  NativeModules,
} from 'react-native';
import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import ru from 'react-intl/locale-data/ru';

addLocaleData(en);
addLocaleData(ru);

export const appLocales = [
  'en',
  'ru',
];

const DEFAULT_LOCALE = appLocales[0];

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
