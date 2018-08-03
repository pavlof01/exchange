import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Validator from '../../services/Validator';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Image
} from 'react-native';
import FormTextInput from '../../components/FormTextInput';
import Touchable from '../../style/Touchable';
import _ from 'lodash';
import PrimaryButton from "../../style/ActionButton";
import { createBasicNavigationOptions, withCommonStatusBar } from "../../style/navigation";
import { common } from "../../style/common";
import LinearGradient from 'react-native-linear-gradient';
import Logo from '../../../js/img/bitpapa.png';
import LogoText from '../../../assets/img/text.png';
import { fonts } from "../../style/resourceHelpers";

export default class SignUp extends Component {
    static navigationOptions = { header: props => null };

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
            this.setState({ formError: { serverError: nextProps.formError } })
        }
    }

    onSignUpPressed() {
        const {
            loginValue,
            passwordValue,
            password2Value,
            emailValue
        } = this.state;

        let loginError = new Validator({ presence: true }).validate(loginValue);
        let emailError = new Validator({ presence: true, email: true }).validate(emailValue);
        let passwordError = new Validator({ presence: true }).validate(passwordValue);
        let password2Error = new Validator({ presence: true }).validate(password2Value);

        let validationErrors = {
            loginError: loginError && ('User Name: ' + loginError),
            emailError: emailError && ('Email: ' + emailError),
            passwordError: passwordError && ('Password: ' + passwordError),
            password2Error: password2Error && ('Password Repeat: ' + passwordError),
        };

        let isFormHaveError = false;
        Object.keys(validationErrors).forEach(value => {
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

        return (
            <LinearGradient
                colors={['#3F579E', '#426CA6', '#426CA6', '#384D8C', '#203057']}
                style={[styles.paddingScreen]}>
                <ScrollView contentContainerStyle={styles.main}>
                    <View>
                        <View style={styles.logoContainer}>
                            <Image source={Logo} />
                        </View>
                        <View>
                            <Text style={styles.title}>REGISTRATION</Text>
                            <View style={{ marginTop: '10%' }}>
                                <FormTextInput
                                    style={styles.textInputContainer}
                                    textStyle={styles.textInput}
                                    placeholderTextColor="#B8CFFF"
                                    error={!_.isEmpty(this.state.formError.loginError)}
                                    ref={(ref) => (this.loginInput = ref)}
                                    placeholder="Username"
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
                                    <Text style={[styles.error]}>{this.state.formError.loginError}</Text>
                                </View>
                                <FormTextInput
                                    style={styles.textInputContainer}
                                    textStyle={styles.textInput}
                                    placeholderTextColor="#B8CFFF"
                                    error={!_.isEmpty(this.state.formError.passwordError)}
                                    ref={(ref) => (this.passwordInput = ref)}
                                    placeholder="Password"
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
                                    <Text style={[styles.error]}>{this.state.formError.passwordError}</Text>
                                </View>
                                <FormTextInput
                                    style={styles.textInputContainer}
                                    textStyle={styles.textInput}
                                    placeholderTextColor="#B8CFFF"
                                    error={!_.isEmpty(this.state.formError.password2Error)}
                                    ref={(ref) => (this.password2Input = ref)}
                                    placeholder="Confirm password"
                                    autoCapitalize="none"
                                    secureTextEntry
                                    value={this.state.password2Value}
                                    onChangeText={(password) => {
                                        this.setState({ password2Value: password });
                                    }}
                                    onSubmitEditing={this.onSignUpPressed}
                                />
                                <View>
                                    <Text style={[styles.error]}>{this.state.formError.emailError}</Text>
                                </View>
                                <FormTextInput
                                    style={styles.textInputContainer}
                                    textStyle={styles.textInput}
                                    placeholderTextColor="#B8CFFF"
                                    error={!_.isEmpty(this.state.formError.emailError)}
                                    ref={(ref) => (this.emailInput = ref)}
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
                                    <Text style={[styles.error]}>{this.state.formError.password2Error}</Text>
                                    <Text style={[styles.error]}>{this.state.formError.serverError}</Text>
                                </View>
                                <PrimaryButton
                                    style={styles.registerBtn}
                                    onPress={this.onSignUpPressed}
                                    title={'REGISTER'} />
                            </View>
                            <View style={styles.backToLoginContainer}>
                                <Text style={styles.back}>Or back to</Text>
                                <Touchable onPress={this.onLoginPressed}>
                                    <Text style={styles.backBtn}>Sign in</Text>
                                </Touchable>
                            </View>


                        </View>
                    </View>
                    <View>
                        <View style={styles.termsContainer}>
                            <Text style={styles.termsText}>
                                By continuing, you accept our
                                <Text style={styles.boldRegular}> Terms and Conditions </Text>
                                and
                                <Text style={styles.boldRegular}> Privacy Policy</Text>
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </LinearGradient>)
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
    paddingScreen: {
        paddingLeft: 42,
        paddingRight: 42,
        paddingTop: 10,
        paddingBottom: 30,
        flex: 1,
        justifyContent: 'center',
    },
    main: {
        flex: 1,
        justifyContent: 'space-between'
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: '35%',
        marginTop: '15%',
        flex: 1,
    },
    textInputContainer: {
        borderColor: '#94B7FF'
    },
    textInput: {
        color: '#fff',
        fontSize: 18
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
        height: 30
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
        marginLeft: '5%'
    },
    termsContainer: {
        width: '70%',
        alignSelf: 'center'
    },
    termsText: {
        color: '#f2f6f9',
        fontSize: 12,
        textAlign: 'center',
        fontFamily: fonts.regular.regular,
    }
});

SignUp.propTypes = {
    formState: PropTypes.string,
    formError: PropTypes.string,
    signUp: PropTypes.func,
    loginRequest: PropTypes.func,
    fetchDictionary: PropTypes.func,
};
