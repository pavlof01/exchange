import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Modal,
  Button,
} from 'react-native';
import { createBasicNavigationOptions } from '../../../style/navigation';
import FormTextInput from '../../FormTextInput';
import SettingsItem from '../SettingsItem';
import PrimaryButton from '../../../style/ActionButton';
import { fonts } from '../../../style/resourceHelpers';

export default class PhoneVerify extends Component {
  static navigationOptions = createBasicNavigationOptions('PHONE NUMBER');

  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
      showMessage: false,
    };
  }

  showMessage = (visible) => {
    this.setState({ showMessage: visible });
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.text1}>
              {'Verify your phone number'}
            </Text>
            <Text style={styles.text2}>
              {'to increase account security'}
            </Text>
          </View>
          <SettingsItem styleContainer={{ borderTopWidth: 1, borderTopColor: '#d5d5d5', }} text="Country" />
          <FormTextInput
            onChangeText={phoneNumber => this.setState({ phoneNumber })}
            value={this.state.phoneNumber}
            textStyle={this.state.phoneNumber.length !== 0 ? styles.text1 : styles.placeholderText}
            style={styles.input}
            placeholder="Phone number" />
          <PrimaryButton
            style={styles.saveBtn}
            onPress={() => this.showMessage(true)}
            title="NEXT"
          >
            {this.props.isFetching ?
              <ActivityIndicator size="large" />
              :
              undefined}
          </PrimaryButton>
          <Modal
            visible={this.state.showMessage}
            ref={ref => { this.modal = ref; }}
            animationType="fade"
            transparent
            onRequestClose={this.onRequestClose}
          >
            <View style={styles.modalShade}>
              <View style={styles.dialogContainer}>
                <View style={styles.headerContainer}>
                  <Text>
                    Thank you!
                  </Text>
                  <Text>
                    Verification code sent to you
                  </Text>
                </View>
                <View style={styles.buttonGroup}>
                  <Button
                    color="#2c09a3"
                    onPress={() => this.showMessage(false)}
                    title="OK"
                    style={styles.positiveButton}
                  />
                </View>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },
  scrollContainer: {
    paddingLeft: 25,
    paddingRight: 25,
    flex: 1,
  },
  titleContainer: {
    marginTop: 50,
    alignItems: 'center',
    marginBottom: 50,
  },
  text1: {
    fontSize: 18,
    fontFamily: fonts.bold.regular,
    color: '#4a4a4a',
  },
  text2: {
    fontSize: 18,
    fontFamily: fonts.regular.regular,
    color: '#4a4a4a',
    marginTop: 10,
  },
  placeholderText: {
    fontSize: 18,
    fontFamily: fonts.regular.regular
  },
  input: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  saveBtn: {
    marginTop: 70,
    width: '50%',
    alignSelf: 'center',
  },
  modalShade: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  dialogContainer: {
    flex: 1,
    height: '100%',
    flexDirection: "column",
    backgroundColor: "white",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    marginTop: 250,
    marginBottom: 250,
  },
  headerContainer: {
  },
  dialogTitle: {
    flex: 1,
    color: '#9b9b9b',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 16,
    marginBottom: 16,
    fontFamily: fonts.bold.regular,
  },
  dialogMessage: {
    flex: 1,
    color: '#444444',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 16,
    marginBottom: 16,
    fontFamily: fonts.bold.regular,
  },
  buttonGroup: {
    width: '40%',
    flexDirection: 'row',
    shadowOffset: {
      width: 0,
      height: 4
    },
    backgroundColor: '#fff',
    shadowRadius: 2,
    shadowOpacity: 1,
    shadowColor: 'rgba(44, 23, 160, 0.3)',
    justifyContent: 'center',
  },
  positiveButton: {
    width: '100%',
    height: '100%',
    padding: 16,
    backgroundColor: "#fff",
  },
});
