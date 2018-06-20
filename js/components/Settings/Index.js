import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Touchable from '../Touchable';

const styles = StyleSheet.create({
    centerContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default class Settings extends Component {

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
                    <Text>Logout</Text>
                </View>
            </Touchable>
        </View>
    )
  }
}

Settings.propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func,
};