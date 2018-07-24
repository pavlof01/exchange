import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Validator from '../../services/Validator';
import {
    View,
    Text,
    KeyboardAvoidingView,
    Image,
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
import LinearGradient from 'react-native-linear-gradient';
import Logo from '../../../assets/img/logo.png';
import LogoText from '../../../assets/img/text.png';

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
        return (
            <KeyboardAvoidingView keyboardVerticalOffset={400} style={{flex:1}}><LinearGradient colors={['#3F579E', '#426CA6', '#426CA6', '#384D8C', '#203057']} style={[styles.paddingScreen]}>
                <View style={styles.logoContainer}>
                    <Image style={{marginBottom:'10%'}} source={Logo} />
                    <Image source={LogoText} />
                </View>
                <View>
                    <View>
                        <FormTextInput
                            style={{marginBottom: '10%', borderColor:'#94B7FF'}}  
                            textStyle={{color:'#fff', fontSize: 18}}  
                            key={'login'}
                            error={!_.isEmpty(this.state.formError.loginError)}
                            ref={(ref) => (this.loginInput = ref)}
                            placeholder="Enter username"
                            placeholderTextColor="#B8CFFF"
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
                            style={{borderColor:'#94B7FF'}}
                            textStyle={{color:'#fff', fontSize: 18}}  
                            key={'pass'}
                            error={!_.isEmpty(this.state.formError.passwordError)}
                            ref={(ref) => (this.passwordInput = ref)}
                            placeholder="Enter password"
                            placeholderTextColor="#B8CFFF"
                            secureTextEntry
                            onChangeText={(password) => {
                                this.setState({passwordValue: password});
                            }}
                            onSubmitEditing={this.onLoginPressed}
                        />
                        <BorderlessButton
                            style={{height:20}}
                            textStyle={{fontWeight:'400', color:'#B8CFFF', fontSize:12, textAlign:'right'}} 
                            onPress={this.onRecoverRequestPressed} 
                            title={'Forgot password?'} />
                        <Text style={[styles.error]}>{this.state.formError.passwordError}</Text>
                        <Text style={[styles.error,{marginBottom:20}]}>{this.state.formError.serverError}</Text>
                        <PrimaryButton onPress={this.onLoginPressed} title={'SIGN'} disabled={this.props.isFetching} >
                            {this.props.isFetching ? <ActivityIndicator size="large"/> : undefined}
                        </PrimaryButton>
                        
                    </View>
                    <Touchable onPress={this.onSignUpPressed}>
                        
                    </Touchable>
                        </View>
            </LinearGradient></KeyboardAvoidingView>
            );
    }
}

const styles = StyleSheet.create({
    error: {
        color: '#FFCACA',
        marginBottom: 4,
        fontFamily: fonts.regular.regular,
        textAlign: 'center'
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
        padding: 42,
        flexDirection: 'column',
        flex: 1,
        //justifyContent: 'center',
    },
    formBlock: {
        paddingHorizontal: 20,
        paddingVertical: 32,
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    logoContainer: {
        alignItems:'center',
        marginBottom: '15%',
        marginTop: '15%',
    }
});

Login.propTypes = {
    formError: PropTypes.string,
    isFetching: PropTypes.bool,
    login: PropTypes.func,
    recoverPasswordRequest: PropTypes.func,
    signUpRequest: PropTypes.func,
    fetchDictionary: PropTypes.func,
};
