import React, { Component } from 'react';
import {
  View, Text, StyleSheet, Image, TouchableOpacity, AsyncStorage,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ModalDialog from '../../style/ModalDialog';

const PASSCODE_LENGTH = 4;

export default class Pincode extends Component {
  static navigationOptions = { header: props => null };

  constructor(props) {
    super(props);
    this.state = {
      passcode: '',
      confirm: false,
      openModal: false,
      textModal: '',
      deletePasscode: false,
    };
  }

  componentWillMount() {
    this.checkPasscode();
  }

  checkPasscode = async () => {
    const passcode = await AsyncStorage.getItem('passcode');
    if (passcode) {
      this.setState({ deletePasscode: true });
    }
  }

  setPasscode = (num) => {
    if (this.state.passcode.length < PASSCODE_LENGTH) {
      let passcode = this.state.passcode;
      passcode += num;
      this.setState({ passcode }, () => {
        if (this.state.passcode.length >= PASSCODE_LENGTH && this.state.deletePasscode) {
          this.deletePasscode();
        } else if (this.state.passcode.length >= PASSCODE_LENGTH && !this.state.confirm) {
          this.savePasscode();
        } else if (this.state.passcode.length >= PASSCODE_LENGTH && this.state.confirm) {
          this.compareAndSave();
        }
      });
    }
  }

  delete = () => {
    if (this.state.passcode.length > 0 < PASSCODE_LENGTH) {
      const passcode = String(this.state.passcode);
      const newPin = passcode.slice(0, -1);
      this.setState({ passcode: newPin });
    }
  }

  savePasscode = async () => {
    await AsyncStorage.setItem('passcode', this.state.passcode);
    this.setState({ passcode: '', confirm: true });
  }

  compareAndSave = async () => {
    const passcode = await AsyncStorage.getItem('passcode');
    const confirmPasscode = this.state.passcode;
    if (passcode == confirmPasscode) {
      this.setState({ openModal: true, textModal: 'passcode set' });
    } else {
      AsyncStorage.removeItem('passcode');
      this.setState({ openModal: true, textModal: 'wrong passcode' });
    }
  }

  deletePasscode = async () => {
    const passcode = await AsyncStorage.getItem('passcode');
    const confirmPasscode = this.state.passcode;
    if (passcode == confirmPasscode) {
      AsyncStorage.removeItem('passcode');
      this.setState({ openModal: true, textModal: 'passcode deleted' });
    } else {
      this.setState({ openModal: true, textModal: 'wrong passcode' });
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
          {this.state.confirm ? 'CONFIRM PASSCODE' : 'PASSCODE'}
        </Text>
        <View style={styles.circleContainer}>
          <View style={this.state.passcode.length > 0 ? styles.circleFill : styles.circle} />
          <View style={this.state.passcode.length > 1 ? styles.circleFill : styles.circle} />
          <View style={this.state.passcode.length > 2 ? styles.circleFill : styles.circle} />
          <View style={this.state.passcode.length > 3 ? styles.circleFill : styles.circle} />
        </View>
        <View style={styles.numbersContainer}>
          <View style={styles.row}>
            <TouchableOpacity onPress={() => this.setPasscode('1')} style={styles.circleNumber}>
              <Text style={styles.numberText}>
                1
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setPasscode('2')} style={styles.circleNumber}>
              <Text style={styles.numberText}>
                2
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setPasscode('3')} style={styles.circleNumber}>
              <Text style={styles.numberText}>
                3
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity onPress={() => this.setPasscode('4')} style={styles.circleNumber}>
              <Text style={styles.numberText}>
                4
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setPasscode('5')} style={styles.circleNumber}>
              <Text style={styles.numberText}>
                5
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setPasscode('6')} style={styles.circleNumber}>
              <Text style={styles.numberText}>
                6
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity onPress={() => this.setPasscode('7')} style={styles.circleNumber}>
              <Text style={styles.numberText}>
                7
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setPasscode('8')} style={styles.circleNumber}>
              <Text style={styles.numberText}>
                8
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setPasscode('9')} style={styles.circleNumber}>
              <Text style={styles.numberText}>
                9
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <View style={styles.empty} />
            <TouchableOpacity onPress={() => this.setPasscode('0')} style={styles.circleNumber}>
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
