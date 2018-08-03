import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Image,
  StyleSheet, ActivityIndicator,
  Keyboard,
  ScrollView,
  Dimensions,
} from 'react-native';
import _ from 'lodash';
import LinearGradient from 'react-native-linear-gradient';
import Validator from '../../services/Validator';
import FormTextInput from '../FormTextInput';
import Touchable from '../../style/Touchable';
import PrimaryButton from '../../style/ActionButton';
import { withColoredStatusBar } from '../../style/navigation';
import BorderlessButton from '../../style/BorderlessButton';
import { fonts } from '../../style/resourceHelpers';
import { common } from '../../style/common';

const { width, height } = Dimensions.get('window');
export default class Login extends Component {
  static navigationOptions = { header: props => null };

  constructor(props) {
    super(props);
    this.state = {
      loginValue: '',
      passwordValue: '',
      formError: {},
      textInFocus: false,
    };

    this.onLoginPressed = this.onLoginPressed.bind(this);
    this.onSignUpPressed = this.onSignUpPressed.bind(this);
    this.onRecoverRequestPressed = this.onRecoverRequestPressed.bind(this);
  }

  componentDidMount() {
    this.props.fetchDictionary();
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.formError !== nextProps.formError) {
      this.setState({ formError: { serverError: nextProps.formError } });
    }
  }

  _keyboardDidShow = (e) => {
    this.setState({ textInFocus: true });
    console.warn(e.endCoordinates.height);
    console.warn(e.endCoordinates.width);
  }

  _keyboardDidHide = () => {
    this.setState({ textInFocus: false });
  }

  onLoginPressed() {
    const {
      loginValue,
      passwordValue,
    } = this.state;

    const loginError = new Validator({ presence: true }).validate(loginValue);
    const passwordError = new Validator({ presence: true }).validate(passwordValue);

    const validationErrors = {
      loginError: loginError && (loginError),
      passwordError: passwordError && (passwordError),
    };

    if (!_.every(_.values(validationErrors), value => !value)) {
      this.setState({ formError: validationErrors });
    } else {
      this.props.login({ login: loginValue, password: passwordValue });
    }
  }

  onSignUpPressed() {
    this.props.signUpRequest();
  }

  onRecoverRequestPressed() {
    this.props.recoverPasswordRequest();
  }

  render() {
    return (

      <LinearGradient
        colors={['#3F579E', '#426CA6', '#426CA6', '#384D8C', '#203057']}
        style={[styles.paddingScreen]}
      >
        <ScrollView contentContainerStyle={styles.scrollView} bounces={false}>
          <View style={styles.logoContainer}>
            <Image
              style={this.state.textInFocus ? styles.logoStylesOnKeyboardShow : styles.logo}
              source={require('../../img/logo.png')}
            />
            <Image
              style={this.state.textInFocus ? styles.textLogoStylesOnKeyboardShow : null}
              source={require('../../img/logo_text.png')}
            />
          </View>
          <View style={{ flex: 1 }}>
            <KeyboardAvoidingView behavior="padding">
              <View style={{ paddingLeft: 42, paddingRight: 42 }}>
                <FormTextInput
                  style={styles.textInputContainer}
                  textStyle={styles.textInput}
                  key="login"
                  error={!_.isEmpty(this.state.formError.loginError)}
                  ref={ref => (this.loginInput = ref)}
                  placeholder="Enter username"
                  placeholderTextColor="#B8CFFF"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={(login) => {
                    this.setState({ loginValue: login });
                  }}
                  onSubmitEditing={() => {
                    this.passwordInput.focus();
                  }}
                />
                <Text style={[styles.error]}>
                  {this.state.formError.loginError}
                </Text>
                <FormTextInput
                  style={styles.textInputContainer}
                  textStyle={styles.textInput}
                  key="pass"
                  error={!_.isEmpty(this.state.formError.passwordError)}
                  ref={ref => (this.passwordInput = ref)}
                  placeholder="Enter password"
                  placeholderTextColor="#B8CFFF"
                  secureTextEntry
                  onChangeText={(password) => {
                    this.setState({ passwordValue: password });
                  }}
                  onSubmitEditing={this.onLoginPressed}
                />
                <View style={{ alignItems: 'flex-end' }}>
                  <BorderlessButton
                    textStyle={styles.forgetPasswordText}
                    onPress={this.onRecoverRequestPressed}
                    title="Forgot password?"
                  />
                </View>
                <Text style={[styles.error]}>
                  {this.state.formError.passwordError}
                </Text>
                <Text style={[styles.error]}>
                  {this.state.formError.serverError}
                </Text>
              </View>
            </KeyboardAvoidingView>
          </View>
          <View style={styles.bottom}>
            <PrimaryButton
              style={styles.signInBtn}
              onPress={this.onLoginPressed}
              title="SIGN IN"
              disabled={this.props.isFetching}
            >
              {this.props.isFetching
                ? <ActivityIndicator size="large" />
                : undefined}
            </PrimaryButton>
            <View style={styles.signUpContainer}>
              <Text style={styles.textSignUp}>
                Don’t have an accaunt?
              </Text>
              <Touchable onPress={this.onSignUpPressed}>
                <Text style={styles.btnSignUp}>
                  Sign up
                </Text>
              </Touchable>
            </View>
            <Touchable style={{ marginTop: 50 }}>
              <Text style={styles.loginQR}>
                LOGIN WITH QR CODE
              </Text>
            </Touchable>
          </View>
        </ScrollView>
      </LinearGradient>

    );
  }
}

const styles = StyleSheet.create({
  error: {
    color: '#FFCACA',
    marginBottom: 2,
    marginTop: 2,
    fontFamily: fonts.regular.regular,
    textAlign: 'center',
  },
  paddingScreen: {
    flexDirection: 'column',
    /* height,
    minHeight: height, */
    height,
  },
  scrollView: {
    height,
    /* height,
    minHeight: height, */
    justifyContent: 'space-between',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: '10%',
    flex: 1,
  },
  logo: {
    marginBottom: 10,
  },
  logoStylesOnKeyboardShow: {
    opacity: 0.5,
    transform: [
      { scale: 0.5 },
    ],
  },
  textLogoStylesOnKeyboardShow: {
    opacity: 0.5,
    transform: [
      { scale: 0.5 },
      { translateY: -40 },
    ],
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textInputContainer: {
    borderColor: '#94B7FF',
  },
  textInput: {
    color: '#fff',
    fontSize: 18,
  },
  forgetPasswordText: {
    fontWeight: '400',
    color: '#B8CFFF',
    fontSize: 12,
    textAlign: 'right',
  },
  bottom: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  signInBtn: {
    width: '50%',
    alignSelf: 'center',
    backgroundColor: '#5b6eff',
  },
  textSignUp: {
    color: '#f2f6f9',
    fontFamily: fonts.regular.regular,
  },
  btnSignUp: {
    color: '#94b7ff',
    fontFamily: fonts.bold.regular,
    marginLeft: 2,
  },
  loginQR: {
    fontSize: 15,
    color: '#94b7ff',
    fontFamily: fonts.bold.regular,
    textAlign: 'center',
  },
  KeyboardAvoidingView: {
    flex: 1,
  },

});

Login.propTypes = {
  formError: PropTypes.string,
  isFetching: PropTypes.bool,
  login: PropTypes.func,
  recoverPasswordRequest: PropTypes.func,
  signUpRequest: PropTypes.func,
  fetchDictionary: PropTypes.func,
};
