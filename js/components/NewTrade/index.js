import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { injectIntl, intlShape } from 'react-intl';
import {
  createBasicNavigationOptions,
} from '../../style/navigation';
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

const styles = StyleSheet.create({
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
  pickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  formRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  formStyle: {
    flex: 1,
  },
  header: {
    color: '#2c09a3',
    fontWeight: 'bold',
    fontSize: 26,
    marginBottom: 8,
  },
  info: {
    backgroundColor: 'white',
    margin: 8,
    padding: 8,
    borderRadius: 4,
  },
  centeredText: {
    textAlign: 'center',
    flex: 1,
    margin: 8,
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
  amountInputsContainer: {
    borderColor: '#d5d5d5',
    borderBottomWidth: 1,
    flex: 1,
    flexDirection: 'row',
    // paddingBottom: 10,
    alignItems: 'center',
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
});

class NewTrade extends Component {
  static navigationOptions = createBasicNavigationOptions('REQUEST');

  constructor(props) {
    super(props);

    this.state = {
      ad: props.navigation.getParam('ad', { id: 'NO-ID' }),
      form: {
        amount: undefined,
        cost: undefined,
        message: undefined,
      },
      pending: false,
      errors: undefined,
      showInfoAboutPartner: false,
    };
  }

  componentDidMount() {
    this.setState({ pending: true });
    Api.get(`/pro/${this.state.ad.id}`)
      .then(response => this.setState({ ad: response.data.ad, pending: false }))
      .catch(error => alert('Ad not found'));
  }

  onCostChange = (value) => {
    value = value || 0.0;
    const amount = value / this.state.ad.price;
    this.setState({
      form: { ...this.state.form, cost: value, amount: amount.toFixed(8) },
    });
  };

  onAmountChange = (value) => {
    value = value || 0.0;
    const cost = value * this.state.ad.price;
    this.setState({
      form: { ...this.state.form, amount: value, cost: cost.toFixed(2) },
    });
  };

  onMessageChange = value => this.setState({ form: { ...this.state.form, message: value } });

  onSubmit = (values) => {
    this.setState({ pending: true, errors: undefined });
    Api.post(`/pro/${this.state.ad.id}/trades`, {
      trade: values,
      ad: { price: this.state.ad.price },
    })
      .then((response) => {
        this.setState({ pending: false });
        this.props.openTrade(response.data.trade);
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
              'Трейдер в данный момент не работает, смотрите расписание',
            ],
          };
        } else if (error.response.status === 405) {
          newState.errors = { yourself: ['Торговля с собой'] };
        }

        this.setState(newState);
      });
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

  showInfoAboutPartner = () => this.setState({ showInfoAboutPartner: !this.state.showInfoAboutPartner });

  render() {
    const {
      intl,
    } = this.props;
    const {
      ad,
      pending,
      form,
    } = this.state;
    const { user } = ad;
    return (
      <ScrollView
        style={{ backgroundColor: '#fff' }}
        // keyboardShouldPersistTaps="always"
      >
        <View>
          <Text style={styles.title}>
            {`${intl.formatMessage({ id: 'app.newTrade.title', defaultMessage: 'Transfer via' }).toUpperCase()} ${ad.payment_method_code}`}
          </Text>
          <TraderInfo
            isOnline={ad.user.online}
            traderName={ad.user.user_name}
            completedTradesCount={User.approximateTradesCount(ad.user.completed_trades_count)}
            countryCode={ad.country_code}
          />
          <Text
            style={{
              color: '#4A4A4A',
              fontSize: 12,
              marginTop: 16,
              letterSpacing: 1,
            }}
          >
            COST
          </Text>
          <View style={styles.info}>
            <Text style={styles.centeredText}>
              <Text style={styles.header}>
                1
                {' '}
                {ad.crypto_currency_code}
                {' / '}
                {Price.build(ad.price).viewMain}
                {' '}
                {currencyCodeToSymbol(ad.currency_code)}
              </Text>
            </Text>
          </View>
          <Text
            style={{
              color: '#4A4A4A',
              fontSize: 12,
              marginBottom: 10,
              letterSpacing: 1,
            }}
          >
            AMOUNT
          </Text>

          <View style={styles.pickerRow}>
            {this.renderFiatCurrencyInput()}
            <Image
              source={require('../../img/ic_swap.png')}
              style={[styles.pickerIcon, { margin: 16 }]}
            />
            {this.renderCryptoCurrencyInput()}
          </View>
          <Text
            style={{
              color: '#4A4A4A',
              fontSize: 12,
              marginTop: 30,
              marginBottom: 10,
              letterSpacing: 1,
            }}
          >
            MESSAGE
          </Text>
          <View style={styles.amountInputsContainer}>
            <TextInput
              style={styles.amountText}
              onChangeText={msg => this.setState({ msg })}
              placeholder="You may leave a message"
              value={this.state.msg}
            />
          </View>

          <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              flex: 1,
            }}
          >
            <Text style={{ color: '#4a4a4a' }}>
              Time limit for payment of seller's invoice:
            </Text>
            <Text style={{ fontWeight: '700' }}>
              {' 90 min' /* TODO: Get time value */ }
            </Text>
          </View>

          <PrimaryButton
            onPress={() => this.onSubmit(form)}
            title="SEND A REQUSET TO TRADER"
            disabled={pending}
            style={{
              marginTop: 30,
              flex: 1,
              backgroundColor: '#5b6eff',
              boxShadow: '0 3 5 -3 rgba(31, 89, 230, 0.8)',
            }}
          >
            {pending ? <ActivityIndicator size="large" /> : undefined}
          </PrimaryButton>

          {objMap(this.state.errors, (key, value) => (
            <Text style={styles.warning} key={key}>
              {key}
              {':'}
              {value.join('. ')}
            </Text>
          ))}
        </View>
      </ScrollView>
    );
  }
}

NewTrade.propTypes = {
  intl: intlShape.isRequired,
  navigation: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  isFetching: PropTypes.bool,
  openTrade: PropTypes.func,
};

export default injectIntl(NewTrade);
