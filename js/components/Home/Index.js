import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    Text,
    View,
} from 'react-native';
import Touchable from '../Touchable';

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
            <Touchable
                onPress={this.onLogoutPressed}
            >
                <View>
                    <Text>L O G O U T</Text>
                </View>
            </Touchable>
        </View>
    )
  }
}

Home.propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func,
};