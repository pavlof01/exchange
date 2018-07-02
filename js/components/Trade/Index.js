import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    Text,
    View,
    StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
    centerContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default class Trade extends Component {

  render() {
    return (
        <View style={styles.centerContent}>
          <Text>Trades</Text>
        </View>
    )
  }
}