import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ColorPropType,
  ViewPropTypes,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Touchable from '../Touchable';

const defaultBlue = '#4f88b5';

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    height: 44,
  },
  text: {
    textAlign: 'center',
    color: defaultBlue,
    padding: 8,
    fontSize: 16,
  },
});

/**
 * A basic button component.
 */
class BorderlessButton extends Component {

  static propTypes = {
    /**
     * Text to display inside the button.
     */
    title: PropTypes.string.isRequired,
    /**
     * Text to display for blindness accessibility features.
     */
    accessibilityLabel: PropTypes.string,
    /**
     * Color for border and text inside the button.
     */
    color: ColorPropType,
    /**
     * If true, disable all interactions for this component.
     */
    disabled: PropTypes.bool,
    /**
     * Handler to be called when the user taps the button.
     */
    onPress: PropTypes.func,
    /**
     * Used to locate this view in end-to-end tests.
     */
    testID: PropTypes.string,
    /**
     * Styles.
     */
    style: ViewPropTypes.style,
  };

  constructor(props) {
    super(props);

    this.onPress = this.onPress.bind(this);
  }

  onPress(event) {
    if (typeof this.props.onPress === 'function') {
      this.props.onPress(event);
    }
  }

  render() {
    const {
      accessibilityLabel,
      color,
      title,
      disabled,
      testID,
      style,
    } = this.props;
    const buttonStyles = [style, styles.button];
    const textStyles = [styles.text];
    if (color) {
      textStyles.push({ color });
      buttonStyles.push({ borderColor: color });
    }
    return (
      <Touchable
        accessibilityComponentType="button"
        accessibilityLabel={accessibilityLabel}
        testID={testID}
        disabled={disabled}
        onPress={this.onPress}
      >
        <View style={buttonStyles}>
          <Text style={textStyles}>{title}</Text>
        </View>
      </Touchable>
    );
  }

}

export default BorderlessButton;
