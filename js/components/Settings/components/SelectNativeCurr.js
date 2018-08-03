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
      <FormattedMessage id="app.settings.title.selectCurrency" />
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
      selectedCurrency: '',
    };
  }

  componentDidMount() {
    const {
      navigation,
    } = this.props;
    navigation.setParams({
      handleSave: this.selectCurrency,
    });
  }

  countryKeyExtractor = currency => currency.code;

  selectCurrency = () => {
    const {
      navigation,
    } = this.props;
    const {
      selectedCurrency,
    } = this.state;
    AsyncStorage.setItem('selectedCurrency', selectedCurrency);
    navigation.goBack();
  };

  renderCurrencyItem = (currency) => {
    const {
      selectedCurrency,
    } = this.state;
    const active = selectedCurrency === currency.item.name;
    return (
      <Touchable onPress={() => this.setState({ selectedCurrency: currency.item.name })}>
        <View style={styles.settingContainer}>
          <Text style={active ? styles.settingNameActive : styles.settingName}>
            {currency.item.name}
          </Text>
        </View>
      </Touchable>
    );
  };

  render() {
    const {
      currencies,
    } = this.props;
    const {
      selectedCurrency,
    } = this.state;
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.scrollContainer}>
          <FlatList
            data={currencies}
            extraData={selectedCurrency}
            keyExtractor={this.countryKeyExtractor}
            renderItem={this.renderCurrencyItem}
          />
        </ScrollView>
      </View>
    );
  }
}

SelectCountries.propTypes = {
  navigation: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  currencies: PropTypes.array, // eslint-disable-line react/forbid-prop-types
};

export default SelectCountries;
