import React, { Component } from 'react';
import {
  View, Text, StyleSheet, Image, TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class Pincode extends Component {
  static navigationOptions = { header: props => null };
  constructor(props) {
    super(props);
    this.state = {
      pincode: '',
    };
  }

  setPincode = (num) => {
    if (this.state.pincode.length < 4) {
      let pincode = this.state.pincode;
      pincode += num;
      this.setState({ pincode }, () => console.warn(this.state.pincode));
    }
  }

  delete = () => {
    if (this.state.pincode.length > 0 < 4) {
      const pincode = String(this.state.pincode);
      const newPin = pincode.slice(0, -1);
      this.setState({ pincode: newPin }, () => console.warn(this.state.pincode));
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
        <View style={styles.circleContainer}>
          <View style={this.state.pincode.length > 0 ? styles.circleFill : styles.circle} />
          <View style={this.state.pincode.length > 1 ? styles.circleFill : styles.circle} />
          <View style={this.state.pincode.length > 2 ? styles.circleFill : styles.circle} />
          <View style={this.state.pincode.length > 3 ? styles.circleFill : styles.circle} />
        </View>
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
  circleNumber: {
    width: 70,
    height: 70,
    backgroundColor: 'rgba(148, 183, 255, 0.15)',
    borderRadius: 35,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
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
  numberText: {
    color: '#ffffff',
    fontSize: 36,
  },
});
