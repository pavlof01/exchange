import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const styles = StyleSheet.create({
  numberText: {
    color: '#ffffff',
    fontSize: 36,
  },
});

class PinCodeNumberButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handlePress = () => {
    const {
      onPress,
    } = this.props;
    if (typeof onPress === 'function') {
      onPress();
    }
  };

  render() {
    const {
      value,
    } = this.props;
    return (
      <TouchableOpacity
        onPress={this.handlePress}
        style={this.props.style}
      >
        <Text style={styles.numberText}>
          {value}
        </Text>
      </TouchableOpacity>
    );
  }
}

PinCodeNumberButton.propTypes = {
  onPress: PropTypes.func,
  value: PropTypes.string,
};

export default PinCodeNumberButton;
