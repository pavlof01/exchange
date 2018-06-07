import React, {Component} from 'react';

import Validator from '../../services/Validator';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import FormTextInput from '../../components/FormTextInput';
import * as authActions from '../../actions/authActions';

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

        let validationErrors = new Validator({presence: true}).validate(loginValue) || '';
        validationErrors = validationErrors + (new Validator({presence: true}).validate(passwordValue) || '');

        if (validationErrors !== '') {
            this.setState({formError: validationErrors});
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

                <TouchableOpacity
                    onPress={this.onLoginPressed}
                >
                    <View>
                        <Text>L O G I N</Text>
                    </View>
                </TouchableOpacity>
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

            <View className="login section">
                <View className="grid">
                    <Text className="login__title heading heading_1">Войти</Text>

                    <View>
                        {formType}
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    error: {
        color: '#dd0057',
    }
});
