import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import { fonts } from '../../style/resourceHelpers';
import Touchable from '../../style/Touchable';

const styles = StyleSheet.create({
  container: {
    paddingStart: 17,
    paddingEnd: 17,
  },
  settingsItemContainer: {
    paddingBottom: 20,
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#D5D5D5',
  },
  text: {
    color: '#000000',
    fontSize: 17,
    lineHeight: 18,
    fontFamily: fonts.regular.regular,
    letterSpacing: 0.2,
  },
  arrow: {
    transform: [
      { rotate: '-90deg' },
    ],
  },
});

class SettingsItem extends Component {
  render() {
    const {
      text,
      styleContainer,
      textStyle,
      onPress,
    } = this.props;
    return (
      <Touchable onPress={onPress}>
        <View style={styles.container}>
          <View style={[styles.settingsItemContainer, styleContainer]}>
            <View>
              <Text style={[styles.text, textStyle]}>
                {text}
              </Text>
            </View>
            <View>
              <Image
                style={styles.arrow}
                source={require('../../img/ic_picker.png')}
              />
            </View>
          </View>
        </View>
      </Touchable>
    );
  }
}

SettingsItem.propTypes = {
  text: PropTypes.string,
  textStyle: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  styleContainer: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  onPress: PropTypes.func.isRequired,
};

export default SettingsItem;
