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

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loginValue: '',
            passwordValue: '',
            password2Value: '',
            nameValue: '',
            phoneValue: '',
            formState: this.props.formState,
            formError: null,
        };

        this.onLoginPressed = this.onLoginPressed.bind(this);

    }

    componentDidMount() {
        this.props.fetchDictionary();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.formError !== nextProps.formError) {
            this.setState({formError: nextProps.formError})
        }
    }

    onLoginPressed() {
        const {
            loginValue,
            passwordValue,
        } = this.state;

        let loginError = new Validator({presence: true}).validate(loginValue);
        let passwordError = new Validator({presence: true}).validate(passwordValue);

        let validationErrors = [];
        loginError && validationErrors.push('User Name: ' + loginError);
        passwordError && validationErrors.push('Password: ' + passwordError);

        if (validationErrors.length) {
            this.setState({formError: validationErrors.join('; ')});
        } else {
            this.props.login({login: loginValue, password: passwordValue});
        }
    }

    renderLoginForm() {
        return (
            <ScrollView>
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
                    onSubmitEditing={this.onLoginPressed}
                />
                <View>
                    <Text style={[styles.error]}>{this.state.formError}</Text>
                </View>
                <Touchable onPress={this.onLoginPressed}>
                    <View style={[styles.mainButton]}>
                        <Text style={[styles.mainButtonLabel]}>Войти</Text>
                    </View>
                </Touchable>
            </ScrollView>
        );
    }

    render() {
        let formType;
        switch (this.props.formState) {
            case authActions.LOGIN:
                formType = this.renderLoginForm();
                break;
            default:
                return formType;
        }
        return (
            <View style={[styles.paddingScreen]}>
                <View style={[styles.formBlock]}>
                    <Text style={[styles.pageHeader]}>Войти</Text>
                    <View>
                        {formType}
                    </View>
                    <Text style={[styles.textCenter]}>Вы впервые на BitChange?</Text>
                    <Touchable onPress={this.onSignUpPressed}>
                        <View>
                            <Text style={[styles.textLink, styles.textCenter]}>Зарегистрируйтесь прямо сейчас!</Text>
                        </View>
                    </Touchable>
                </View>
            </View>
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
        fontSize: 18,
        lineHeight: 18,
        fontWeight: "700",
    },
    paddingScreen: {
        padding: 16,
    },
    formBlock: {
        padding: 32,
        backgroundColor: '#fff',
    },
    mainButton: {
        backgroundColor: '#2d18a0',
        padding: 12,
        marginBottom: 16,
    },
    mainButtonLabel: {
        color: '#fff',
        textAlign: 'center',
    },
    textLink: {
        color: '#2d18a0',
        textDecorationLine: 'underline',
    },
    textCenter: {
        textAlign: 'center',
    }
});

Login.propTypes = {
    formState: PropTypes.string,
    formError: PropTypes.string,
    login: PropTypes.func,
    fetchDictionary: PropTypes.func,
};
