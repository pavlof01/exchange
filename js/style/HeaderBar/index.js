import React from 'react';
import {
  Platform,
  StyleSheet, Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { fonts } from '../resourceHelpers';
import Touchable from '../Touchable';

const isAndroid = Platform.OS === 'android';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: isAndroid ? 0 : 10,
  },
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
  image: {
    backgroundColor: '#243682',
    position: 'absolute',
    right: 20,
  },
});

class HeaderBar extends React.Component {
  static propTypes = {
    /**
     * Title text.
     */
    title: PropTypes.string,
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={[isAndroid ? styles.androidContainer : styles.iosContainer, this.props.style]}>
          {this.props.title}
        </Text>
        <Touchable style={styles.image}>
          {this.props.rightIcon}
        </Touchable>
      </View>
    );
  }
}

export default HeaderBar;
