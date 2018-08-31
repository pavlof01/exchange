import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  View,
  StyleSheet, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { injectIntl, intlShape } from 'react-intl';
import HeaderBar from '../../style/HeaderBar';
import TopButton from '../../style/TopButton';
import Separator from '../../style/Separator';
import Transfer from './Transfer';
import Receive from './Receive';
import { withCommonStatusBar } from '../../style/navigation';
import ConfirmDialog from './ConfirmDialog';

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#243682',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: '#243682',
  },
});

const DEFAULT_FORM_VALUES = {
  code: '',
  amount: '',
  address: '',
  password: '',
  currency: 'BTC',
  description: '',
};

class Wallet extends Component {
  state = {
    selectedAction: 'transfer',
    isConfirming: false,
    form: DEFAULT_FORM_VALUES,
  };

  onTransferSelected = () => this.setState({ selectedAction: 'transfer' });

  onReceiveSelected = () => this.setState({ selectedAction: 'receive' });

  onWalletOperationStart = (form) => {
    this.setState({ isConfirming: true, form });
  };

  closeConfirmDialog = () => {
    this.setState({ isConfirming: false });
  };

  renderConfirmDialog = () => {
    const {
      intl,
    } = this.props;
    const {
      form,
    } = this.state;
    const {
      amount,
      currency,
      address,
      password,
    } = form;
    return (
      <ConfirmDialog
        priceLabel={intl.formatMessage({ id: 'app.wallet.dialog.you_send', defaultMessage: 'You send' }).toUpperCase()}
        priceText={`${amount} ${currency}`}
        addressText={address}
        passwordValue={password}
        onChangePassword={this.onChangePassword}
        errorText=""
        onCancelPress={this.closeConfirmDialog}
        onConfirmPress={this.onConfirmPress}
      />
    );
  };

  onConfirmPress = () => {
    const params = { ...this.state.form };
    this.props.sendCryptoCurrency(params);
    this.closeConfirmDialog();
  };

  onChangePassword = (value) => {
    const form = {
      // eslint-disable-next-line react/no-access-state-in-setstate
      ...this.state.form,
      password: value,
    };

    this.setState({ form });
  };

  render() {
    const {
      user: {
        balance,
        currencyCode,
      },
      exchangeRates,
      withdrawal,
      sendCryptoCurrency,
      transactionTokens,
      getTransactionTokens,
      generateTransactionToken,
      intl,
    } = this.props;
    let content; let
      header;
    if (this.state.selectedAction === 'transfer') {
      content = (
        <Transfer
          cryptoCurrencies={this.props.cryptoCurrencies}
          currencyCode={currencyCode}
          balance={balance}
          exchangeRates={exchangeRates}
          updateRates={this.props.updateRates}
          updateCurrencies={this.props.updateCurrencies}
          updateEstimatedFee={this.props.updateEstimatedFee}
          withdrawal={withdrawal}
          onWalletOperationStart={this.onWalletOperationStart}
          sendCryptoCurrency={sendCryptoCurrency}
        />
      );
      header = intl.formatMessage({ id: 'app.wallet.title.transfer', defaultMessage: 'Transfer' }).toUpperCase();
    } else {
      content = (
        <Receive
          currency="BTC"
          cryptoCurrencies={this.props.cryptoCurrencies}
          transactionTokens={transactionTokens}
          getTransactionTokens={getTransactionTokens}
          generateTransactionToken={generateTransactionToken}
        />
      );
      header = intl.formatMessage({ id: 'app.wallet.title.receive', defaultMessage: 'Receive' }).toUpperCase();
    }

    return withCommonStatusBar(
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.container}>
          <HeaderBar title={header} />
          <View style={styles.rowContainer}>
            <TopButton
              title={intl.formatMessage({ id: 'app.wallet.title.transfer', defaultMessage: 'Transfer' })}
              onPress={this.onTransferSelected}
              selected={this.state.selectedAction === 'transfer'}
            />

            <TopButton
              title={intl.formatMessage({ id: 'app.wallet.title.receive', defaultMessage: 'Receive' })}
              onPress={this.onReceiveSelected}
              selected={this.state.selectedAction === 'receive'}
            />
          </View>

          <ScrollView keyboardShouldPersistTaps="always">
            {content}
          </ScrollView>

          {this.state.isConfirming ? this.renderConfirmDialog() : null}

        </View>
      </SafeAreaView>,
    );
  }
}

Wallet.propTypes = {
  intl: intlShape.isRequired,
  /* eslint-disable react/forbid-prop-types */
  exchangeRates: PropTypes.any,
  withdrawal: PropTypes.any,
  sendCryptoCurrency: PropTypes.any,
  transactionTokens: PropTypes.any,
  getTransactionTokens: PropTypes.any,
  generateTransactionToken: PropTypes.any,
  user: PropTypes.any,
  cryptoCurrencies: PropTypes.any,
  updateRates: PropTypes.any,
  updateEstimatedFee: PropTypes.any,
  updateCurrencies: PropTypes.any,
  /* eslint-enable react/forbid-prop-types */
};

export default injectIntl(Wallet);
