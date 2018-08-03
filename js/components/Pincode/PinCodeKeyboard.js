import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PinCodeNumberButton from './PinCodeNumberButton';

const styles = StyleSheet.create({
  paddingScreen: {
    padding: 42,
    flexDirection: 'column',
    flex: 1,
  },
  logo: {
    alignSelf: 'center',
    marginTop: 20,
  },
  pincode: {
    textAlign: 'center',
    color: '#f2f6f9',
    fontSize: 18,
    fontWeight: '400',
    marginTop: 30,
  },
  circleContainer: {
    flexDirection: 'row',
    width: 150,
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginTop: 30,
  },
  circle: {
    width: 20,
    height: 20,
    backgroundColor: '#94b7ff',
    borderRadius: 10,
  },
  circleFill: {
    width: 20,
    height: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  numbersContainer: {
    marginTop: 30,
    flex: 1,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  empty: {
    width: 70,
    height: 70,
    margin: 10,
  },
  delete: {
    width: 70,
    height: 70,
    borderRadius: 35,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class PinCodeKeyboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pinCode: '',
    };
  }

  addPincodeSign = (num) => {
    const {
      pinCode,
    } = this.state;
    if (pinCode.length < 4) {
      this.setState({ pinCode: pinCode + num }, this.checkIsPinCodeFilled);
    }
  };

  setPincode = (pincode) => {
    this.setState({ pinCode: pincode }, this.checkIsPinCodeFilled);
  };

  checkIsPinCodeFilled = () => {
    const {
      pinCode,
    } = this.state;
    const {
      onPinCodeFilled,
    } = this.props;
    if (pinCode.length >= 4 && typeof onPinCodeFilled === 'function') {
      onPinCodeFilled(pinCode);
    }
  };

  render() {
    const {
      pinCode,
    } = this.state;
    const {
      title,
    } = this.props;
    return (
      <React.Fragment>
        <LinearGradient
          colors={['#3F579E', '#426CA6', '#426CA6', '#384D8C', '#203057']}
          style={[styles.paddingScreen]}
        >
          <Image style={styles.logo} source={require('../../img/bitpapa.png')} />
          <Text style={styles.pincode}>
            {title}
          </Text>
          <View style={styles.circleContainer}>
            <View style={pinCode.length > 0 ? styles.circleFill : styles.circle} />
            <View style={pinCode.length > 1 ? styles.circleFill : styles.circle} />
            <View style={pinCode.length > 2 ? styles.circleFill : styles.circle} />
            <View style={pinCode.length > 3 ? styles.circleFill : styles.circle} />
          </View>
          <View style={styles.numbersContainer}>
            <View style={styles.row}>
              <PinCodeNumberButton onPress={() => this.addPincodeSign('1')} value="1" />
              <PinCodeNumberButton onPress={() => this.addPincodeSign('2')} value="2" />
              <PinCodeNumberButton onPress={() => this.addPincodeSign('3')} value="3" />
            </View>
            <View style={styles.row}>
              <PinCodeNumberButton onPress={() => this.addPincodeSign('4')} value="4" />
              <PinCodeNumberButton onPress={() => this.addPincodeSign('5')} value="5" />
              <PinCodeNumberButton onPress={() => this.addPincodeSign('6')} value="6" />
            </View>
            <View style={styles.row}>
              <PinCodeNumberButton onPress={() => this.addPincodeSign('7')} value="7" />
              <PinCodeNumberButton onPress={() => this.addPincodeSign('8')} value="8" />
              <PinCodeNumberButton onPress={() => this.addPincodeSign('9')} value="9" />
            </View>
            <View style={styles.row}>
              <View style={styles.empty} />
              <PinCodeNumberButton onPress={() => this.addPincodeSign('0')} value="0" />
              <TouchableOpacity onPress={this.delete} style={styles.delete}>
                <Image source={require('../../img/delete.png')} />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </React.Fragment>
    );
  }
}

PinCodeKeyboard.propTypes = {
  title: PropTypes.string,
  onPinCodeFilled: PropTypes.func,
};

export default PinCodeKeyboard;
