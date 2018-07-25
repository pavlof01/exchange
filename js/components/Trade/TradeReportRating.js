import React, { Component } from "react";
import PropTypes from 'prop-types';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";
import moment from 'moment';
import { fonts } from '../../style/resourceHelpers';
import Price from "../../values/Price";

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
  transactionDetailsBox: {
    backgroundColor: '#f2f6f9',
    paddingTop: 16,
    paddingBottom: 16,
    paddingStart: 17,
    paddingEnd: 17,
  },
  transactionNumber: {
    fontFamily: fonts.medium.regular,
    fontSize: 14,
    color: '#000000',
    marginBottom: 3,
    lineHeight: 22,
  },
  transactionRow: {
    fontFamily: fonts.medium.regular,
    fontSize: 14,
    color: '#000000',
    lineHeight: 22,
  },
});

class TradeReportRating extends Component {
  render() {
    const {
      trade,
      partnerName,
      isUserBuying,
    } = this.props;
    if (!trade) return null;
    const operationPrefix = isUserBuying ? 'Buy' : 'Sell';
    const currencyCode = trade.ad.currency_code || '';
    const cryptoCurrencyCode = trade.ad.crypto_currency_code || '';
    let paymentMethodCode = "...";
    if (trade && trade.ad && trade.ad.payment_method_code) {
      paymentMethodCode = trade.ad.payment_method_code;
    }
    console.warn(JSON.stringify(trade, null, 2));
    const transactionId = trade.ad.id || '';
    const send = `${Price.build(trade.amount).viewCrypto} ${cryptoCurrencyCode}`;
    const received = `${Price.build(trade.amount * trade.price).viewMain} ${currencyCode}`;
    let date = '--.--.--';
    let time = '--:-- (MSK)';
    try {
      const paidConfirmedAt = moment(trade.paid_confirmed_at);
      date = paidConfirmedAt.format('DD.MM.YYYY');
      time = `${paidConfirmedAt.format('HH:mm')} (MSK)`;
    } catch (e) {
    }
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>{'Transaction complete'.toUpperCase()}</Text>
          <Text style={styles.tradeDescription}>{`${operationPrefix} via ${paymentMethodCode} cryptocurrency\ntrader `}<Text style={styles.tradeDescriptionBold}>{partnerName}</Text></Text>
          <Text style={styles.tradeSummary}>
            <Text style={styles.tradeSummaryPrice}>{send}</Text>
            <Text> for </Text>
            <Text style={styles.tradeSummaryPrice}>{received}</Text>
          </Text>
          <View style={styles.transactionDetailsBox}>
            <Text style={styles.transactionNumber}>{`Transaction: №${transactionId}`}</Text>
            <Text style={styles.transactionRow}>{`Received: ${received}`}</Text>
            <Text style={styles.transactionRow}>{`Send: ${send}`}</Text>
            <Text style={styles.transactionRow}>{`Date: ${date}`}</Text>
            <Text style={styles.transactionRow}>{`Time: ${time}`}</Text>
          </View>
          {/*<Text style={styles.title}>{'Leave a rating for the trader'.toUpperCase()}</Text>*/}
        </ScrollView>
      </View>
    );
  }
}

TradeReportRating.propTypes = {
  trade: PropTypes.object,
  partnerName: PropTypes.string,
  isUserBuying: PropTypes.boolean,
};

export default TradeReportRating;
