import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  ActivityIndicator,
  Text,
  Image,
  View,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  centerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
});

export default class QRCode extends Component {
  static propTypes = {
    transactionTokens: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  };

  render() {
    const { transactionTokens } = this.props;

    let content = null;
    if (transactionTokens && transactionTokens.generation_pending) {
      content = (<ActivityIndicator size="large" />);
    } else if (transactionTokens && transactionTokens.data && transactionTokens.data.length > 0) {
      const base64code = transactionTokens.data[0].qr_code.replace(/\n/g, '');
      content = (
        <Image
          source={{ uri: `data:image/png;base64, ${base64code}` }}
          style={{ width: 174, height: 178 }}
        />
      );
    } else {
      content = (
        <Text>
          You don't have any active addresses
        </Text>
      );
    }

    return (
      <View style={styles.centerContent}>
        {content}
      </View>
    );
  }
}
