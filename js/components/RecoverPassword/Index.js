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
import PrimaryButton from "../../style/ActionButton";
import {createBasicNavigationOptions, withCommonStatusBar} from "../../style/navigation";

export default class RecoverPassword extends Component {
    static navigationOptions = createBasicNavigationOptions('Восстановление');

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
            this.setState({formError: nextProps.formError})
        }
    }

    onSignUpPressed() {
        this.props.signUpRequest();
    }

    onRecoverPressed() {
        const {
            emailValue,
        } = this.state;

        let emailError = new Validator({presence: true, email: true}).validate(emailValue);

        let validationErrors = [];
        emailError && validationErrors.push(emailError);

        if (validationErrors.length) {
            this.setState({formError: validationErrors.join('; ')});
        } else {
            this.props.recover({email: emailValue});
        }
    }

    onLoginPressed() {
        this.props.loginRequest();
    }

    render() {
        if (this.props.isSent) {
            return withCommonStatusBar(
                <ScrollView style={[styles.paddingScreen]}>
                    <View>
                        <Text style={[styles.textSuccess, styles.textCenter]}>На ваш электронный адрес было отправлено письмо с инструкциями по изменению пароля</Text>
                    </View>
                    <Text style={[styles.textCenter]}>Уже зарегистрированы?</Text>
                    <Touchable onPress={this.onLoginPressed}>
                        <View>
                            <Text style={[styles.textLink, styles.textCenter]}>Войти</Text>
                        </View>
                    </Touchable>
                </ScrollView>
            )
        } else {
            return withCommonStatusBar(
                <ScrollView style={[styles.paddingScreen]}>
                    <View style={[styles.formBlock]}>
                        <View style={{marginBottom: 8}}>
                            <FormTextInput
                                error={this.state.formError !== null}
                                ref={(ref) => (this.emailInput = ref)}
                                placeholder="E-mail"
                                value={this.state.emailValue}
                                onChangeText={(email) => {
                                    this.setState({emailValue: email});
                                }}
                                onSubmitEditing={this.onRecoverPressed}
                            />
                            <View>
                                <Text style={[styles.error]}>{this.state.formError}</Text>
                            </View>
                            <PrimaryButton onPress={this.onRecoverPressed} title={'Восстановить'} />
                        </View>
                        <Touchable onPress={this.onSignUpPressed}>
                            <View>
                                <Text style={[styles.textCenter]}>Вы впервые на BitChange?</Text>
                                <Text style={[styles.textLink, styles.textCenter]}>Зарегистрируйтесь прямо сейчас!</Text>
                            </View>
                        </Touchable>
                    </View>
                </ScrollView>
            );
        }
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
    }
});

RecoverPassword.propTypes = {
    formError: PropTypes.string,
    recover: PropTypes.func,
    isSent: PropTypes.bool,
    signUpRequest: PropTypes.func,
    loginRequest: PropTypes.func,
    fetchDictionary: PropTypes.func,
};
