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

export default class Trades extends Component {

  render() {
    return (
        <View style={styles.centerContent}>
          <Text style={{margin: 16, fontSize: 24}}>{'Trades TBD\n04.07.2018'}</Text>
        </View>
    )
  }
}