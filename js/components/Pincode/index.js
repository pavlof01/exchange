import React, { Component } from 'react';
import {
  View, Text, StyleSheet, Image, TouchableOpacity, AsyncStorage,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ModalDialog from '../../style/ModalDialog';

export default class Pincode extends Component {
  static navigationOptions = { header: props => null };
  constructor(props) {
    super(props);
    this.state = {
      pincode: '',
      confirm: false,
      openModal: false,
      textModal: '',
      deletePincode: false,
    };
  }

  componentWillMount() {
    this.checkPasscode();
  }

  checkPasscode = async () => {
    const passcode = await AsyncStorage.getItem('pincode');
    if (passcode) {
      this.setState({ deletePincode: true });
    }
  }

  setPincode = (num) => {
    if (this.state.pincode.length < 4) {
      let pincode = this.state.pincode;
      pincode += num;
      this.setState({ pincode }, () => {
        if (this.state.pincode.length >= 4 && this.state.deletePincode) {
          this.deletePincode();
        } else if (this.state.pincode.length >= 4 && !this.state.confirm) {
          this.savePincode();
        } else if (this.state.pincode.length >= 4 && this.state.confirm) {
          this.compareAndSave();
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

  savePincode = async () => {
    await AsyncStorage.setItem('pincode', this.state.pincode);
    this.setState({ pincode: '', confirm: true });
  }

  compareAndSave = async () => {
    const pincode = await AsyncStorage.getItem('pincode');
    const confirmPincode = this.state.pincode;
    if (pincode == confirmPincode) {
      this.setState({ openModal: true, textModal: 'pincode set' });
    } else {
      AsyncStorage.removeItem('pincode');
      this.setState({ openModal: true, textModal: 'wrong pincode' });
    }
  }

  deletePincode = async () => {
    const pincode = await AsyncStorage.getItem('pincode');
    const confirmPincode = this.state.pincode;
    //console.warn(pincode == confirmPincode);
    if (pincode == confirmPincode) {
      AsyncStorage.removeItem('pincode');
      this.setState({ openModal: true, textModal: 'pincode deleted' });
    } else {
      this.setState({ openModal: true, textModal: 'wrong pincode' });
    }
  }

  render() {
    return (
      <LinearGradient
        colors={['#3F579E', '#426CA6', '#426CA6', '#384D8C', '#203057']}
        style={[styles.paddingScreen]}
      >
        <ModalDialog
          title={this.state.textModal.toUpperCase()}
          isOpen={this.state.openModal}
          noCancel
          onPositivePress={() => this.setState({ openModal: false }, () => this.props.navigation.goBack())}
        />
        <Image style={styles.logo} source={require('../../img/bitpapa.png')} />
        <Text style={styles.pincode}>
          {this.state.confirm ? 'CONFIRM PINCODE' : 'PIN CODE'}
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