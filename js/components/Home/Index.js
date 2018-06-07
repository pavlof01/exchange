import React, { Component } from 'react';

import {
    Text,
    View,
    TouchableOpacity,
} from 'react-native';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.onLogoutPressed = this.onLogoutPressed.bind(this);

    }
  onLogoutPressed() {
    this.props.logout();
  }
  render() {
    return (
        <View>
          <Text>Hello! {this.props.user.user_name}</Text>
            <TouchableOpacity
                onPress={this.onLogoutPressed}
            >
                <View>
                    <Text>L O G O U T</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
  }
}