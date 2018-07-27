import React, { Component } from "react";
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { fonts } from '../../style/resourceHelpers';

const styles = StyleSheet.create({
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

class TransactionDetails extends Component {
  render() {
    const {
      transactionId,
      received,
      send,
      date,
      time,
    } = this.props;
    return (
      <View style={styles.transactionDetailsBox}>
        <Text style={styles.transactionNumber}>{`Transaction: №${transactionId}`}</Text>
        <Text style={styles.transactionRow}>{`Received: ${received}`}</Text>
        <Text style={styles.transactionRow}>{`Send: ${send}`}</Text>
        <Text style={styles.transactionRow}>{`Date: ${date}`}</Text>
        <Text style={styles.transactionRow}>{`Time: ${time}`}</Text>
      </View>
    );
  }
}

TransactionDetails.propTypes = {
  transactionId: PropTypes.string,
  received: PropTypes.string,
  send: PropTypes.string,
  date: PropTypes.string,
  time: PropTypes.string,
};

export default TransactionDetails;
