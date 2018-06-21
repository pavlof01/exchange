import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Touchable from '../Touchable';
import BorderlessButton from "../BorderlessButton";

const styles = StyleSheet.create({
    centerContent: {
        flex: 1,
        flexDirection: 'column',
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
        <View style={styles.centerContent}>
          <Text style={{margin: 16, fontSize: 24}}>Hello, {this.props.user.user_name}!</Text>
            <BorderlessButton
                onPress={this.onLogoutPressed}
                title={'Logout'}
            />
        </View>
    )
  }
}

Settings.propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func,
};