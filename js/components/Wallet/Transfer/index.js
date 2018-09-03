import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactNative, {
  Text,
  View,
  StyleSheet,
  Image,
  Platform,
  ScrollView,
  Dimensions,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { injectIntl, intlShape } from 'react-intl';
import { cryptoIcons, fonts, IC_PICKER } from '../../../style/resourceHelpers';
import FormTextInput from '../../FormTextInput';
import PrimaryButton from '../../../style/ActionButton';
import { common, Hint } from '../../../style/common';
import CenterHalf from '../../../style/CenterHalf';
import Touchable from '../../../style/Touchable';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
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
  error: {
    color: 'red',
    marginTop: 5,
    fontFamily: fonts.regular.regular,
    textAlign: 'center',
  },
  sendButtonText: {
    fontSize: width / 23,
  },
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
    errorTextInput: '',
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
    // eslint-disable-next-line no-param-reassign
    value = value.replace(/,/, '.');
    const rate = this.props.exchangeRates[`${this.props.currencyCode}_${this.state.cryptoCurrencyCode}`];
    // eslint-disable-next-line no-param-reassign
    value = value || 0.0;
    const amount = value * rate;
    this.setState({ form: { ...this.state.form, cost: value, amount: amount.toFixed(8) } });
  };

  onAmountChange = (value) => {
    // eslint-disable-next-line no-param-reassign
    value = value.replace(/,/, '.');
    const rate = this.props.exchangeRates[`${this.props.currencyCode}_${this.state.cryptoCurrencyCode}`];
    // eslint-disable-next-line no-param-reassign
    value = value || 0.0;
    const cost = value / rate;
    this.setState({ form: { ...this.state.form, amount: value, cost: cost.toFixed(2) } });
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
    this.setState({ form, cryptoCurrencyCode: value });
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
    } = this.props;
    /* eslint-disable no-nested-ternary */
    const submitButtonText = pending
      ? intl.formatMessage({ id: 'app.wallet.btn.wait', defaultMessage: 'Wait' }).toUpperCase()
      : this.state.isConfirming
        ? intl.formatMessage({ id: 'app.wallet.btn.confirm', defaultMessage: 'Confirm' }).toUpperCase()
        : intl.formatMessage({ id: 'app.wallet.btn.send', defaultMessage: 'Send' }).toUpperCase();
    /* eslint-enable no-nested-ternary */
    return (
      <KeyboardAwareScrollView
        behavior="padding"
        style={{ flex: 1 }}
        innerRef={(ref) => { this.scrollKeyboard = ref; }}
      >
        <View style={styles.container}>
          <View style={styles.cryptHeader}>
            <Touchable onPress={() => this.onCryptoCurrencyCodeChange('BTC')}>
              <View style={[styles.cryptContainer, this.state.cryptoCurrencyCode === 'BTC' ? styles.active : null]}>
                <Image style={styles.cryptImage} source={require('../../../img/ic_btc.png')} />
                <View>
                  <Text style={styles.cryptNameText}>
                    BTC
                  </Text>
                  <Text style={styles.cryptBalanceText}>
                    {balance['BTC'].value}
                  </Text>
                </View>
              </View>
            </Touchable>
            <Touchable onPress={() => this.onCryptoCurrencyCodeChange('ETH')}>
              <View style={[styles.cryptContainer, this.state.cryptoCurrencyCode === 'ETH' ? styles.active : null]}>
                <Image style={styles.cryptImage} source={require('../../../img/ic_eth.png')} />
                <View>
                  <Text style={styles.cryptNameText}>
                    BTC
                  </Text>
                  <Text style={styles.cryptBalanceText}>
                    {balance["ETH"].value}
                  </Text>
                </View>
              </View>
            </Touchable>
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
              onFocus={event => this._scrollToInput(ReactNative.findNodeHandle(event.target))}
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
                onFocus={event => this._scrollToInput(ReactNative.findNodeHandle(event.target))}
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
                onFocus={event => this._scrollToInput(ReactNative.findNodeHandle(event.target))}
              />
              <Text style={styles.header}>
                {currencyCode}
              </Text>
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
                style={{ flex: 1 }}
              />
            </CenterHalf>

            {this.state.error.isEmpty ? this.renderPasswordError() : null}

            {this.state.error.isSucceed ? this.renderSucessText() : null}

          </View>
        </View>
      </KeyboardAwareScrollView >
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
  currencyCode: PropTypes.string,
};

export default injectIntl(Transfer);
