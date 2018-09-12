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
    backgroundColor: '#243682',
    justifyContent: 'space-around',
    paddingTop: 24,
  },
  cryptContainer: {
    width: 169,
    height: 136,
    padding: 12,
    backgroundColor: '#243682',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    justifyContent: 'space-between',
    opacity: 0.1,
    elevation: 4,
    borderRadius: 8,
    borderColor: 'rgba(255,255,255, 0.5)',
    borderWidth: 1,
  },
  bitcoinIconContainer: {
    alignSelf: 'flex-end',
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#fa9925',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cryptImage: {

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
  noActiveIcon: {
    backgroundColor: '#243682',
    borderColor: 'rgba(255,255,255, 0.5)',
    borderWidth: 1,
  },
  setOpacity: {
    opacity: 1,
    borderColor: 'rgba(255,255,255, 0)',
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
          <View style={[styles.cryptContainer, this.state.cryptoCurrencyCode === 'BTC' ? styles.setOpacity : null]}>
            <View style={[styles.bitcoinIconContainer, this.state.cryptoCurrencyCode !== 'BTC' ? styles.noActiveIcon : null]}>
              <Image resizeMode="contain" style={styles.cryptImage} source={require('../../../img/btc_icon.png')} />
            </View>
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
          <View style={[styles.cryptContainer, this.state.cryptoCurrencyCode === 'ETH' ? styles.setOpacity : null]}>
            <View style={[styles.bitcoinIconContainer, { backgroundColor: '#487393' }, this.state.cryptoCurrencyCode !== 'ETH' ? styles.noActiveIcon : null]}>
              <Image resizeMode="contain" style={styles.cryptImage} source={require('../../../img/eth_icon.png')} />
            </View>
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
      </View >
    );
  }
}
