import React, { Component } from 'react';
import {
  View, Text, StyleSheet, Image, TouchableOpacity, AsyncStorage, Animated, Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

export default class PincodeAurorization extends Component {
  static navigationOptions = { header: props => null };

  constructor(props) {
    super(props);
    this.state = {
      pincode: '',
      wrongPincode: false,
      left: new Animated.Value(0),
    };
  }

  checkPasscode = async () => {
    const { initialRoute } = this.props;
    const passcode = await AsyncStorage.getItem('pincode');
    if (passcode === this.state.pincode) {
      initialRoute();
    } else {
      this.pincodeAnimation();
      this.setState({ wrongPincode: true }, () => setTimeout(() => {
        this.setState({ wrongPincode: false, pincode: '' });
      }, 2000));
    }
  }

  pincodeAnimation = () => {
    const { left } = this.state;
    Animated.sequence([
      Animated.timing(left, {
        toValue: 10,
        duration: 70,
      }),
      Animated.timing(left, {
        toValue: -10,
        duration: 70,
      }),
      Animated.timing(left, {
        toValue: 10,
        duration: 70,
      }),
      Animated.timing(left, {
        toValue: -10,
        duration: 70,
      }),
      Animated.timing(left, {
        toValue: 0,
        duration: 70,
      }),
    ]).start();
  }

  setPincode = (num) => {
    if (this.state.pincode.length < 4) {
      let pincode = this.state.pincode;
      pincode += num;
      this.setState({ pincode }, () => {
        if (this.state.pincode.length >= 4) {
          this.checkPasscode();
        }
      });
    }
  }

  delete = () => {
    if (this.state.pincode.length > 0 < 4) {
      const pincode = String(this.state.pincode);
      const newPin = pincode.slice(0, -1);
      this.setState({ pincode: newPin });
    }
  }

  render() {
    return (
      <LinearGradient
        colors={['#3F579E', '#426CA6', '#426CA6', '#384D8C', '#203057']}
        style={[styles.paddingScreen]}
      >
        <Image style={styles.logo} source={require('../../img/bitpapa.png')} />
        <Text style={styles.pincode}>
          PIN CODE
        </Text>
        <Animated.View style={[styles.circleContainer, { left: this.state.left }]}>
          <View style={this.state.pincode.length > 0 && !this.state.wrongPincode ? styles.circleFill : this.state.wrongPincode ? styles.circleWrong : styles.circle} />
          <View style={this.state.pincode.length > 1 && !this.state.wrongPincode ? styles.circleFill : this.state.wrongPincode ? styles.circleWrong : styles.circle} />
          <View style={this.state.pincode.length > 2 && !this.state.wrongPincode ? styles.circleFill : this.state.wrongPincode ? styles.circleWrong : styles.circle} />
          <View style={this.state.pincode.length > 3 && !this.state.wrongPincode ? styles.circleFill : this.state.wrongPincode ? styles.circleWrong : styles.circle} />
        </Animated.View>
        <View style={styles.numbersContainer}>
          <View style={styles.row}>
            <TouchableOpacity onPress={() => this.setPincode('1')} style={styles.circleNumber}>
              <Text style={styles.numberText}>
                1
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setPincode('2')} style={styles.circleNumber}>
              <Text style={styles.numberText}>
                2
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setPincode('3')} style={styles.circleNumber}>
              <Text style={styles.numberText}>
                3
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity onPress={() => this.setPincode('4')} style={styles.circleNumber}>
              <Text style={styles.numberText}>
                4
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setPincode('5')} style={styles.circleNumber}>
              <Text style={styles.numberText}>
                5
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setPincode('6')} style={styles.circleNumber}>
              <Text style={styles.numberText}>
                6
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity onPress={() => this.setPincode('7')} style={styles.circleNumber}>
              <Text style={styles.numberText}>
                7
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setPincode('8')} style={styles.circleNumber}>
              <Text style={styles.numberText}>
                8
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setPincode('9')} style={styles.circleNumber}>
              <Text style={styles.numberText}>
                9
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <View style={styles.empty} />
            <TouchableOpacity onPress={() => this.setPincode('0')} style={styles.circleNumber}>
              <Text style={styles.numberText}>
                0
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.delete} style={styles.delete}>
              <Image source={require('../../img/delete.png')} />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  paddingScreen: {
    padding: height / 10,
    flexDirection: 'column',
    width,
    height,
    flexShrink: 1,
  },
  logo: {
    alignSelf: 'center',
    height: height / 12,
    resizeMode: 'contain',
  },
  pincode: {
    textAlign: 'center',
    color: '#f2f6f9',
    fontSize: 18,
    fontWeight: '400',
    marginBottom: height / 30,
    marginTop: height / 30,
  },
  circleContainer: {
    flexDirection: 'row',
    width: 150,
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginBottom: height / 30,
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
  circleRight: {
    width: 20,
    height: 20,
    backgroundColor: 'green',
    borderRadius: 10,
  },
  circleWrong: {
    width: 20,
    height: 20,
    backgroundColor: 'red',
    borderRadius: 10,
  },
  numbersContainer: {
    flex: 1,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  circleNumber: {
    width: height / 9,
    height: height / 9,
    backgroundColor: 'rgba(148, 183, 255, 0.15)',
    borderRadius: height / 18,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty: {
    width: height / 9,
    height: height / 9,
    margin: 10,
  },
  delete: {
    width: height / 9,
    height: height / 9,
    borderRadius: height / 18,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberText: {
    color: '#ffffff',
    fontSize: 36,
  },
});
