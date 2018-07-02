import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ColorPropType,
  StyleSheet,
  Platform,
  Text,
  View,
  ViewPropTypes,
} from 'react-native';
import Touchable from '../Touchable/index';

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2d18a0',
    borderColor: '#2d18a0',
    borderWidth: 2,
    borderRadius: (Platform.OS === 'ios') ? 4 : 0,
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    borderColor: '#ccc',
    borderWidth: 2,
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textDisabled: {
    textAlign: 'center',
    color: '#c4c4c4',
    fontSize: 17,
    fontWeight: '700',
  },
});

/**
 * A primary button component.
 */
class PrimaryButton extends Component {

  static propTypes = {
    /**
     * Text to display inside the button.
     */
    title: PropTypes.string,
    /**
     * Text to display for blindness accessibility features.
     */
    accessibilityLabel: PropTypes.string,
    /**
     * Color for background of the button.
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
    /**
     * Text styles.
     */
    fontStyle: Text.propTypes.style,
    /**
     * Children.
     */
    children: PropTypes.any,
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
      children,
      title,
      disabled,
      testID,
      style,
      fontStyle,
    } = this.props;
    const buttonStyles = [disabled ? styles.buttonDisabled : styles.button, style];
    const textStyles = [disabled ? styles.textDisabled : styles.text, fontStyle];
    if (color) {
      buttonStyles.push({ borderColor: color, backgroundColor: color });
    }
    const textContent = (
      <Text style={textStyles}>{title}</Text>
    );
    const content = children || textContent;
    return (
      <Touchable
        accessibilityComponentType="button"
        accessibilityLabel={accessibilityLabel}
        testID={testID}
        disabled={disabled}
        onPress={this.onPress}
      >
        <View style={buttonStyles}>
          {content}
        </View>
      </Touchable>
    );
  }
}

export default PrimaryButton;
