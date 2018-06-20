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
import Touchable from '../Touchable';
import _ from 'lodash';

export default class Login extends Component {

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
            this.setState({formError: {serverError: nextProps.formError}})
        }
    }

    onLoginPressed() {
        const {
            loginValue,
            passwordValue,
        } = this.state;

        let loginError = new Validator({presence: true}).validate(loginValue);
        let passwordError = new Validator({presence: true}).validate(passwordValue);

        let validationErrors = {
            loginError: loginError && ('User Name: ' + loginError),
            passwordError: passwordError && ('Password: ' + passwordError)
        };

        if (!_.every(_.values(validationErrors), value => !value)) {
            this.setState({formError: validationErrors});
        } else {
            this.props.login({login: loginValue, password: passwordValue});
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
            <ScrollView style={[styles.paddingScreen]}>
                <Text style={[styles.pageHeader]}>Войти</Text>
                <View style={[styles.formBlock]}>
                    <View>
                        <FormTextInput
                            error={!_.isEmpty(this.state.formError.loginError)}
                            ref={(ref) => (this.loginInput = ref)}
                            placeholder="Username"
                            keyboardType="login-address"
                            value={this.state.loginValue}
                            onChangeText={(login) => {
                                this.setState({loginValue: login});
                            }}
                            onSubmitEditing={() => {
                                this.passwordInput.focus();
                            }}
                        />
                        <View>
                            <Text style={[styles.error]}>{this.state.formError.loginError}</Text>
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
                            onSubmitEditing={this.onLoginPressed}
                        />
                        <View>
                            <Text style={[styles.error]}>{this.state.formError.passwordError}</Text>
                            <Text style={[styles.error]}>{this.state.formError.serverError}</Text>
                        </View>
                        <Touchable onPress={this.onRecoverRequestPressed}>
                            <View>
                                <Text style={[styles.remindLink, styles.textCenter]}>Забыли пароль?</Text>
                            </View>
                        </Touchable>
                        <Touchable onPress={this.onLoginPressed}>
                            <View style={[styles.mainButton]}>
                                <Text style={[styles.mainButtonLabel]}>Войти</Text>
                            </View>
                        </Touchable>
                    </View>
                    <Text style={[styles.textCenter]}>Вы впервые на BitChange?</Text>
                    <Touchable onPress={this.onSignUpPressed}>
                        <View>
                            <Text style={[styles.textLink, styles.textCenter]}>Зарегистрируйтесь прямо сейчас!</Text>
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
    pageHeader: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: "700",
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
    mainButton: {
        backgroundColor: '#2d18a0',
        padding: 12,
        marginBottom: 28,
    },
    mainButtonLabel: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 14,
    },
    textLink: {
        color: '#2d18a0',
        textDecorationLine: 'underline',
    },
    remindLink: {
        color: '#838383',
        fontWeight: '700',
        fontSize: 16,
        marginBottom: 28,
    },
    textCenter: {
        textAlign: 'center',
    },
});

Login.propTypes = {
    formError: PropTypes.string,
    login: PropTypes.func,
    recoverPasswordRequest: PropTypes.func,
    signUpRequest: PropTypes.func,
    fetchDictionary: PropTypes.func,
};
