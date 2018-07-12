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
import Touchable from '../../style/Touchable';
import _ from 'lodash';
import PrimaryButton from "../../style/ActionButton";
import {createBasicNavigationOptions, withCommonStatusBar} from "../../style/navigation";
import {common} from "../../style/common";

export default class SignUp extends Component {
    static navigationOptions = createBasicNavigationOptions('Регистрация');

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
            this.setState({formError: {serverError: nextProps.formError}})
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

        let validationErrors = {
            loginError: loginError && ('User Name: ' + loginError),
            emailError: emailError && ('Email: ' + emailError),
            passwordError: passwordError && ('Password: ' + passwordError),
            password2Error: password2Error && ('Password Repeat: ' + passwordError),
        };

        let isFormHaveError = false;
        Object.keys(validationErrors).forEach( value => {
            if (!_.isEmpty(validationErrors[value])) {
                isFormHaveError = true;
            }
        });

        if (isFormHaveError) {
            this.setState({formError: validationErrors});
        } else {
            this.props.signUp({user_name: loginValue, email: emailValue, password: passwordValue, password_confirmation: password2Value});
        }
    }

    onLoginPressed() {
        this.props.loginRequest();
    }

    render() {
        if (this.props.formState.isSuccess) {
            return withCommonStatusBar(
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

        return withCommonStatusBar(
            <View style={[styles.paddingScreen]}>
                <ScrollView style={[styles.formBlock]} keyboardShouldPersistTaps='always'>
                    <View style={{marginBottom: 8}}>
                        <FormTextInput
                            error={!_.isEmpty(this.state.formError.loginError)}
                            ref={(ref) => (this.loginInput = ref)}
                            placeholder="Username"
                            keyboardType="email-address"
                            value={this.state.loginValue}
                            onChangeText={(login) => {
                                this.setState({loginValue: login});
                            }}
                            onSubmitEditing={() => {
                                this.emailInput.focus();
                            }}
                        />
                        <View>
                            <Text style={[styles.error]}>{this.state.formError.loginError}</Text>
                        </View>
                        <FormTextInput
                            error={!_.isEmpty(this.state.formError.emailError)}
                            ref={(ref) => (this.emailInput = ref)}
                            placeholder="E-mail"
                            keyboardType="email-address"
                            value={this.state.emailValue}
                            onChangeText={(login) => {
                                this.setState({emailValue: login});
                            }}
                            onSubmitEditing={() => {
                                this.passwordInput.focus();
                            }}
                        />
                        <View>
                            <Text style={[styles.error]}>{this.state.formError.emailError}</Text>
                        </View>
                        <FormTextInput
                            error={!_.isEmpty(this.state.formError.passwordError)}
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
                        <View>
                            <Text style={[styles.error]}>{this.state.formError.passwordError}</Text>
                        </View>
                        <FormTextInput
                            error={!_.isEmpty(this.state.formError.password2Error)}
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
                            <Text style={[styles.error]}>{this.state.formError.password2Error}</Text>
                            <Text style={[styles.error]}>{this.state.formError.serverError}</Text>
                        </View>
                        <PrimaryButton onPress={this.onSignUpPressed} title={'Зарегистрироваться'} />
                    </View>
                    <Touchable onPress={this.onLoginPressed}>
                        <View>
                            <Text style={[common.textCenter]}>Уже зарегистрированы?</Text>
                            <Text style={[common.textLink, common.textCenter]}>Войти</Text>
                        </View>
                    </Touchable>
                </ScrollView>
            </View>
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
});

SignUp.propTypes = {
    formState: PropTypes.string,
    formError: PropTypes.string,
    signUp: PropTypes.func,
    loginRequest: PropTypes.func,
    fetchDictionary: PropTypes.func,
};
