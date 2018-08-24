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
    justifyContent: 'space-between',
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
  checkMark: {
    transform: [
      { rotateY: '60deg' },
    ],
  },
  headerButtonContainer: {
    padding: 10,
  },
  headerButton: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});

class SelectNativeCurr extends Component {
  static navigationOptions = () => ({
    title: (
      <FormattedMessage id="app.settings.title.selectCurrency" />
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
    this.props.updateFilter({});
  }

  async componentWillMount() {
    const selectedCurrency = await AsyncStorage.getItem('selectedCurrency') || '';
    this.setState({ selectedCurrency });
  }

  onFilterChangeFactory = (name) => (value) => this.props.updateFilter({ [name]: value });
};

onCurrencyCodeChange = this.onFilterChangeFactory('currencyCode');

countryKeyExtractor = currency => currency.code;

selectCurrency = (currency) => {
  const {
    navigation,
  } = this.props;
  this.onCurrencyCodeChange(currency);
  AsyncStorage.setItem('selectedCurrency', currency);
  navigation.goBack();
};

  static getCurrencyName(currency) {
  return currency.name || currency.code;
}

renderCurrencyItem = (currency) => {
  const {
    selectedCurrency,
  } = this.state;
  const { item } = currency;
  const active = selectedCurrency === item.code;
  const checked = this.state.selectedCurrency === item.code;
  return (
    <Touchable onPress={() => this.selectCurrency(item.code)}>
      <View style={styles.settingContainer}>
        <Text style={active || checked ? styles.settingNameActive : styles.settingName}>
          {SelectNativeCurr.getCurrencyName(item)}
        </Text>
        {active || checked ? <Text>✓</Text> : null}
      </View>
    </Touchable>
  );
};

render(){
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
};
}

SelectNativeCurr.propTypes = {
  navigation: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  currencies: PropTypes.array, // eslint-disable-line react/forbid-prop-types
};

export default SelectNativeCurr;
