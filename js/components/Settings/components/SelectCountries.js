import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createBasicNavigationOptions } from '../../../style/navigation';

export default class SelectCountries extends Component {
  static navigationOptions = createBasicNavigationOptions('SELECT COUNTRY');
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text>
          SelectCountries
        </Text>
      </View>
    );
  }
}
