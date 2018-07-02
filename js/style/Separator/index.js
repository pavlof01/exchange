import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  separator: {
    height: 2,
    backgroundColor: '#c3c3c3',
  },
  verticalSeparator: {
      width: 2,
      height: '100%',
      backgroundColor: '#c3c3c3',
  },
});

class Separator extends React.Component {

  static propTypes = {
    /**
     * Color.
     */
    color: PropTypes.string,
    /**
     * Styles.
     */
    style: View.propTypes.style,
    /**
     * Should be vertical
     */
    vertical: PropTypes.bool,
  };

  render() {
    const style = [this.props.vertical ? styles.verticalSeparator : styles.separator];

    if (this.props.color) {
      style.push({ backgroundColor: this.props.color });
    }
    if (this.props.style) {
      style.push(this.props.style);
    }

    return (
      <View style={style} />
    );
  }
}

export default Separator;
