import React, { Component } from 'react';

import {
  Text,
  View,
  StyleSheet, Image, Platform,
} from 'react-native';
import { MenuOption } from 'react-native-popup-menu';
import { default as ProgressCircle } from 'react-native-progress-circle';
import { injectIntl, intlShape } from 'react-intl';
import CardPicker from '../../../style/CardPicker';
import { cryptoIcons, fonts, IC_PICKER } from '../../../style/resourceHelpers';

import FormTextInput from '../../FormTextInput';
import PrimaryButton from '../../../style/ActionButton';
import { common, Hint } from '../../../style/common';
import { CenterHalf } from '../../../style/CenterHalf';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 16,
  },
  centerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  amount: {
    color: '#111111',
    fontWeight: 'bold',
    fontFamily: fonts.bold.regular,
    textAlign: 'center',
    flex: 1,
  },
  limitsAmount: {
    color: '#111111',
    fontWeight: 'bold',
    fontFamily: fonts.bold.regular,
    textAlign: 'center',
    flex: 2,
  },
  pickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  pickerColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  pickerIcon: {
    height: 24,
    width: 24,
    marginHorizontal: 8,
    marginBottom: Platform.OS === 'android' ? 0 : 8,
  },
  picker: {
    height: 50,
    width: 100,
  },
  cardText: {
    fontSize: 24,
    color: '#444444',
    fontWeight: 'bold',
    fontFamily: fonts.bold.regular,
  },
  formStyle: {
    flex: 1,
  },
  formRow: {
    flex: 1,
    flexDirection: 'row',
  },
  header: {
    color: '#444444',
    fontWeight: 'bold',
    fontSize: 20,
    margin: 8,
    fontFamily: fonts.bold.regular,
  },
  errorRow: {
    flex: 1,
    flexDirection: 'row',
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

const simpleCurrencyName = {
  BTC: 'Bitcoin',
  ETH: 'Ethereum',
};

class Transfer extends Component {
  state = {
    cryptoCurrencyCode: 'BTC',
    form: DEFAULT_FORM_VALUES,
    price: '',
    isConfirming: false,
    error: { isEmpty: false, isSucceed: false },
  };

  componentWillMount() {
    const { currencyCode } = this.props;

    this.props.updateRates({ [currencyCode]: this.state.cryptoCurrencyCode });
    this.props.updateCurrencies();
    this.props.updateEstimatedFee({ currency: this.props.currencyCode });
  }

  componentWillReceiveProps({ withdrawal, exchangeRates }) {
    const data = this.state;

    if (withdrawal.status === 200) {
      data.form = { ...DEFAULT_FORM_VALUES };
      data.price = '';
      data.error.isSucceed = true;
      data.error.isConfirming = false;
    }

    if (withdrawal.status === 400) {
      data.error.isEmpty = true;
    }

    if (
      this.state.price
      && this.props.exchangeRates !== exchangeRates
      && exchangeRates[`${this.props.currencyCode}_${this.state.currency}`]
    ) {
      data.price = data.form.amount * exchangeRates[`${this.props.currencyCode}_${this.state.currency}`];
    }

    this.setState({ ...data, error: { ...withdrawal.error, ...data.error } });
  }

  onCostChange = (value) => {
    const rate = this.props.exchangeRates[`${this.props.currencyCode}_${this.state.cryptoCurrencyCode}`];

    value = value || 0.0;
    const amount = value * rate;
    this.setState({ form: { ...this.state.form, cost: value, amount: amount.toFixed(8) } });
  };

  onAmountChange = (value) => {
    const rate = this.props.exchangeRates[`${this.props.currencyCode}_${this.state.cryptoCurrencyCode}`];

    value = value || 0.0;
    const cost = value / rate;
    this.setState({ form: { ...this.state.form, amount: value, cost: cost.toFixed(2) } });
  };

  clearedErrorList = (name) => {
    const error = this.state.error;
    delete error[name];
    delete error.isEmpty;
    delete error.isSucceed;

    return error;
  };

  static ItemWithIcons(label, iconLeft, iconRight) {
    return (
      <View style={styles.pickerRow}>
        {iconLeft}
        <Text style={styles.cardText}>
          {label}
        </Text>
        {iconRight}
      </View>
    );
  }

  CryptItemFactory = header => (code) => {
    const value = this.props.balance[code].value;
    return (
      <View style={styles.pickerColumn}>
        <Text style={styles.cardText}>
          {value}
        </Text>
        {Transfer.ItemWithIcons(code, <Image source={cryptoIcons[code]} style={styles.pickerIcon} resizeMode="contain" />,
          header ? <Image source={IC_PICKER} style={styles.pickerIcon} resizeMode="contain" /> : undefined)}
      </View>
    );
  };

  CryptItem = this.CryptItemFactory(false);

  CryptHeader = this.CryptItemFactory(true);

  onCryptoCurrencyCodeChange = (value) => {
    const form = {
      ...this.state.form,
      currency: value,
    };
    this.setState({ form, cryptoCurrencyCode: value });
  };

  onAddressChange = (value) => {
    const form = {
      ...this.state.form,
      address: value,
    };
    this.setState({ form });
  };

  onSubmitHandler = () => {
    this.props.onWalletOperationStart({ ...this.state.form });
  };

  renderPasswordError = () => (
    <View style={styles.formRow}>
      <Text style={common.errorText}>
        {this.props.intl.formatMessage({ id: 'app.wallet.transfer.wrong_password', defaultMessage: 'Wrong password' }).toUpperCase()}
      </Text>
    </View>
  );

  renderSucessText = () => (
    <View style={styles.formRow}>
      <Text style={common.successText}>
        {this.props.intl.formatMessage({ id: 'app.wallet.transfer.Transaction_added_to_queue', defaultMessage: 'Transaction added to queue' }).toUpperCase()}
      </Text>
    </View>
  );

  render() {
    const code = this.state.cryptoCurrencyCode;
    const {
      currencyCode,
      withdrawal: { pending },
      intl,
    } = this.props;

    const submitButtonText = pending
      ? intl.formatMessage({ id: 'app.wallet.btn.wait', defaultMessage: 'Wait' }).toUpperCase()
      : this.state.isConfirming
        ? intl.formatMessage({ id: 'app.wallet.btn.confirm', defaultMessage: 'Confirm' }).toUpperCase()
        : intl.formatMessage({ id: 'app.wallet.btn.send', defaultMessage: 'Send' }).toUpperCase();

    return (
      <View style={styles.container}>
        <Hint>
          {intl.formatMessage({ id: 'app.wallet.title.balance', defaultMessage: 'Balance' }).toUpperCase()}
        </Hint>
        <View style={styles.centerContent}>
          <ProgressCircle
            percent={15}
            radius={128}
            borderWidth={12}
            shadowColor="#25367E"
            color="#B6AFD0"
            bgColor="#fff"
          >
            <CardPicker
              style={styles.picker}
              onValueChange={this.onCryptoCurrencyCodeChange}
              selectedValue={code}
              renderButton={this.CryptHeader}
              flat
            >
              {this.props.cryptoCurrencies.map(
                currency => (
                  <MenuOption key={currency.code} value={currency.code}>
                    {this.CryptItem(currency.code)}
                  </MenuOption>
                ),
              )}
            </CardPicker>
          </ProgressCircle>
        </View>

        <View style={styles.formStyle}>

          <Hint>
            {intl.formatMessage({ id: 'app.wallet.form.label.adress', defaultMessage: 'Adress' }).toUpperCase()}
          </Hint>
          <FormTextInput
            placeholder={
              `${intl.formatMessage({ id: 'app.wallet.form.label.adress.placeholder.enter', defaultMessage: 'Enter' })} ${
                simpleCurrencyName[code]} ${
                intl.formatMessage({ id: 'app.wallet.form.label.adress.placeholder.address', defaultMessage: 'Adress' })}`}
            onChangeText={this.onAddressChange}
            value={this.state.form.address}
            style={styles.formStyle}
          />

          <Hint>
            {intl.formatMessage({ id: 'app.wallet.form.label.amount', defaultMessage: 'Amount' }).toUpperCase()}
          </Hint>
          <View style={styles.formRow}>
            <FormTextInput
              placeholder={intl.formatMessage({ id: 'app.wallet.form.label.amount.placeholder', defaultMessage: 'BTC' })}
              onChangeText={this.onAmountChange}
              keyboardType="numeric"
              value={this.state.form.amount}
              style={styles.formStyle}
            />
            <Text style={styles.header}>
              {code}
            </Text>
          </View>

          <Hint>
            {intl.formatMessage({ id: 'app.wallet.form.label.cost', defaultMessage: 'Cost' }).toUpperCase()}
          </Hint>
          <View style={styles.formRow}>
            <FormTextInput
              placeholder={intl.formatMessage({ id: 'app.wallet.form.label.cost.placeholder', defaultMessage: 'USD' })}
              onChangeText={this.onCostChange}
              keyboardType="numeric"
              value={this.state.form.cost}
              style={styles.formStyle}
            />
            <Text style={styles.header}>
              {currencyCode}
            </Text>
          </View>

          {this.state.isConfirming ? this.renderConfirmPasswordField() : null}

          <CenterHalf>
            <PrimaryButton onPress={this.onSubmitHandler} title={submitButtonText} style={{ flex: 1 }} />
          </CenterHalf>

          {this.state.error.isEmpty ? this.renderPasswordError() : null}

          {this.state.error.isSucceed ? this.renderSucessText() : null}

        </View>

      </View>
    );
  }
}

export default injectIntl(Transfer);
