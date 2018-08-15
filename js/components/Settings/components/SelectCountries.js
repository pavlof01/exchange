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
import SearchCountryInput from './SearchCountryInput';

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

class SelectCountries extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: (
      <FormattedMessage id="app.settings.title.selectCountry" />
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
      selectedCountry: '',
      countryCode: '',
      text: '',
      countries: this.props.countries
    };
  }

  componentDidMount() {
    const {
      navigation,
      updateFilter,
    } = this.props;
    navigation.setParams({ handleSave: this.selectCountry });
    this.props.updateFilter({});
  }

  onFilterChangeFactory = name => (value) => {
    this.props.updateFilter({ [name]: value });
  };

  onCountryCodeChange = this.onFilterChangeFactory('countryCode');

  countryKeyExtractor = country => country.code;

  selectCountry = () => {
    const {
      navigation,
    } = this.props;
    const {
      selectedCountry,
      countryCode,
    } = this.state;

    this.onCountryCodeChange(countryCode);
    AsyncStorage.setItem('selectedCountry', selectedCountry);
    AsyncStorage.setItem('selectedCountryCode', countryCode);
    navigation.goBack();
  };

  filterCountry = (value) => {
    const text = value.toLowerCase();
    const countriesList = this.state.countries;
    const filteredCountriesList = countriesList.filter(
      country => country.name.toLowerCase().match(text),
    );
    if (!value || value === '') {
      this.setState({ countries: this.props.countries });
    } else {
      this.setState({
        countries: filteredCountriesList,
      });
    }
  }

  renderCountryItem = (country) => {
    const {
      selectedCountry,
    } = this.state;
    const active = selectedCountry === country.item.name;
    return (
      <Touchable onPress={() => this.setState({ selectedCountry: country.item.name, countryCode: country.item.code })}>
        <View style={styles.settingContainer}>
          <Text style={active ? styles.settingNameActive : styles.settingName}>
            {country.item.name}
          </Text>
        </View>
      </Touchable>
    );
  }

  render() {
    const { countries } = this.state;
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.scrollContainer}>
          <FlatList
            data={countries}
            extraData={this.state}
            keyExtractor={this.countryKeyExtractor}
            renderItem={this.renderCountryItem}
            ListHeaderComponent={<SearchCountryInput filterCountry={text => this.filterCountry(text)} />}
          />
        </ScrollView>
      </View>
    );
  }
}

SelectCountries.propTypes = {
  navigation: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  countries: PropTypes.array, // eslint-disable-line react/forbid-prop-types
};

export default SelectCountries;
