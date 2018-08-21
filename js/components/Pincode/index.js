import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  AsyncStorage,
  Dimensions,
} from 'react-native';
import { injectIntl } from 'react-intl';
import LinearGradient from 'react-native-linear-gradient';
import ModalDialog from '../../style/ModalDialog';
import PinCodeNumberButton from './PinCodeNumberButton';

const PINCODE_LENTH = 4;
const { width, height } = Dimensions.get('window');

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
  delete: {
    width: 70,
    height: 70,
    borderRadius: 35,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goBackContainer: {
    width: height / 9,
    height: height / 9,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(148, 183, 255, 0.15)',
    borderRadius: height / 18,
  },
  goBackText: {
    fontSize: 14,
  },
});

class Pincode extends Component {
  static navigationOptions = { header: () => null };

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
  };

  setPincode = (num) => {
    if (this.state.pincode.length < PINCODE_LENTH) {
      let pincode = this.state.pincode;
      pincode += num;
      this.setState({ pincode }, () => {
        if (this.state.pincode.length >= PINCODE_LENTH && this.state.deletePincode) {
          this.deletePincode();
        } else if (this.state.pincode.length >= PINCODE_LENTH && !this.state.confirm) {
          this.savePincode();
        } else if (this.state.pincode.length >= PINCODE_LENTH && this.state.confirm) {
          this.compareAndSave();
        }
      });
    }
  };

  delete = () => {
    if (this.state.pincode.length > 0 < PINCODE_LENTH) {
      const pincode = String(this.state.pincode);
      const newPin = pincode.slice(0, -1);
      this.setState({ pincode: newPin });
    }
  };

  savePincode = async () => {
    await AsyncStorage.setItem('pincode', this.state.pincode);
    this.setState({ pincode: '', confirm: true });
  };

  compareAndSave = async () => {
    const { intl } = this.props;
    const pincode = await AsyncStorage.getItem('pincode');
    const confirmPincode = this.state.pincode;
    if (pincode === confirmPincode) {
      this.setState({
        openModal: true,
        textModal: intl.formatMessage({ id: 'app.settings.pincode_set', defaultMessage: 'pincode set' }).toUpperCase(),
      });
    } else {
      AsyncStorage.removeItem('pincode');
      this.setState({
        openModal: true,
        textModal: intl.formatMessage({ id: 'app.settings.pincode_wrong', defaultMessage: 'wrong pincode' }).toUpperCase(),
      });
    }
  };

  deletePincode = async () => {
    const { intl } = this.props;
    const pincode = await AsyncStorage.getItem('pincode');
    const confirmPincode = this.state.pincode;
    if (pincode === confirmPincode) {
      AsyncStorage.removeItem('pincode');
      this.setState({
        openModal: true,
        textModal: intl.formatMessage({ id: 'app.settings.pincode_deleted', defaultMessage: 'wrong pincode' }).toUpperCase(),
      });
    } else {
      this.setState({
        openModal: true,
        textModal: intl.formatMessage({ id: 'app.settings.pincode_wrong', defaultMessage: 'wrong pincode' }).toUpperCase(),
      });
    }
  };

  render() {
    const {
      textModal,
      openModal,
      confirm,
      pincode,
    } = this.state;
    const { navigation, intl } = this.props;
    return (
      <LinearGradient
        colors={['#3F579E', '#426CA6', '#426CA6', '#384D8C', '#203057']}
        style={[styles.paddingScreen]}
      >
        <ModalDialog
          title={textModal.toUpperCase()}
          isOpen={openModal}
          noCancel
          onPositivePress={
            () => this.setState(
              { openModal: false },
              () => navigation.goBack(),
            )
          }
        />
        <Image style={styles.logo} source={require('../../img/bitpapa.png')} />
        <Text style={styles.pincode}>
          {confirm
            ? intl.formatMessage({ id: 'app.settings.pincode_confirm', defaultMessage: 'Confrim pincode' }).toUpperCase()
            : intl.formatMessage({ id: 'app.settings.pincode.title', defaultMessage: 'Pin code' }).toUpperCase()}
        </Text>
        <View style={styles.circleContainer}>
          <View style={pincode.length > 0 ? styles.circleFill : styles.circle} />
          <View style={pincode.length > 1 ? styles.circleFill : styles.circle} />
          <View style={pincode.length > 2 ? styles.circleFill : styles.circle} />
          <View style={pincode.length > 3 ? styles.circleFill : styles.circle} />
        </View>
        <View style={styles.numbersContainer}>
          <View style={styles.row}>
            <PinCodeNumberButton style={styles.circleNumber} onPress={() => this.setPincode('1')} value="1" />
            <PinCodeNumberButton style={styles.circleNumber} onPress={() => this.setPincode('2')} value="2" />
            <PinCodeNumberButton style={styles.circleNumber} onPress={() => this.setPincode('3')} value="3" />
          </View>
          <View style={styles.row}>
            <PinCodeNumberButton style={styles.circleNumber} onPress={() => this.setPincode('4')} value="4" />
            <PinCodeNumberButton style={styles.circleNumber} onPress={() => this.setPincode('5')} value="5" />
            <PinCodeNumberButton style={styles.circleNumber} onPress={() => this.setPincode('6')} value="6" />
          </View>
          <View style={styles.row}>
            <PinCodeNumberButton style={styles.circleNumber} onPress={() => this.setPincode('7')} value="7" />
            <PinCodeNumberButton style={styles.circleNumber} onPress={() => this.setPincode('8')} value="8" />
            <PinCodeNumberButton style={styles.circleNumber} onPress={() => this.setPincode('9')} value="9" />
          </View>
          <View style={styles.row}>
            <PinCodeNumberButton fontStyle={styles.goBackText} style={styles.goBackContainer} onPress={() => this.props.navigation.goBack()} value="Отмена" />
            <PinCodeNumberButton style={styles.circleNumber} onPress={() => this.setPincode('0')} value="0" />
            <TouchableOpacity onPress={this.delete} style={styles.delete}>
              <Image source={require('../../img/delete.png')} />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    );
  }
}

export default injectIntl(Pincode);
