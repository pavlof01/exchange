import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import moment from 'moment';
import { fonts } from '../../style/resourceHelpers';
import Price from '../../values/Price';
import {
  getTradeTitle,
  isTradeComplete,
} from '../../helpers';
import TransactionDetails from './TransactionDetails';
import Feedback from './Feedback';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
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
  tradeDescription: {
    color: '#9b9b9b',
    textAlign: 'center',
    marginEnd: 17,
    marginStart: 17,
    marginTop: 20,
    marginBottom: 20,
    fontSize: 16,
    lineHeight: 22,
    fontFamily: fonts.medium.regular,
  },
  tradeDescriptionBold: {
    color: '#4a4a4a',
    fontFamily: fonts.bold.regular,
  },
  tradeSummary: {
    color: '#d61b38',
    textAlign: 'center',
    marginEnd: 17,
    marginStart: 17,
    fontFamily: fonts.medium.regular,
    fontSize: 14,
    marginBottom: 17,
  },
  tradeSummaryPrice: {
    color: '#d61b38',
    fontFamily: fonts.bold.regular,
    fontSize: 22,
  },
});

class TradeReportRating extends Component {
  render() {
    const {
      trade,
      partnerName,
      isUserBuying,
      user,
    } = this.props;
    if (!trade) return null;
    const operationPrefix = isUserBuying ? 'Buy' : 'Sell';
    const currencyCode = trade.ad.currency_code || '';
    const cryptoCurrencyCode = trade.ad.crypto_currency_code || '';
    let paymentMethodCode = '...';
    if (trade && trade.ad && trade.ad.payment_method_code) {
      paymentMethodCode = trade.ad.payment_method_code;
    }
    const transactionId = trade.ad.id || '';
    const cryptoValue = `${Price.build(trade.amount).viewCrypto} ${cryptoCurrencyCode}`;
    const priceValue = `${Price.build(trade.amount * trade.price).viewMain} ${currencyCode}`;
    const send = isUserBuying ? priceValue : cryptoValue;
    const received = isUserBuying ? cryptoValue : priceValue;
    let date = '--.--.--';
    let time = '--:-- (MSK)';
    try {
      const paidConfirmedAt = moment(trade.paid_confirmed_at).utcOffset('+0300');
      if (paidConfirmedAt.isValid()) {
        date = paidConfirmedAt.format('DD.MM.YYYY');
        time = `${paidConfirmedAt.format('HH:mm')} (MSK)`;
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>
            {getTradeTitle(trade.status, trade.ad.payment_method_code).toUpperCase()}
          </Text>
          <Text style={styles.tradeDescription}>
            {`${operationPrefix} via ${paymentMethodCode} cryptocurrency\ntrader `}
            <Text style={styles.tradeDescriptionBold}>
              {partnerName}
            </Text>
          </Text>
          <Text style={styles.tradeSummary}>
            <Text style={styles.tradeSummaryPrice}>
              {received}
            </Text>
            <Text>
              {' for '}
            </Text>
            <Text style={styles.tradeSummaryPrice}>
              {send}
            </Text>
          </Text>
          {
            isTradeComplete(trade.status) && (
              <TransactionDetails
                transactionId={transactionId}
                received={received}
                send={send}
                date={date}
                time={time}
              />
            )
          }
          {
            trade.feedback_allowed && (
              <Feedback
                feedback={trade.feedbacks[user.id]}
                trade={trade}
              />
            )
          }
        </ScrollView>
      </View>
    );
  }
}

TradeReportRating.propTypes = {
  trade: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  partnerName: PropTypes.string,
  isUserBuying: PropTypes.bool,
  user: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default TradeReportRating;
