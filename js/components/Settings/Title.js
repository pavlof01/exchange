import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  StyleSheet,
} from 'react-native';
import { fonts } from '../../style/resourceHelpers';

const styles = StyleSheet.create({
  text: {
    color: '#9b9b9b',
    marginEnd: 17,
    marginStart: 17,
    marginTop: 16,
    paddingBottom: 3,
    marginBottom: 3,
    fontSize: 16,
    fontFamily: fonts.bold.regular,
    borderBottomColor: '#D5D5D5',
    borderBottomWidth: 1,
  },
});

class Title extends React.PureComponent {
  render() {
    const {
      textStyle,
      text,
    } = this.props;
    return (
      <Text style={[styles.text, textStyle]}>
        {text || 'Your TEXT'}
      </Text>
    );
  }
}

Title.propTypes = {
  text: PropTypes.string,
  textStyle: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default Title;
