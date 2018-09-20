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
    // marginTop: isAndroid ? 0 : 10,
    backgroundColor: '#2B2B82',
  },
  androidContainer: {
    backgroundColor: '#2B2B82',
    marginTop: 28,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  },
  iosContainer: {
    backgroundColor: '#2B2B82',
    marginTop: 44,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  },
  touchableContainer: {
    backgroundColor: '#2B2B82',
    position: 'absolute',
    right: 0,
    padding: 20,
    paddingRight: 20,
    paddingLeft: 40,
    top: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    backgroundColor: '#2B2B82',
    position: 'absolute',
    right: 0,
    paddingRight: 20,
    paddingLeft: 40,
    paddingBottom: 20,
    top: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: 17,
    fontFamily: 'System',
    letterSpacing: 1,
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
        <View style={[isAndroid ? styles.androidContainer : styles.iosContainer, this.props.style]}>
          <Text style={styles.title}>
            {this.props.title}
          </Text>
        </View>
        {this.props.rightIcon ? (
          <Touchable onPress={this.props.onPress} style={styles.touchableContainer}>
            <View style={styles.imageContainer}>
              {this.props.rightIcon}
            </View>
          </Touchable>
        ) : null}

      </View>
    );
  }
}

export default HeaderBar;
