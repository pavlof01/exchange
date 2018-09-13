import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactNative, {
  Text,
  View,
  StyleSheet,
  Image,
  Platform,
  Dimensions,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  Menu,
  MenuOptions,
  MenuTrigger,
  MenuOption,
} from 'react-native-popup-menu';
import { injectIntl, intlShape } from 'react-intl';
import { cryptoIcons, fonts, IC_PICKER } from '../../../style/resourceHelpers';
import FormTextInput from '../../FormTextInput';
import PrimaryButton from '../../../style/ActionButton';
import { common, Hint } from '../../../style/common';
import CenterHalf from '../../../style/CenterHalf';
import CurrencySelector from '../CurrencySelector';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    height,
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
  cardText: {
    fontSize: 24,
    color: '#444444',
    fontWeight: 'bold',
    fontFamily: fonts.bold.regular,
  },
  formStyle: {
    flex: 1,
    width: width - 20,
    backgroundColor: '#fff',
    alignSelf: 'center',
    padding: 15,
    marginTop: -70,
    paddingTop: 15,
  },
  formRow: {
    marginTop: 15,
  },
  currencyPickerContainer: {
    position: 'absolute',
    right: 0,
  },
  formTextInput: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    right: 0,
    color: '#cac8c8',
    fontWeight: '400',
    fontSize: 18,
    fontFamily: fonts.regular.regular,
  },
  error: {
    color: 'red',
    marginTop: 5,
    fontFamily: fonts.regular.regular,
    textAlign: 'center',
  },
  sendButtonText: {
    fontSize: width / 23,
    fontWeight: '400',
    fontFamily: 'System',
  },
  sendButton: {
    width: 320,
    alignSelf: 'center',
    marginTop: 30,
  },
  hint: {
    paddingLeft: 18,
  },
  textFormInput: {
    paddingLeft: 18,
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
    currency: 'USD',
    form: DEFAULT_FORM_VALUES,
    price: '',
    isConfirming: false,
    error: { isEmpty: false, isSucceed: false },
    errorTextInput: '',
  };

  componentWillMount() {
    const { currencyCode } = this.props;

    this.props.updateRates({ [currencyCode]: this.state.cryptoCurrencyCode });
    this.props.updateCurrencies();
    this.props.updateCryptValue({ crypt: 'BTC' });
    this.props.updateCryptValue({ crypt: 'ETH' });
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
    // eslint-disable-next-line no-param-reassign
    value = value.replace(/,/, '.');
    const { BTC_USD, ETH_USD } = this.props.cryptValue;
    const rate = this.state.cryptoCurrencyCode === 'BTC'
      ? BTC_USD : ETH_USD;
    // eslint-disable-next-line no-param-reassign
    value = value || 0.0;
    const amount = value / rate;
    this.setState({ form: { ...this.state.form, cost: value, amount: amount.toFixed(8) } });
  };

  onAmountChange = (value, currency = this.state.currency || 'USD') => {
    /* eslint-disable no-nested-ternary  */
    value = value === null ? this.state.form.amount : value.replace(/,/, '.');
    const {
      BTC_USD, ETH_USD, BTC_RUB, ETH_RUB,
    } = this.props.cryptValue;
    const rate = this.state.cryptoCurrencyCode === 'BTC' && currency === 'USD'
      ? BTC_USD : this.state.cryptoCurrencyCode === 'BTC' && currency === 'RUB'
        ? BTC_RUB : this.state.cryptoCurrencyCode === 'ETH' && currency === 'USD'
          ? ETH_USD : ETH_RUB;
    /* eslint-enable no-nested-ternary  */

    value = value || 0.0;
    const cost = value * rate;
    this.setState({ form: { ...this.state.form, amount: value, cost: cost.toFixed(2) }, currency });
  };

  clearedErrorList = (name) => {
    // eslint-disable-next-line prefer-destructuring
    const error = this.state.error;
    delete error[name];
    delete error.isEmpty;
    delete error.isSucceed;

    return error;
  };

  static itemWithIcons(label, iconLeft, iconRight) {
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

  cryptItemFactory = header => (code) => {
    // eslint-disable-next-line prefer-destructuring
    const value = this.props.balance[code].value;
    return (
      <View style={styles.pickerColumn}>
        <Text style={styles.cardText}>
          {value}
        </Text>
        {Transfer.itemWithIcons(code, <Image source={cryptoIcons[code]} style={styles.pickerIcon} resizeMode="contain" />,
          header ? <Image source={IC_PICKER} style={styles.pickerIcon} resizeMode="contain" /> : undefined)}
      </View>
    );
  };

  cryptItem = this.cryptItemFactory(false);

  CryptHeader = this.cryptItemFactory(true);

  onCryptoCurrencyCodeChange = (value) => {
    const form = {
      // eslint-disable-next-line react/no-access-state-in-setstate
      ...this.state.form,
      currency: value,
    };
    this.setState({ form, cryptoCurrencyCode: value }, () => this.onAmountChange(null, this.state.currency));
  };

  onAddressChange = (value) => {
    const form = {
      // eslint-disable-next-line react/no-access-state-in-setstate
      ...this.state.form,
      address: value,
    };
    this.setState({ form });
  };

  onSubmitHandler = () => {
    const { address, amount, cost } = this.state.form;
    const { intl } = this.props;
    if (!address) {
      this.setState({ errorTextInput: intl.formatMessage({ id: 'app.wallet.form.label.adress.error', defaultMessage: 'Enter address' }) });
    } else if (!amount) {
      this.setState({ errorTextInput: intl.formatMessage({ id: 'app.wallet.form.label.amount.error', defaultMessage: 'Enter amount' }) });
    } else if (!cost) {
      this.setState({ errorTextInput: intl.formatMessage({ id: 'app.wallet.form.label.cost.error', defaultMessage: 'Enter cost' }) });
    } else {
      this.setState({ errorTextInput: '' }, () => this.props.onWalletOperationStart({ ...this.state.form }));
    }
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

  _scrollToInput = (reactNode) => {
    this.scrollKeyboard.props.scrollToFocusedInput(reactNode);
  }

  render() {
    const code = this.state.cryptoCurrencyCode;
    const {
      currencyCode,
      withdrawal: { pending },
      intl,
      balance,
      cryptValue,
    } = this.props;
    /* eslint-disable no-nested-ternary */
    const submitButtonText = pending
      ? intl.formatMessage({ id: 'app.wallet.btn.wait', defaultMessage: 'Wait' })
      : this.state.isConfirming
        ? intl.formatMessage({ id: 'app.wallet.btn.confirm', defaultMessage: 'Confirm' })
        : intl.formatMessage({ id: 'app.wallet.btn.send', defaultMessage: 'Send' });
    /* eslint-enable no-nested-ternary */
    return (
      <KeyboardAwareScrollView
        behavior="padding"
        style={{ flex: 1 }}
        innerRef={(ref) => { this.scrollKeyboard = ref; }}
      >
        <View style={styles.container}>
          <CurrencySelector
            onValueChange={this.onCryptoCurrencyCodeChange}
            selectedValue={this.state.cryptoCurrencyCode}
            balance={balance}
          />
          <View style={styles.formStyle}>
            <View style={{ flex: 1 }}>
              <View style={styles.formRow}>
                <Hint style={styles.hint}>
                  {intl.formatMessage({ id: 'app.wallet.form.label.adress', defaultMessage: 'Adress' }).toUpperCase()}
                </Hint>
                <FormTextInput
                  placeholder={
                    `${intl.formatMessage({ id: 'app.wallet.form.label.adress.placeholder.enter', defaultMessage: 'Enter' })} ${
                    simpleCurrencyName[code]} ${
                    intl.formatMessage({ id: 'app.wallet.form.label.adress.placeholder.address', defaultMessage: 'Adress' })}`}
                  onChangeText={this.onAddressChange}
                  value={this.state.form.address}
                  textStyle={styles.textFormInput}
                  onFocus={event => this._scrollToInput(ReactNative.findNodeHandle(event.target))}
                />
              </View>
              <View style={styles.formRow}>
                <Hint style={styles.hint}>
                  {intl.formatMessage({ id: 'app.wallet.form.label.amount', defaultMessage: 'Amount' }).toUpperCase()}
                  {' '}
                  {' '}
                  {simpleCurrencyName[code] === 'Bitcoin' ? 'BTC' : 'ETH'}
                </Hint>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <FormTextInput
                    placeholder={intl.formatMessage({ id: 'app.wallet.form.label.amount.placeholder', defaultMessage: 'BTC' })}
                    onChangeText={this.onAmountChange}
                    keyboardType="numeric"
                    value={this.state.form.amount}
                    style={styles.formTextInput}
                    textStyle={styles.textFormInput}
                    onFocus={event => this._scrollToInput(ReactNative.findNodeHandle(event.target))}
                  />
                  <Text style={styles.header}>
                    {code}
                  </Text>
                </View>
              </View>
              <View style={styles.formRow}>
                <Hint style={styles.hint}>
                  {intl.formatMessage({ id: 'app.wallet.form.label.amount', defaultMessage: 'Cost' }).toUpperCase()}
                </Hint>
                <View>
                  <FormTextInput
                    placeholder={intl.formatMessage({ id: 'app.wallet.form.label.cost.placeholder', defaultMessage: 'USD' })}
                    onChangeText={this.onCostChange}
                    keyboardType="numeric"
                    value={this.state.form.cost}
                    style={{ marginRight: 80 }}
                    textStyle={styles.textFormInput}
                    onFocus={event => this._scrollToInput(ReactNative.findNodeHandle(event.target))}
                  />
                  <View style={styles.currencyPickerContainer}>
                    <Menu>
                      <MenuTrigger>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Text style={{
                            color: '#cac8c8', fontWeight: '400', fontSize: 18, marginRight: 5,
                          }}
                          >
                            {this.state.currency}
                          </Text>
                          <Image source={require('../../../img/ic_picker.png')} />
                        </View>
                      </MenuTrigger>
                      <MenuOptions>
                        <MenuOption onSelect={() => this.onAmountChange(null, 'USD')} key="USD" value="USD">
                          <Text>
                            USD
                          </Text>
                        </MenuOption>
                        <MenuOption onSelect={() => this.onAmountChange(null, 'RUB')} key="RUR" value="RUR">
                          <Text>
                            RUB
                          </Text>
                        </MenuOption>
                      </MenuOptions>
                    </Menu>
                  </View>
                </View>
              </View>
              {this.state.isConfirming ? this.renderConfirmPasswordField() : null}
              {this.state.errorTextInput ? (
                <Text style={styles.error}>
                  {this.state.errorTextInput}
                </Text>) : null}
              <CenterHalf>
                <PrimaryButton
                  fontStyle={styles.sendButtonText}
                  onPress={this.onSubmitHandler}
                  title={submitButtonText}
                  style={styles.sendButton}
                />
              </CenterHalf>

              {this.state.error.isEmpty ? this.renderPasswordError() : null}

              {this.state.error.isSucceed ? this.renderSucessText() : null}
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

Transfer.propTypes = {
  intl: intlShape.isRequired,
  cryptoCurrencies: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  onWalletOperationStart: PropTypes.func,
  balance: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  withdrawal: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  updateRates: PropTypes.func,
  updateCurrencies: PropTypes.func,
  updateEstimatedFee: PropTypes.func,
  exchangeRates: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  updateCryptValue: PropTypes.func,
  currencyCode: PropTypes.string,
  cryptValue: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default injectIntl(Transfer);
