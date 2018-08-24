import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { FormattedMessage } from 'react-intl';
import Validator from '../../services/Validator';
import FormTextInput from '../FormTextInput';
import Touchable from '../../style/Touchable';
import PrimaryButton from '../../style/ActionButton';
import { common } from '../../style/common';

class RecoverPassword extends Component {
  // static navigationOptions = createBasicNavigationOptions('Восстановление');
  static navigationOptions = () => ({
    title: (
      <FormattedMessage id="app.login.recovery_password.title" />
    ),
    headerStyle: { backgroundColor: '#2B2B82' },
    headerTitleStyle: { color: 'white' },
    headerTintColor: 'white',
  });

  constructor(props) {
    super(props);
    this.state = {
      emailValue: '',
      formError: null,
    };

    this.onSignUpPressed = this.onSignUpPressed.bind(this);
    this.onRecoverPressed = this.onRecoverPressed.bind(this);
    this.onLoginPressed = this.onLoginPressed.bind(this);
  }

  componentDidMount() {
    this.props.fetchDictionary();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.formError !== nextProps.formError) {
      this.setState({ formError: nextProps.formError });
    }
  }

  onSignUpPressed() {
    this.props.signUpRequest();
  }

  onRecoverPressed() {
    const {
      emailValue,
    } = this.state;

    const emailError = new Validator({ presence: true, email: true }).validate(emailValue);

    const validationErrors = [];
    // eslint-disable-next-line no-unused-expressions
    emailError && validationErrors.push(emailError);

    if (validationErrors.length) {
      this.setState({ formError: validationErrors.join('; ') });
    } else {
      this.props.recover({ email: emailValue });
    }
  }

  onLoginPressed() {
    this.props.loginRequest();
  }

  render() {
    if (this.props.isSent) {
      return (
        <ScrollView style={[styles.paddingScreen]}>
          <View>
            <Text style={[styles.textSuccess, styles.textCenter]}>
              <FormattedMessage id="app.login.recovery_password.send_email" />
            </Text>
          </View>
          <Text style={[styles.textCenter]}>
            <FormattedMessage id="app.login.recovery_password.register" />
          </Text>
          <Touchable onPress={this.onLoginPressed}>
            <View>
              <Text style={[styles.textLink, styles.textCenter]}>
                <FormattedMessage id="app.login.recovery_password.sign_in" />
              </Text>
            </View>
          </Touchable>
        </ScrollView>
      );
    }
    return (
      <ScrollView style={[styles.paddingScreen]}>
        <View style={[styles.formBlock]}>
          <View style={{ marginBottom: 8 }}>
            <FormTextInput
              error={this.state.formError !== null}
              // eslint-disable-next-line arrow-parens
              ref={ref => { this.emailInput = ref; }}
              placeholder="E-mail"
              value={this.state.emailValue}
              onChangeText={(email) => {
                this.setState({ emailValue: email });
              }}
              onSubmitEditing={this.onRecoverPressed}
            />
            <View>
              <Text style={[styles.error]}>
                {this.state.formError}
              </Text>
            </View>
            <PrimaryButton onPress={this.onRecoverPressed} title={<FormattedMessage id="app.login.recovery_password.title" />} />
          </View>
          <Touchable onPress={this.onSignUpPressed}>
            <View>
              <Text style={[common.textCenter]}>
                <FormattedMessage id="app.login.recovery_password.first" />
              </Text>
              <Text style={[common.textLink, common.textCenter]}>
                <FormattedMessage id="app.login.recovery_password.register_right_now" />
              </Text>
            </View>
          </Touchable>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  error: {
    color: '#dd0057',
    marginBottom: 16,
  },
  paddingScreen: {
    padding: 16,
  },
  formBlock: {
    paddingHorizontal: 20,
    paddingVertical: 32,
    backgroundColor: '#fff',
  },
  textLink: {
    color: '#2d18a0',
    textDecorationLine: 'underline',
  },
  textCenter: {
    textAlign: 'center',
    justifyContent: 'center',
  },
  textSuccess: {
    color: '#48a34f',
    fontSize: 16,
    marginBottom: 28,
  },
});

export default RecoverPassword;

RecoverPassword.propTypes = {
  formError: PropTypes.string,
  recover: PropTypes.func,
  isSent: PropTypes.bool,
  signUpRequest: PropTypes.func,
  loginRequest: PropTypes.func,
  fetchDictionary: PropTypes.func,
};
