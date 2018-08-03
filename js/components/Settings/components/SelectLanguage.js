import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  AsyncStorage,
} from 'react-native';
import { FormattedMessage } from 'react-intl';
import { fonts } from '../../../style/resourceHelpers';
import Touchable from '../../../style/Touchable';
import {
  getLocaleDisplayName,
} from '../../../utils/i18n';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flex: 1,
  },
  settingContainer: {
    paddingBottom: 20,
    paddingTop: 20,
    paddingStart: 17,
    paddingEnd: 17,
    borderBottomWidth: 1,
    borderBottomColor: '#d5d5d5',
    flexDirection: 'row',
  },
  settingName: {
    color: '#111111',
    height: 20,
    fontSize: 18,
    lineHeight: 20,
    fontFamily: fonts.medium.regular,
    letterSpacing: 0.2,
  },
  settingNameActive: {
    color: '#000000',
    height: 20,
    fontSize: 18,
    lineHeight: 20,
    fontFamily: fonts.bold.regular,
    letterSpacing: 0.2,
  },
  headerButtonContainer: {
    padding: 10,
  },
  headerButton: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});

class SelectLanguage extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: (
      <FormattedMessage id="app.settings.title.selectLanguage" />
    ),
    headerRight: (
      <Touchable
        onPress={() => {
          const handleSave = navigation.getParam('handleSave');
          if (typeof handleSave === 'function') {
            handleSave.call();
          }
        }}
      >
        <View style={styles.headerButtonContainer}>
          <FormattedMessage id="app.settings.button.select">
            {text => (
              <Text style={styles.headerButton}>
                {text}
              </Text>
            )}
          </FormattedMessage>
        </View>
      </Touchable>
    ),
    headerStyle: { backgroundColor: '#2B2B82' },
    headerTitleStyle: { color: 'white' },
    headerTintColor: 'white',
  });

  constructor(props) {
    super(props);
    this.state = {
      selectedLocale: props.selectedLocale,
    };
  }

  componentDidMount() {
    const {
      navigation,
    } = this.props;
    navigation.setParams({
      handleSave: this.updateLang,
      title: 'Boba',
    });
    this._navListener = navigation.addListener('didFocus', () => {
      navigation.setParams({ title: 'Set' });
    });
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  languageKeyExtractor = lang => lang;

  selectLang = (value) => {
    this.setState({ selectedLocale: value });
  };

  updateLang = () => {
    const {
      setLocale,
      navigation,
    } = this.props;
    const {
      selectedLocale,
    } = this.state;
    if (selectedLocale) {
      setLocale(selectedLocale);
      AsyncStorage.setItem('locale', selectedLocale);
      navigation.goBack();
    }
  };

  renderLanguageItem = (lang) => {
    const {
      selectedLocale,
    } = this.state;
    const active = selectedLocale === lang.item;
    return (
      <Touchable onPress={() => this.selectLang(lang.item)}>
        <View style={styles.settingContainer}>
          <Text style={active ? styles.settingNameActive : styles.settingName}>
            {getLocaleDisplayName(lang.item)}
          </Text>
        </View>
      </Touchable>
    );
  };

  render() {
    const {
      locales,
    } = this.props;
    const {
      selectedLocale,
    } = this.state;
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.scrollContainer}>
          <FlatList
            data={locales}
            extraData={selectedLocale}
            keyExtractor={this.languageKeyExtractor}
            renderItem={this.renderLanguageItem}
          />
        </ScrollView>
      </View>
    );
  }
}

SelectLanguage.propTypes = {
  navigation: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  setLocale: PropTypes.func.isRequired,
  locales: PropTypes.arrayOf(PropTypes.string),
  selectedLocale: PropTypes.string,
};

export default SelectLanguage;
