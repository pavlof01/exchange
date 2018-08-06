import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import _ from 'lodash';
import LinearGradient from 'react-native-linear-gradient';
import { injectIntl, intlShape } from 'react-intl';
import Validator from '../../services/Validator';
import FormTextInput from '../FormTextInput';
import Touchable from '../../style/Touchable';
import PrimaryButton from '../../style/ActionButton';
import { createBasicNavigationOptions, withCommonStatusBar } from '../../style/navigation';
import { common } from '../../style/common';
import Logo from '../../img/bitpapa.png';
import LogoText from '../../../assets/img/text.png';
import { fonts } from '../../style/resourceHelpers';

const { width, height } = Dimensions.get('window');

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginValue: '',
      passwordValue: '',
      password2Value: '',
      emailValue: '',
      formState: this.props.formState,
      formError: {},
    };

    this.onSignUpPressed = this.onSignUpPressed.bind(this);
    this.onLoginPressed = this.onLoginPressed.bind(this);
  }

  componentDidMount() {
    this.props.fetchDictionary();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.formError !== nextProps.formError) {
      this.setState({ formError: { serverError: nextProps.formError } });
    }
  }

  onSignUpPressed() {
    const {
      loginValue,
      passwordValue,
      password2Value,
      emailValue,
    } = this.state;

    const loginError = new Validator({ presence: true }).validate(loginValue);
    const emailError = new Validator({ presence: true, email: true }).validate(emailValue);
    const passwordError = new Validator({ presence: true }).validate(passwordValue);
    const password2Error = new Validator({ presence: true }).validate(password2Value);

    const validationErrors = {
      loginError: loginError && (`User Name: ${loginError}`),
      emailError: emailError && (`Email: ${emailError}`),
      passwordError: passwordError && (`Password: ${passwordError}`),
      password2Error: password2Error && (`Password Repeat: ${passwordError}`),
    };

    let isFormHaveError = false;
    Object.keys(validationErrors).forEach((value) => {
      if (!_.isEmpty(validationErrors[value])) {
        isFormHaveError = true;
      }
    });

    if (isFormHaveError) {
      this.setState({ formError: validationErrors });
    } else {
      this.props.signUp({
        user_name: loginValue,
        email: emailValue,
        password: passwordValue,
        password_confirmation: password2Value,
        is_mobile: true,
      });
    }
  }

  onLoginPressed() {
    this.props.loginRequest();
  }

  render() {
    const { intl } = this.props;
    if (this.props.formState.isSuccess) {
      return withCommonStatusBar(
        <View>
          <Text>
            Вы успешно зарегистрированы.
          </Text>
          <Text>
            На ваш e-mail отправлено сообщение со ссылкой для подтверждения регистрации
          </Text>
          <Touchable onPress={this.onLoginPressed}>
            <View>
              <Text>
                Login
              </Text>
            </View>
          </Touchable>
        </View>,
      );
    }

    return (
      <LinearGradient
        colors={['#3F579E', '#426CA6', '#426CA6', '#384D8C', '#203057']}
        style={[styles.gradient]}
      >
        <ScrollView contentContainerStyle={styles.main}>
          <View>
            <View style={styles.logoContainer}>
              <Image source={Logo} />
            </View>
            <View>
              <Text style={styles.title}>
                {intl.formatMessage({ id: 'app.registration', defaultMessage: 'Registration' }).toUpperCase()}
              </Text>
              <View style={{ marginTop: '10%' }}>
                <FormTextInput
                  style={styles.textInputContainer}
                  textStyle={styles.textInput}
                  placeholderTextColor="#B8CFFF"
                  error={!_.isEmpty(this.state.formError.loginError)}
                  ref={ref => (this.loginInput = ref)}
                  placeholder={intl.formatMessage({ id: 'app.registration.username', defaultMessage: 'Username' })}
                  keyboardType="email-address"
                  value={this.state.loginValue}
                  onChangeText={(login) => {
                    this.setState({ loginValue: login });
                  }}
                  onSubmitEditing={() => {
                    this.emailInput.focus();
                  }}
                />
                <View>
                  <Text style={[styles.error]}>
                    {this.state.formError.loginError}
                  </Text>
                </View>
                <FormTextInput
                  style={styles.textInputContainer}
                  textStyle={styles.textInput}
                  placeholderTextColor="#B8CFFF"
                  error={!_.isEmpty(this.state.formError.passwordError)}
                  ref={ref => (this.passwordInput = ref)}
                  placeholder={intl.formatMessage({ id: 'app.registration.password', defaultMessage: 'Password' })}
                  autoCapitalize="none"
                  secureTextEntry
                  value={this.state.passwordValue}
                  onChangeText={(password) => {
                    this.setState({ passwordValue: password });
                  }}
                  onSubmitEditing={() => {
                    this.password2Input.focus();
                  }}
                />
                <View>
                  <Text style={[styles.error]}>
                    {this.state.formError.passwordError}
                  </Text>
                </View>
                <FormTextInput
                  style={styles.textInputContainer}
                  textStyle={styles.textInput}
                  placeholderTextColor="#B8CFFF"
                  error={!_.isEmpty(this.state.formError.password2Error)}
                  ref={ref => (this.password2Input = ref)}
                  placeholder={intl.formatMessage({ id: 'app.registration.confirm_password', defaultMessage: 'Confirm password' })}
                  autoCapitalize="none"
                  secureTextEntry
                  value={this.state.password2Value}
                  onChangeText={(password) => {
                    this.setState({ password2Value: password });
                  }}
                  onSubmitEditing={this.onSignUpPressed}
                />
                <View>
                  <Text style={[styles.error]}>
                    {this.state.formError.emailError}
                  </Text>
                </View>
                <FormTextInput
                  style={styles.textInputContainer}
                  textStyle={styles.textInput}
                  placeholderTextColor="#B8CFFF"
                  error={!_.isEmpty(this.state.formError.emailError)}
                  ref={ref => (this.emailInput = ref)}
                  placeholder="E-mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={this.state.emailValue}
                  onChangeText={(login) => {
                    this.setState({ emailValue: login });
                  }}
                  onSubmitEditing={() => {
                    this.passwordInput.focus();
                  }}
                />
                <View>
                  <Text style={[styles.error]}>
                    {this.state.formError.password2Error}
                  </Text>
                  <Text style={[styles.error]}>
                    {this.state.formError.serverError}
                  </Text>
                </View>
                <PrimaryButton
                  style={styles.registerBtn}
                  onPress={this.onSignUpPressed}
                  title={intl.formatMessage({ id: 'app.login.btn.sign_up', defaultMessage: 'Sign up' }).toUpperCase()}
                />
              </View>
              <View style={styles.backToLoginContainer}>
                <Text style={styles.back}>
                  {intl.formatMessage({ id: 'app.registration.back_to', defaultMessage: 'Or back to' })}
                </Text>
                <Touchable onPress={this.onLoginPressed}>
                  <Text style={styles.backBtn}>
                    {intl.formatMessage({ id: 'app.login.btn.sign_in', defaultMessage: 'Sign in' })}
                  </Text>
                </Touchable>
              </View>


            </View>
          </View>
          <View>
            <View style={styles.termsContainer}>
              <Text style={styles.termsText}>
                {intl.formatMessage({ id: 'app.registration.by_continuing_you_accept_our', defaultMessage: 'By continuing, you accept our' })}
                <Text style={styles.boldRegular}>
                  {' '}
                  {intl.formatMessage({ id: 'app.registration.terms_and_сonditions', defaultMessage: 'Terms and Conditions' })}
                  {' '}
                </Text>
                {intl.formatMessage({ id: 'app.registration.and', defaultMessage: 'and' })}
                <Text style={styles.boldRegular}>
                  {' '}
                  {intl.formatMessage({ id: 'app.registration.privacy_policy', defaultMessage: 'Privacy Policy' })}
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>);
  }
}

const styles = StyleSheet.create({
  error: {
    color: '#dd0057',
    marginBottom: 16,
  },
  boldRegular: {
    fontFamily: fonts.bold.regular,
  },
  gradient: {
    position: 'absolute',
    width,
  },
  main: {
    paddingLeft: 42,
    paddingRight: 42,
    height,
    justifyContent: 'space-between',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
    marginTop: 30,
    flex: 1,
  },
  textInputContainer: {
    borderColor: '#94B7FF',
  },
  textInput: {
    color: '#fff',
    fontSize: 18,
  },
  title: {
    fontSize: 18,
    fontWeight: '400',
    color: '#f2f6f9',
    textAlign: 'center',
    letterSpacing: 1,
    fontFamily: fonts.regular.regular,
  },
  backToLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '5%',
    height: 30,
  },
  registerBtn: {
    width: '60%',
    alignSelf: 'center',
    backgroundColor: '#5b6eff',
  },
  back: {
    color: '#f2f6f9',
    fontFamily: fonts.regular.regular,
  },
  backBtn: {
    color: '#94b7ff',
    fontFamily: fonts.bold.regular,
    marginLeft: '5%',
  },
  termsContainer: {
    width: '70%',
    alignSelf: 'center',
  },
  termsText: {
    color: '#f2f6f9',
    fontSize: 12,
    textAlign: 'center',
    fontFamily: fonts.regular.regular,
  },
});

SignUp.propTypes = {
  formState: PropTypes.string,
  formError: PropTypes.string,
  signUp: PropTypes.func,
  loginRequest: PropTypes.func,
  fetchDictionary: PropTypes.func,
};

export default injectIntl(SignUp);
