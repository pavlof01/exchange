import React, { Component } from 'react';
import {
  StyleSheet, View, ColorPropType, ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';
import BorderlessButton from '../BorderlessButton/index';
import { fonts } from '../resourceHelpers';


const styles = StyleSheet.create({
  topButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontFamily: fonts.bold.regular,
  },
  border: {
    backgroundColor: '#fff',
    width: 40,
    height: 2,
    top: -8,
  },
});

export default class TopButton extends Component {
  static propTypes = {
    /**
     * Text to display inside the button.
     */
    title: PropTypes.string.isRequired,
    /**
     * Color for border and text inside the button.
     */
    color: ColorPropType,
    /**
     * Selected text color
     */
    selectedColor: ColorPropType,
    /**
     * If true, disable all interactions for this component and highlight it.
     */
    selected: PropTypes.bool,
    /**
     * Handler to be called when the user taps the button.
     */
    onPress: PropTypes.func,
    /**
     * Styles.
     */
    style: ViewPropTypes.style,
  };

  render() {
    const selectedColor = this.props.selectedColor || '#fff';
    const color = this.props.color || '#6873a5';

    return (
      <View style={[styles.topButton, this.props.style]}>
        <BorderlessButton
          title={this.props.title}
          onPress={this.props.onPress}
          disabled={this.props.selected}
          color={this.props.selected ? selectedColor : color}
          textStyle={styles.text}
        />
        {this.props.selected ? (<View style={styles.border} />) : null}
      </View>
    );
  }
}
