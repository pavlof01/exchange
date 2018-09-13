import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  ActivityIndicator,
  Clipboard,
  Text,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';

import { injectIntl, intlShape } from 'react-intl';
import QRCode from '../QRCode';
import PrimaryButton from '../../../style/ActionButton';
import CurrencySelector from '../CurrencySelector';
import { Hint } from '../../../style/common';
import { fonts } from '../../../style/resourceHelpers';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  content: {
    flexDirection: 'column',
    height,
  },
  body: {
    flex: 1,
    width: width - 20,
    backgroundColor: '#fff',
    alignSelf: 'center',
    padding: 15,
    marginTop: -70,
  },
  address: {
    color: '#4a4a4a',
    fontSize: 13,
    fontWeight: '400',
    fontFamily: 'System',
    marginBottom: 8,
    marginLeft: 10,
  },
  buttonsCOntainer: {
    flexDirection: 'row',
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  btn: {
    width: width / 2.5,
    margin: 16,
  },
  buttonText: {
    fontSize: width / 23,
    fontWeight: '400',
  },
  hint: {
    color: '#4a4a4a',
    marginLeft: 10,
  },
});

class Receive extends Component {
  static propTypes = {
    cryptoCurrencies: PropTypes.array, // eslint-disable-line react/forbid-prop-types
    currency: PropTypes.string,
    transactionTokens: PropTypes.any, // eslint-disable-line react/forbid-prop-types
    getTransactionTokens: PropTypes.func,
    generateTransactionToken: PropTypes.func,
    intl: intlShape,
    balance: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  };

  state = {
    cryptoCurrencyCode: this.props.currency || 'BTC',
  };

  componentWillMount() {
    this.props.getTransactionTokens({ currency: this.state.cryptoCurrencyCode });

    if (!this.isAddressLoaded()) {
      this.generateNewToken();
    }
  }

  generateNewToken = () => {
    this.props.generateTransactionToken({ currency: this.state.cryptoCurrencyCode });
  };

  copyAddress = () => {
    if (this.isAddressLoaded()) {
      const {
        transactionTokens,
      } = this.props;
      Clipboard.setString(transactionTokens.data
        && transactionTokens.data.length > 0
        && transactionTokens.data[0].address);
    }
  };

  isAddressLoaded = () => {
    const {
      transactionTokens,
    } = this.props;
    return (transactionTokens.data && transactionTokens.data.length
      > 0 && transactionTokens.data[0].address);
  };

  getAddressFromTokens = (transactionTokens) => {
    let address = ' ';
    if (this.isAddressLoaded()) {
      // eslint-disable-next-line prefer-destructuring
      address = transactionTokens.data[0].address;
    }
    if (transactionTokens && transactionTokens.generation_pending) {
      address = this.props.intl.formatMessage({ id: 'app.wallet.receive.address_generated', defaultMessage: 'address is being generated...' });
    }
    return address;
  };

  onCurrencyChange = (code) => {
    this.props.getTransactionTokens({ currency: code });
    this.setState({ cryptoCurrencyCode: code }, this.generateNewToken);
  };

  render() {
    const {
      transactionTokens,
      cryptoCurrencies,
      intl,
      balance,
    } = this.props;
    return (
      <View style={styles.content}>
        <CurrencySelector
          cryptoCurrencies={cryptoCurrencies}
          onValueChange={this.onCurrencyChange}
          selectedValue={this.state.cryptoCurrencyCode}
          balance={balance}
        />
        <View style={styles.body}>
          <QRCode transactionTokens={transactionTokens} />
          <Hint style={styles.hint}>
            {intl.formatMessage({ id: 'app.wallet.receive.address_to_receive', defaultMessage: 'Address to receive bitcoins' }, { value: this.state.cryptoCurrencyCode === 'BTC' ? 'Bitcoins' : 'Etherium' }).toUpperCase()}
          </Hint>
          <Text
            style={styles.address}
            selectable
          >
            {this.getAddressFromTokens(transactionTokens)}
          </Text>
          <View style={styles.buttonsCOntainer}>
            <PrimaryButton
              onPress={this.generateNewToken}
              title={transactionTokens.data && transactionTokens.data.length > 0
                ? intl.formatMessage({ id: 'app.wallet.receive.btn.share', defaultMessage: 'UPDATE' })
                : intl.formatMessage({ id: 'app.wallet.receive.btn.copy', defaultMessage: 'COPY' })}
              style={styles.btn}
              fontStyle={styles.buttonText}
              secondary
              disabled={transactionTokens.generation_pending}
            >
              {transactionTokens.generation_pending ? <ActivityIndicator size="large" /> : null}
            </PrimaryButton>
            <PrimaryButton
              onPress={this.copyAddress}
              title={intl.formatMessage({ id: 'app.wallet.receive.btn.copy', defaultMessage: 'COPY' })}
              style={styles.btn}
              fontStyle={styles.buttonText}
              disabled={transactionTokens.generation_pending}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default injectIntl(Receive);
