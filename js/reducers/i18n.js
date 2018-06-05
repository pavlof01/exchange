import { I18N } from '../actions'
import { AsyncStorage } from 'react-native'

const initial = {
  locale: AsyncStorage.getItem('locale') || 'en',
  dictionary: {},
};

export default (state = initial, action) => {
  switch (action.type) {
    case I18N.I18N_SET_LOCALE: return {
      ...state, locale: action.locale
    };

    case I18N.I18N_SET_DICTIONARY: return {
      ...state, dictionary: action.dictionary
    };

    default: return state;
  }
};