import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  AsyncStorage,
  Button,
} from 'react-native';
import { fonts } from '../../../style/resourceHelpers';
import Touchable from '../../../style/Touchable';
import {
  getLocaleDisplayName,
} from '../../../utils/i18n';

const styles = StyleSheet.create({
  active: {
    backgroundColor: '#7F63A5',
    paddingBottom: 20,
    paddingTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#d5d5d5',
    flexDirection: 'row',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingLeft: 25,
    paddingRight: 25,
    flex: 1,
  },
  currencyContainer: {
    paddingBottom: 20,
    paddingTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#d5d5d5',
    flexDirection: 'row',
  },
  currencyName: {
    height: 18,
    fontSize: 18,
    fontFamily: fonts.regular.regular,
    letterSpacing: 0.2,
  },
});

class SelectLanguage extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'SELECT CURRENCY',
    headerRight: (
      <Button
        onPress={navigation.getParam('selectLang')}
        title="Select"
        color="#fff"
      />
    ),
    headerStyle: { backgroundColor: '#2B2B82' },
    headerTitleStyle: { color: 'white' },
    headerTintColor: 'white',
  });

  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: '',
      languages: [{ name: 'Русский' }, { name: 'English' }],
    };
  }

  componentDidMount() {
    AsyncStorage.setItem('locale', 'en');
    this.props.navigation.setParams({ selectLang: this.selectLang });
  }

  languageKeyExtractor = lang => lang.item;

  selectLang = () => {
    AsyncStorage.setItem('selectedLanguage', this.state.selectedLanguage);
    this.props.navigation.goBack();
  };

  renderLanguageItem = (lang) => {
    const {
      selectedLocale,
    } = this.props;
    const active = selectedLocale === lang.item;
    return (
      <Touchable onPress={() => this.setState({ selectedLanguage: lang.item.name })}>
        <View style={active ? styles.active : styles.currencyContainer}>
          <Text style={styles.currencyName}>
            {getLocaleDisplayName(lang.item)}
          </Text>
        </View>
      </Touchable>
    );
  };

  render() {
    const {
      locales,
      selectedLocale,
    } = this.props;
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
  locales: PropTypes.arrayOf(PropTypes.string),
  selectedLocale: PropTypes.string,
};

export default SelectLanguage;
