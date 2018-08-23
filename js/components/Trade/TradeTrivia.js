import React from 'react';
import {
  StyleSheet, Text,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  info: {
    backgroundColor: 'white',
    margin: 8,
    padding: 8,
    borderRadius: 4,
  },
});

class TradeTrivia extends React.Component {
  render() {
    /* eslint-disable  */
    const { ad } = this.props;

    return ad.conditions ?
      <View style={styles.info}>
        <Text>
          Условия сделки:
          </Text>
        <Text>
          {ad.conditions}
        </Text>
      </View> : null;
    /* eslint-enable  */
  }
}

export default TradeTrivia;
