import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactNative, {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  TextInput,
  Dimensions,
} from 'react-native';
import { injectIntl, intlShape } from 'react-intl';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormTextInput from '../FormTextInput';
import Price from '../../values/Price';
import {
  currencyCodeToSymbol,
  objMap,
} from '../../helpers';
import PrimaryButton from '../../style/ActionButton';
import Api from '../../services/Api';
import User from '../../models/User';
import TraderInfo from '../TraderInfo';
import { fonts } from '../../style/resourceHelpers';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: '#9b9b9b',
    marginEnd: 17,
    marginStart: 17,
    marginTop: 16,
    paddingBottom: 3,
    marginBottom: 3,
    fontSize: 16,
    fontFamily: fonts.bold.regular,
    borderBottomColor: '#D5D5D5',
    borderBottomWidth: 1,
  },
  infoContainer: {
    paddingStart: 17,
    paddingEnd: 17,
  },
  costText: {
    color: '#2c09a3',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 15,
    fontSize: 22,
    fontFamily: fonts.bold.regular,
  },
  label: {
    color: '#4a4a4a',
    marginTop: 16,
    marginBottom: 6,
    fontSize: 10,
    fontFamily: fonts.medium.regular,
  },
  timeLeft: {
    color: '#4a4a4a',
    marginTop: 16,
    marginBottom: 6,
    fontSize: 12,
    fontFamily: fonts.medium.regular,
  },
  timeLeftBold: {
    color: '#4a4a4a',
    marginTop: 16,
    marginBottom: 6,
    fontSize: 14,
    fontFamily: fonts.bold.regular,
  },
  pickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  formRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  formStyle: {
    flex: 1,
  },
  warning: {
    color: '#8b572a',
    backgroundColor: '#fbf5eb',
    borderColor: '#f5a623',
    borderRadius: 4,
    borderWidth: 1,
    padding: 8,
    margin: 8,
  },
  currencyCode: {
    position: 'absolute',
    right: 0,
    color: '#4a4a4a',
    fontWeight: '700',
    fontSize: 19,
    paddingBottom: 10,
  },
  amountText: {
    paddingRight: 50,
    fontSize: 16,
    paddingBottom: 10,
  },
  sendButtonContainer: {
    marginStart: 60,
    marginEnd: 60,
    marginTop: 30,
    marginBottom: 30,
  },
  sendButtonText: {
    fontSize: width / 25,
  },
});

class NewTrade extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ad: props.navigation.getParam('ad', { id: 'NO-ID' }),
      form: {
        amount: null,
        cost: null,
        message: null,
      },
      pending: false,
      errors: undefined,
    };
  }

  componentDidMount() {
    const {
      ad,
    } = this.state;
    Api.get(`/pro/${ad.id}`)
      .then(response => this.setState({ ad: response.data.ad, pending: false }))
      .catch(() => { });
    this.setState({ pending: true });
  }

  onCostChange = (value) => {
    const {
      ad,
      form,
    } = this.state;
    const newValue = value.replace(/,/, '.') || 0.0;
    const amount = newValue / ad.price;
    this.setState({
      form: { ...form, cost: newValue, amount: amount.toFixed(8) },
    });
  };

  onAmountChange = (value) => {
    const {
      ad,
      form,
    } = this.state;
    const newValue = value.replace(/,/, '.') || 0.0;
    const cost = newValue * ad.price;
    this.setState({
      form: { ...form, amount: newValue, cost: cost.toFixed(2) },
    });
  };

  onMessageChange = value => this.setState({ form: { ...this.state.form, message: value } });

  onSubmit = (values) => {
    const {
      openTrade,
      intl,
    } = this.props;
    const {
      ad,
    } = this.state;
    Api.post(`/pro/${ad.id}/trades`, {
      trade: values,
      ad: { price: ad.price },
    })
      .then((response) => {
        this.setState({ pending: false });
        openTrade(response.data.trade);
      })
      .catch((error) => {
        const newState = { pending: false };

        if (error.response.status === 422) {
          newState.errors = error.response.data.errors;
        } else if (error.response.status === 429) {
          newState.errors = { opened_trade_ids: error.response.data.trade_ids };
        } else if (error.response.status === 410) {
          newState.errors = {
            schedule: [
              intl.formatMessage({ id: 'app.newTrade.label.trader_not_working', defaultMessage: 'The trader is not working at the moment, see the schedule' }),
            ],
          };
        } else if (error.response.status === 405) {
          newState.errors = { error: [intl.formatMessage({ id: 'app.newTrade.label.yourself_error', defaultMessage: 'Trade with yourself' })] };
        }

        this.setState(newState);
      });
    this.setState({ pending: true, errors: undefined });
  };

  static renderCurrencyInput(
    limitMin,
    limitMax,
    curCode,
    isCrypt,
    value,
    onChange,
  ) {
    const min = Price.build(limitMin);
    const max = Price.build(limitMax);

    return (
      <View style={styles.formStyle}>
        <View style={styles.formRow}>
          <FormTextInput
            keyboardType="numeric"
            style={{ paddingRight: 30, flex: 1 }}
            placeholder="0"
            value={value}
            onChangeText={onChange}
          />
          <Text style={styles.currencyCode}>
            {curCode}
          </Text>
        </View>
        <Text
          style={{
            marginTop: 10, flex: 1, color: '#4a4a4a', fontSize: 12,
          }}
        >
          Limit:
          {isCrypt ? min.viewCrypto : min.viewMain}
          {' - '}
          {isCrypt ? max.viewCrypto : max.viewMain}
          {' '}
          {currencyCodeToSymbol(curCode)}
        </Text>
      </View>
    );
  }

  renderFiatCurrencyInput() {
    const { ad, form } = this.state;
    return NewTrade.renderCurrencyInput(
      ad.limit_min,
      ad.limit_max,
      ad.currency_code,
      false,
      form.cost,
      this.onCostChange,
    );
  }

  renderCryptoCurrencyInput() {
    const { ad, form } = this.state;
    return NewTrade.renderCurrencyInput(
      ad.limit_min / ad.price,
      ad.limit_max / ad.price,
      ad.crypto_currency_code,
      true,
      form.amount,
      this.onAmountChange,
    );
  }

  _scrollToInput = (reactNode) => {
    this.scrollKeyboard.props.scrollToFocusedInput(reactNode);
  }

  render() {
    const {
      intl,
    } = this.props;
    const {
      ad,
      pending,
      form,
      errors,
    } = this.state;
    return (
      <KeyboardAwareScrollView
        behavior="padding"
        style={styles.container}
        innerRef={(ref) => { this.scrollKeyboard = ref; }}
      >
        <ScrollView
          style={{ backgroundColor: '#fff' }}
        >
          <View>
            <Text style={styles.title}>
              {`${intl.formatMessage({ id: 'app.newTrade.title', defaultMessage: 'Transfer via' }).toUpperCase()} ${ad.payment_method_code}`}
            </Text>
            <TraderInfo
              isOnline={ad.user.online}
              traderName={ad.user.user_name}
              completedTradesCount={
                String(User.approximateTradesCount(ad.user.completed_trades_count) || '')
              }
              countryCode={ad.country_code}
            />
            <View style={styles.infoContainer}>
              <Text style={styles.label}>
                {intl.formatMessage({ id: 'app.newTrade.label.cost', defaultMessage: 'Cost' }).toUpperCase()}
              </Text>
              <Text style={styles.costText}>
                {`1 ${ad.crypto_currency_code} / ${Price.build(ad.price).viewMain} ${currencyCodeToSymbol(ad.currency_code)}`}
              </Text>
              <Text style={styles.label}>
                {intl.formatMessage({ id: 'app.newTrade.label.amount', defaultMessage: 'Amount' }).toUpperCase()}
              </Text>
              <View style={styles.pickerRow}>
                {this.renderFiatCurrencyInput()}
                <Image
                  source={require('../../img/ic_swap.png')}
                  style={[styles.pickerIcon, { margin: 16 }]}
                />
                {this.renderCryptoCurrencyInput()}
              </View>
              <Text style={styles.label}>
                {intl.formatMessage({ id: 'app.newTrade.label.message', defaultMessage: 'Message' }).toUpperCase()}
              </Text>
              <TextInput
                style={styles.amountText}
                onChangeText={this.onMessageChange}
                placeholder={intl.formatMessage({ id: 'app.newTrade.text.leave_message', defaultMessage: 'You may leave a message' })}
                value={form.message}
                onFocus={event => this._scrollToInput(ReactNative.findNodeHandle(event.target))}
                ref={(ref) => { this.textInput = ref; }}
              />
              <Text style={styles.timeLeft}>
                {intl.formatMessage({ id: 'app.newTrade.text.timeLeft', defaultMessage: 'Time limit for payment of seller\'s invoice:' })}
                {' '}
                <Text style={styles.timeLeftBold}>
                  {intl.formatMessage({ id: 'app.newTrade.text.timeLeftValue', defaultMessage: '{time} min' }, { time: 90 })}
                </Text>
              </Text>
            </View>
            {objMap(errors, (key, value) => (
              <Text style={styles.warning} key={key}>
                {key}
                {':'}
                {value.join('. ')}
              </Text>
            ))}
            <PrimaryButton
              style={styles.sendButtonContainer}
              fontStyle={styles.sendButtonText}
              onPress={() => this.onSubmit(form)}
              title={intl.formatMessage({ id: 'app.newTrade.button.sendRequestToTrader', defaultMessage: 'Send a request to trader' }).toUpperCase()}
              disabled={pending}
            >
              {pending ? <ActivityIndicator size="large" /> : undefined}
            </PrimaryButton>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    );
  }
}

NewTrade.propTypes = {
  intl: intlShape.isRequired,
  navigation: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  openTrade: PropTypes.func.isRequired,
};

export default injectIntl(NewTrade);
