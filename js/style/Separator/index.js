import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: '#cccccc',
  },
  verticalSeparator: {
    width: 0.5,
    height: 40,
    backgroundColor: '#cccccc',
  },
});

class Separator extends React.Component {
  static propTypes = {
    /**
     * Color.
     */
    color: PropTypes.string,
    /**
     * Should be vertical
     */
    vertical: PropTypes.bool,
    /**
     * Padding between the line and the container
     */
    padding: PropTypes.number,
  };

  render() {
    const style = [this.props.vertical ? styles.verticalSeparator : styles.separator,
      this.props.vertical ? { marginVertical: this.props.padding } : { marginHorizontal: this.props.padding }];

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
