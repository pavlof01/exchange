import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  Switch,
} from 'react-native';
import { fonts } from '../../style/resourceHelpers';

const styles = StyleSheet.create({
  settingsItemContainer: {
    paddingBottom: 20,
    paddingTop: 20,
    marginStart: 17,
    marginEnd: 17,
    borderBottomWidth: 1,
    borderBottomColor: '#d5d5d5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: '#000000',
    fontSize: 17,
    lineHeight: 18,
    fontFamily: fonts.regular.regular,
    letterSpacing: 0.2,
  },
});

class SettingsItem extends Component {
  render() {
    const {
      text,
      styleContainer,
      textStyle,
      value,
      onValueChange,
    } = this.props;
    return (
      <View style={[styles.settingsItemContainer, styleContainer]}>
        <Text style={[styles.text, textStyle]}>
          {text}
        </Text>
        <Switch value={value} onValueChange={onValueChange} />
      </View>
    );
  }
}

SettingsItem.propTypes = {
  text: PropTypes.string,
  textStyle: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  styleContainer: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  value: PropTypes.bool,
  onValueChange: PropTypes.func,
};

export default SettingsItem;
