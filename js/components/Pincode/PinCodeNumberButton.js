import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const styles = StyleSheet.create({
  circleNumber: {
    width: 70,
    height: 70,
    backgroundColor: 'rgba(148, 183, 255, 0.15)',
    borderRadius: 35,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
        style={styles.circleNumber}
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
