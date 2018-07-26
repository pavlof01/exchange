import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

/**
 * Wrapper for KeyboardAvoidingView that works only on iOS.
 */
class KeyboardAvoidingWrapView extends Component {

  static propTypes = {
    children: PropTypes.any,
    style: PropTypes.any,
  };

  render() {
    const { children, style, ...props } = this.props;
    if (Platform.OS === 'ios') {
      return (
        <KeyboardAvoidingView style={style} {...props}>
          {children}
        </KeyboardAvoidingView>
      );
    }
    return (
      <View style={style} {...props}>
        {children}
      </View>
    );
  }

}

export default KeyboardAvoidingWrapView;
