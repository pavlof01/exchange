import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import Touchable from '../../../style/Touchable';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  cryptHeader: {
    flexDirection: 'row',
    width,
    height: 236,
    backgroundColor: '#25367e',
    justifyContent: 'space-around',
    paddingTop: 24,
  },
  cryptContainer: {
    width: 169,
    height: 136,
    padding: 12,
    backgroundColor: '#25367e',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    justifyContent: 'space-between',
    opacity: 0.2,
    elevation: 4,
    borderRadius: 4,
  },
  cryptImage: {
    alignSelf: 'flex-end',
    width: 37,
    height: 37,
  },
  cryptNameText: {
    color: '#fff',
    fontSize: 20,
  },
  cryptBalanceText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  active: {
    opacity: 1,
  },
});

export default class CurrencySelector extends Component {
  static propTypes = {
    cryptoCurrencies: PropTypes.array, // eslint-disable-line react/forbid-prop-types
    onValueChange: PropTypes.func,
    selectedValue: PropTypes.string,
  };

  state = {
    cryptoCurrencyCode: this.props.selectedValue || 'BTC',
  };

  onCryptoCurrencyCodeChange = (value) => {
    this.props.onValueChange(value);
    this.setState({ cryptoCurrencyCode: value });
  };

  render() {
    const { balance } = this.props;

    return (
      <View style={styles.cryptHeader}>
        <Touchable onPress={() => this.onCryptoCurrencyCodeChange('BTC')}>
          <View style={[styles.cryptContainer, this.state.cryptoCurrencyCode === 'BTC' ? styles.active : null]}>
            <Image resizeMode="contain" style={styles.cryptImage} source={require('../../../img/ic_btc.png')} />
            <View>
              <Text style={styles.cryptNameText}>
                BTC
              </Text>
              <Text style={styles.cryptBalanceText}>
                {balance.BTC.value}
              </Text>
            </View>
          </View>
        </Touchable>
        <Touchable onPress={() => this.onCryptoCurrencyCodeChange('ETH')}>
          <View style={[styles.cryptContainer, this.state.cryptoCurrencyCode === 'ETH' ? styles.active : null]}>
            <Image resizeMode="contain" style={styles.cryptImage} source={require('../../../img/ic_eth.png')} />
            <View>
              <Text style={styles.cryptNameText}>
                ETH
              </Text>
              <Text style={styles.cryptBalanceText}>
                {balance.ETH.value}
              </Text>
            </View>
          </View>
        </Touchable>
      </View>
    );
  }
}
