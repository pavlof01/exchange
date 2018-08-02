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
    title: 'SELECT LANGUAGE',
    headerRight: (
      <Button
        onPress={() => {
          const handleSave = navigation.getParam('handleSave');
          if (typeof handleSave === 'function') {
            handleSave.call();
          }
        }}
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
      selectedLocale: props.selectedLocale,
    };
  }

  componentDidMount() {
    AsyncStorage.setItem('locale', 'en');
    const {
      navigation,
    } = this.props;
    navigation.setParams({ handleSave: this.updateLang });
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
    setLocale(selectedLocale);
    navigation.goBack();
  };

  renderLanguageItem = (lang) => {
    const {
      selectedLocale,
    } = this.state;
    const active = selectedLocale === lang.item;
    return (
      <Touchable onPress={() => this.selectLang(lang.item)}>
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
