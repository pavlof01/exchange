import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
} from 'react-native';
import { fonts } from '../../style/resourceHelpers';
import Touchable from '../../style/Touchable';

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
    height: 18,
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
    const { styleContainer, textStyle } = this.props;
    return (
      <Touchable onPress={this.props.onPress}>
        <View style={[settingsItemContainer, styleContainer]}>
          <View>
            <Text style={[text, textStyle]}>
              {this.props.text}
            </Text>
          </View>
          <View>
            <Image style={arrow} source={require('../../img/ic_picker.png')} />
          </View>
        </View>
      </Touchable>
    );
  }
}

SettingsItem.propTypes = {
  text: PropTypes.string,
  textStyle: PropTypes.object,
  styleContainer: PropTypes.object,
};

export default SettingsItem;
