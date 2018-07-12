import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Validator from '../../services/Validator';
import {
    View,
    Text,
    ScrollView,
    StyleSheet, ActivityIndicator,
} from 'react-native';
import FormTextInput from '../../components/FormTextInput';
import Touchable from '../../style/Touchable';
import _ from 'lodash';
import PrimaryButton from "../../style/ActionButton";
import {withColoredStatusBar} from "../../style/navigation";
import BorderlessButton from "../../style/BorderlessButton";
import {fonts} from "../../style/resourceHelpers";
import {common} from "../../style/common";

export default class Login extends Component {
    static navigationOptions = { header: props => null };

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

        const loginError = new Validator({presence: true}).validate(loginValue);
        const passwordError = new Validator({presence: true}).validate(passwordValue);

        const validationErrors = {
            loginError: loginError && (loginError),
            passwordError: passwordError && (passwordError)
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
        return (withColoredStatusBar('#AAAAAA',
            <View style={[styles.paddingScreen]}>
                <Text style={[styles.pageHeader]}>BitChange</Text>
                <View style={[styles.formBlock]}>
                    <View style={{marginBottom: 64}}>
                        <FormTextInput
                            key={'login'}
                            error={!_.isEmpty(this.state.formError.loginError)}
                            ref={(ref) => (this.loginInput = ref)}
                            placeholder="Username"
                            keyboardType="email-address"
                            autoCapitalize={'none'}
                            onChangeText={(login) => {
                                this.setState({loginValue: login});
                            }}
                            onSubmitEditing={() => {
                                this.passwordInput.focus();
                            }}
                        />
                        <Text style={[styles.error]}>{this.state.formError.loginError}</Text>
                        <FormTextInput
                            key={'pass'}
                            error={!_.isEmpty(this.state.formError.passwordError)}
                            ref={(ref) => (this.passwordInput = ref)}
                            placeholder="Password"
                            secureTextEntry
                            onChangeText={(password) => {
                                this.setState({passwordValue: password});
                            }}
                            onSubmitEditing={this.onLoginPressed}
                        />
                        <Text style={[styles.error]}>{this.state.formError.passwordError}</Text>
                        <Text style={[styles.error]}>{this.state.formError.serverError}</Text>
                        <BorderlessButton onPress={this.onRecoverRequestPressed} title={'Забыли пароль?'} />
                        <PrimaryButton onPress={this.onLoginPressed} title={'Войти'} disabled={this.props.isFetching} >
                            {this.props.isFetching ? <ActivityIndicator size="large"/> : undefined}
                        </PrimaryButton>

                    </View>
                    <Touchable onPress={this.onSignUpPressed}>
                        <View>
                            <Text style={[common.textCenter]}>Вы впервые на BitChange?</Text>
                            <Text style={[common.textLink, common.textCenter]}>Зарегистрируйтесь прямо сейчас!</Text>
                        </View>
                    </Touchable>
                </View>
            </View>));
    }
}

const styles = StyleSheet.create({
    error: {
        color: '#dd0057',
        marginBottom: 4,
        fontFamily: fonts.regular.regular,
    },
    pageHeader: {
        textAlign: 'center',
        fontSize: 32,
        color: 'black',
        fontWeight: "700",
        fontFamily: fonts.medium.regular,
        margin: 24,
    },
    paddingScreen: {
        padding: 16,
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
    },
    formBlock: {
        paddingHorizontal: 20,
        paddingVertical: 32,
        borderRadius: 8,
        backgroundColor: '#fff',
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
