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
  Platform,
} from 'react-native';
import _ from 'lodash';
import LinearGradient from 'react-native-linear-gradient';
import { injectIntl, intlShape } from 'react-intl';
import Validator from '../../services/Validator';
import FormTextInput from '../FormTextInput';
import Touchable from '../../style/Touchable';
import PrimaryButton from '../../style/ActionButton';
import BorderlessButton from '../../style/BorderlessButton';
import { fonts } from '../../style/resourceHelpers';

const { height } = Dimensions.get('window');
const isAndroid = Platform.OS === 'android';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginValue: '',
      passwordValue: '',
      formError: {},
    };

    this.onLoginPressed = this.onLoginPressed.bind(this);
    this.onSignUpPressed = this.onSignUpPressed.bind(this);
    this.onRecoverRequestPressed = this.onRecoverRequestPressed.bind(this);
  }

  componentDidMount() {
    this.props.fetchDictionary();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.formError !== nextProps.formError) {
      this.setState({ formError: { serverError: nextProps.formError } });
    }
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
    const { intl } = this.props;
    return (
      <LinearGradient
        colors={['#3F579E', '#426CA6', '#426CA6', '#384D8C', '#203057']}
        style={[styles.paddingScreen]}
      >
        <ScrollView contentContainerStyle={styles.scrollView} bounces={false}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require('../../img/logo.png')}
            />
            <Image
              style={styles.logoText}
              source={require('../../img/logo_text.png')}
            />
          </View>
          <View style={{ flex: 1 }}>
            <KeyboardAvoidingView behavior="padding">
              <View style={styles.formContainer}>
                <FormTextInput
                  style={styles.textInputContainer}
                  textStyle={styles.textInput}
                  key="login"
                  error={!_.isEmpty(this.state.formError.loginError)}
                  ref={(ref) => { this.loginInput = ref; }}
                  placeholder={intl.formatMessage({ id: 'app.login.enter_username', defaultMessage: 'Enter username' })}
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
                  ref={(ref) => { this.passwordInput = ref; }}
                  placeholder={intl.formatMessage({ id: 'app.login.enter_password', defaultMessage: 'Enter password' })}
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
                    title={intl.formatMessage({ id: 'app.login.forgot_password', defaultMessage: 'Forgot password?' })}
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
              title={intl.formatMessage({ id: 'app.login.btn.sign_in', defaultMessage: 'Sign in' })}
              disabled={this.props.isFetching}
            >
              {this.props.isFetching
                ? <ActivityIndicator size="large" />
                : undefined}
            </PrimaryButton>
            <View style={styles.signUpContainer}>
              <Text style={styles.textSignUp}>
                {intl.formatMessage({ id: 'app.login.dont_have_account', defaultMessage: 'Dont\'t have an accaunt? ' })}
              </Text>
              <Touchable onPress={this.onSignUpPressed}>
                <Text style={styles.btnSignUp}>
                  {intl.formatMessage({ id: 'app.login.btn.sign_up', defaultMessage: 'Sign up' })}
                </Text>
              </Touchable>
            </View>
          </View>
          <Touchable>
            <Text style={styles.loginQR}>
              {intl.formatMessage({ id: 'app.login.btn.login_with_qr_code', defaultMessage: 'Sign up' }).toUpperCase()}
            </Text>
          </Touchable>
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
    height,
  },
  scrollView: {
    justifyContent: 'space-between',
    flex: 1,
    paddingBottom: isAndroid ? 40 : 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: height / 15,
    flex: 1,
  },
  logo: {
    marginBottom: height / 40,
    resizeMode: 'contain',
    width: '100%',
    height: height / 7,
  },
  logoText: {
    resizeMode: 'contain',
    width: '100%',
    height: height / 20,
  },
  logoStylesOnKeyboardShow: {
    resizeMode: 'contain',
    opacity: 0.5,
    transform: [
      { scale: 0.5 },
    ],
  },
  textLogoStylesOnKeyboardShow: {
    resizeMode: 'contain',
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
  formContainer: {
    paddingLeft: 42,
    paddingRight: 42,
  },
  forgetPasswordText: {
    fontWeight: '400',
    color: '#B8CFFF',
    fontSize: 12,
    textAlign: 'right',
  },
  bottom: {
    flex: 2,
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  signInBtn: {
    marginTop: 10,
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
});

Login.propTypes = {
  formError: PropTypes.string,
  isFetching: PropTypes.bool,
  login: PropTypes.func,
  recoverPasswordRequest: PropTypes.func,
  signUpRequest: PropTypes.func,
  fetchDictionary: PropTypes.func,
  intl: intlShape,
};

export default injectIntl(Login);
