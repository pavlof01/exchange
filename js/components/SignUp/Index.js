import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Validator from '../../services/Validator';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
} from 'react-native';
import FormTextInput from '../../components/FormTextInput';
import * as authActions from '../../actions/authActions';
import Touchable from '../Touchable';

export default class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loginValue: '',
            passwordValue: '',
            password2Value: '',
            emailValue: '',
            formState: this.props.formState,
            formError: null,
        };

        this.onSignUpPressed = this.onSignUpPressed.bind(this);

    }

    componentDidMount() {
        this.props.fetchDictionary();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.formError !== nextProps.formError) {
            this.setState({formError: nextProps.formError})
        }
    }

    onSignUpPressed() {
        const {
            loginValue,
            passwordValue,
            password2Value,
            emailValue
        } = this.state;

        let loginError = new Validator({presence: true}).validate(loginValue);
        let emailError = new Validator({presence: true, email: true}).validate(emailValue);
        let passwordError = new Validator({presence: true}).validate(passwordValue);
        let password2Error = new Validator({presence: true}).validate(password2Value);

        let validationErrors = [];
        loginError && validationErrors.push(loginError);
        emailError && validationErrors.push(emailError);
        passwordError && validationErrors.push(passwordError);
        password2Error && validationErrors.push(password2Error);

        if (validationErrors.length) {
            this.setState({formError: validationErrors.join(', ')});
        } else {
            this.props.signUp({user_name: loginValue, email: emailValue, password: passwordValue, password_confirmation: password2Value});
        }
    }

    onLoginPressed() {
        this.props.loginRequest();
    }

    render() {
        if (this.props.formState.isSuccess) {
            return (
                <View>
                    <Text>Вы успешно зарегистрированы.</Text>
                    <Text>На ваш e-mail отправлено сообщение со ссылкой для подтверждения регистрации</Text>
                    <Touchable onPress={this.onLoginPressed}>
                        <View>
                            <Text>Login</Text>
                        </View>
                    </Touchable>
                </View>
            )
        }

        return (
            <View>
                <ScrollView>
                    <Text>Зарегистрировать новую учетную запись</Text>
                    <View>
                        <FormTextInput
                            error={this.state.formError !== null}
                            ref={(ref) => (this.loginInput = ref)}
                            placeholder="Username"
                            keyboardType="login-address"
                            value={this.state.loginValue}
                            onChangeText={(login) => {
                                this.setState({loginValue: login});
                            }}
                            onSubmitEditing={() => {
                                this.emailInput.focus();
                            }}
                        />
                        <FormTextInput
                            error={this.state.formError !== null}
                            ref={(ref) => (this.emailInput = ref)}
                            placeholder="E-mail"
                            keyboardType="login-address"
                            value={this.state.emailValue}
                            onChangeText={(login) => {
                                this.setState({emailValue: login});
                            }}
                            onSubmitEditing={() => {
                                this.passwordInput.focus();
                            }}
                        />
                        <FormTextInput
                            error={this.state.formError !== null}
                            ref={(ref) => (this.passwordInput = ref)}
                            placeholder="Password"
                            secureTextEntry
                            value={this.state.passwordValue}
                            onChangeText={(password) => {
                                this.setState({passwordValue: password});
                            }}
                            onSubmitEditing={() => {
                                this.password2Input.focus();
                            }}
                        />
                        <FormTextInput
                            error={this.state.formError !== null}
                            ref={(ref) => (this.password2Input = ref)}
                            placeholder="Repeat Password"
                            secureTextEntry
                            value={this.state.password2Value}
                            onChangeText={(password) => {
                                this.setState({password2Value: password});
                            }}
                            onSubmitEditing={this.onSignUpPressed}
                        />
                        <View>
                            <Text style={[styles.error]}>{this.state.formError}</Text>
                        </View>
                        <Touchable onPress={this.onSignUpPressed}>
                            <View>
                                <Text>Registration</Text>
                            </View>
                        </Touchable>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    error: {
        color: '#dd0057',
    },
});

SignUp.propTypes = {
    formState: PropTypes.object,
    formError: PropTypes.string,
    signUp: PropTypes.func,
    loginRequest: PropTypes.func,
    fetchDictionary: PropTypes.func,
};
