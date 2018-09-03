import React from 'react';
import {
  Platform,
  StyleSheet, Text,
} from 'react-native';
import PropTypes from 'prop-types';
import { fonts } from '../resourceHelpers';

const styles = StyleSheet.create({
  androidContainer: {
    backgroundColor: '#243682',
    color: 'white',
    height: 56,
    padding: 14,
    fontSize: 22,
    fontFamily: fonts.semibold.regular,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  },
  iosContainer: {
    backgroundColor: '#243682',
    color: 'white',
    height: 56,
    padding: 24,
    fontSize: 16,
    fontFamily: fonts.semibold.regular,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    letterSpacing: 1,
  },
});


const isAndroid = Platform.OS === 'android';

class HeaderBar extends React.Component {
  static propTypes = {
    /**
     * Title text.
     */
    title: PropTypes.string,
  };

  render() {
    return (
      <Text style={[isAndroid ? styles.androidContainer : styles.iosContainer, this.props.style]}>
        {this.props.title}
      </Text>
    );
  }
}

export default HeaderBar;
