import React, { Component } from 'react';
import PropTypes from "prop-types";
import {
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

const errorRed = '#dd0057';

/**
 * A text input component for login scene.
 */
class FormTextInput extends Component {

  static propTypes = {
    /**
     * If true, render input with red colors.
     */
    error: PropTypes.bool,
    /**
     * Used to locate this view in end-to-end tests.
     */
    testID: PropTypes.string,
    /**
     * Styles.
     */
    style: View.propTypes.style,
  };

  focus() {
    this.textInput.focus();
  }

  render() {
    const {
      style,
      error,
    } = this.props;
    const containerStyles = [style, styles.container];
    const textStyles = [styles.text];
    if (error) {
      containerStyles.push({ borderColor: errorRed });
    }
    if (error) {
      textStyles.push({ color: errorRed });
    }
    return (
      <View style={containerStyles}>
        <TextInput
          {...this.props}
          keyboardType='default'
          style={textStyles}
          keyboardAppearance="dark"
          placeholderColor="#474747"
          underlineColorAndroid="rgba(255, 255, 255, 0.0)"
          ref={(input) => { this.textInput = input; }}
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: 'rgba(48, 48, 48, 0.35)',
    borderStyle: 'solid',
    marginBottom: 15,
  },
  text: {
    color: '#000',
    textAlign: 'left',
    fontSize: 14,
    height: 30,
    padding: 4,
  },
});

export default FormTextInput;
