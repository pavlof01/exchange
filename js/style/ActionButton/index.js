import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ColorPropType,
  StyleSheet,
  Text,
  View,
  ViewPropTypes,
} from 'react-native';
import Touchable from '../Touchable/index';
import { fonts } from '../resourceHelpers';

const sharedButtonStyle = {
  /*shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowRadius: 4,
  shadowOpacity: 1.0,
  elevation: 4,
  borderWidth: 2,
  borderRadius: 4,*/
  height: 48,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
};

const sharedTextStyle = {
  textAlign: 'center',
  alignSelf: 'center',
  paddingTop: 6,
  fontSize: 16,
  lineHeight: 16,
  fontWeight: '700',
  fontFamily: fonts.regular.regular,
};

const styles = StyleSheet.create({
  button: {
    ...sharedButtonStyle,
    backgroundColor: '#25367e',
    justifyContent: 'center',
  },
  buttonSecondary: {
    ...sharedButtonStyle,
    backgroundColor: 'white',
    borderColor: '#25367e',
    borderWidth: 1,
  },
  buttonDisabled: {
    ...sharedButtonStyle,
    backgroundColor: '#DDD',

  },
  text: {
    ...sharedTextStyle,
    color: '#fff',
  },
  textSecondary: {
    ...sharedTextStyle,
    color: '#25367e',
  },
  textDisabled: {
    ...sharedTextStyle,
    color: '#c0c0c0',
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
    children: PropTypes.any, // eslint-disable-line react/forbid-prop-types
    /**
     * Children.
     */
    secondary: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.onPress = this.onPress.bind(this);
  }

  onPress(event) {
    const {
      onPress,
    } = this.props;
    if (typeof onPress === 'function') {
      onPress(event);
    }
  }

  render() {
    const {
      accessibilityLabel,
      color,
      children,
      title,
      disabled,
      secondary,
      testID,
      style,
      fontStyle,
    } = this.props;
    const secondaryButtonStyles = secondary ? styles.buttonSecondary : styles.button;
    const buttonStyles = [disabled ? styles.buttonDisabled : secondaryButtonStyles, style];
    const secondaryTextStyles = secondary ? styles.textSecondary : styles.text;
    const textStyles = [disabled ? styles.textDisabled : secondaryTextStyles, fontStyle];
    if (color) {
      buttonStyles.push({ borderColor: color, backgroundColor: color });
    }

    const content = children || (
      <Text style={textStyles}>
        {title}
      </Text>
    );
    return (
      <View style={{ flex: style ? style.flex : 1 }}>
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
      </View>
    );
  }
}

export default PrimaryButton;
