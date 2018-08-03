// import { AsyncStorage } from 'react-native'; AsyncStorage.getItem('locale')
import { I18N } from '../actions';
import {
  getAvailableSystemLanguageCode,
} from '../utils/i18n';

const initial = {
  locale: getAvailableSystemLanguageCode(),
  dictionary: {},
};

export default (state = initial, action) => {
  switch (action.type) {
    case I18N.I18N_SET_LOCALE: return {
      ...state, locale: action.locale,
    };

    case I18N.I18N_SET_DICTIONARY: return {
      ...state, dictionary: action.dictionary,
    };

    default: return state;
  }
};
