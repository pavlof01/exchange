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
    borderBottomWidth: 1,
    borderBottomColor: '#d5d5d5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
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
    const { settingsItemContainer, text, arrow } = styles;
    const {
      styleContainer, textStyle, value, onValueChange,
    } = this.props;
    return (
      <View style={[settingsItemContainer, styleContainer]}>
        <View>
          <Text style={[text, textStyle]}>
            {this.props.text}
          </Text>
        </View>
        <View>
          <Switch value={value} onValueChange={onValueChange} />
        </View>
      </View>
    );
  }
}

SettingsItem.propTypes = {
  text: PropTypes.string,
  textStyle: PropTypes.object,
  styleContainer: PropTypes.object,
};

export default SettingsItem;
