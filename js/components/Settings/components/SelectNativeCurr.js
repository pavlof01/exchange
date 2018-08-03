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
  headerStyle: {
    backgroundColor: 'red',
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
        <View style={active ? styles.active : styles.currencyContainer}>
          <Text style={styles.currencyName}>
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
