import React, { Component } from 'react';
import PropTypes from "prop-types";
import {
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import _ from 'lodash';
import {fonts} from "../style/resourceHelpers";

const errorRed = '#FF8799';

/**
 * A text input component for login scene.
 */
class FormTextInput extends Component {

  focus() {
    this.textInput.focus();
  }

  render() {
    const {
      error, style, textStyle
    } = this.props;
    const inputProps = _.omit(this.props, error);
    const containerStyles = [styles.container];
    const textStyles = [styles.text, textStyle];
    if (style) {
      containerStyles.push(style);
    }
    if (error) {
      containerStyles.push({ borderColor: errorRed });
    }
    /*if (error) {
      textStyles.push({ color: errorRed });
    }*/
    return (
      <View style={containerStyles}>
        <TextInput
          {...inputProps}
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
    borderStyle: 'solid'
  },
  text: {
    color: '#000',
    textAlign: 'left',
    fontFamily: fonts.regular.regular,
    fontSize: 16,
    height: 32,
    padding: 4,
  },
});

FormTextInput.propTypes = {
    error: PropTypes.bool,
    placeholder: PropTypes.string,
    keyboardType: PropTypes.string,
    value: PropTypes.string,
    onChangeText: PropTypes.func,
    onSubmitEditing: PropTypes.func,
};

export default FormTextInput;
