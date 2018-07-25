import React, { Component } from "react";
import PropTypes from 'prop-types';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";
import { fonts } from '../../style/resourceHelpers';

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
    } = this.props;
    let operationPrefix = isUserBuying ? 'Buy' : 'Sell';
    let paymentMethodCode = "...";
    if (trade && trade.ad && trade.ad.payment_method_code) {
      paymentMethodCode = trade.ad.payment_method_code;
    }
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>{'Transaction complete'.toUpperCase()}</Text>
          <Text style={styles.tradeDescription}>{`${operationPrefix} via ${paymentMethodCode} cryptocurrency\ntrader `}<Text style={styles.tradeDescriptionBold}>{partnerName}</Text></Text>
          <Text style={styles.tradeSummary}>
            <Text style={styles.tradeSummaryPrice}>0.22124 BTC</Text>
            <Text> for </Text>
            <Text style={styles.tradeSummaryPrice}>100000 RUR</Text>
          </Text>

          <Text style={styles.title}>{'Leave a rating for the trader'.toUpperCase()}</Text>
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
