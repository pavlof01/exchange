import React, { Component } from 'react';

import {
    View,
    StyleSheet, ScrollView
} from 'react-native';
import Api from "../../services/Api";
import {createBasicNavigationOptions, withCommonStatusBar} from "../../style/navigation";
import ProfileInfo from "./ProfileInfo";

const styles = StyleSheet.create({
    centerContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
    },
    pickerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
    },
    formRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    formStyle: {
        flex: 1,
    },
    huge: {
        color: '#222222',
        fontSize: 26,
        marginBottom: 8,
    },
    header: {
        color: '#222222',
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 8,
    },
    info: {
        backgroundColor: 'white',
        margin: 8,
        padding: 8,
    },
    infoText: {
        margin: 2,
        fontSize: 16,
    },
    bold: {
        margin: 2,
        fontSize: 16,
        fontWeight: 'bold',
    },
    centeredText: {
        textAlign: 'center',
        flex: 1,
        margin: 8,
    },
    error: {
        color: '#dd0057',
        marginBottom: 4,
    },
    warning: {
        color: '#8b572a',
        backgroundColor: '#fbf5eb',
        borderColor: '#f5a623',
        borderRadius: 4,
        borderWidth: 1,
        padding: 8,
        margin: 8,
    }
});

export default class Profile extends Component {
    static navigationOptions = createBasicNavigationOptions('Профиль');

    state = {
        profile: this.props.navigation.getParam('profile', {user_name: 'NO-ID'}),
        pending: false,
        errors: undefined
    };

    componentDidMount() {
        this.load(this.state.profile.user_name);
    }

    load = (userName) => {
        this.setState({...this.state, pending: true});
        Api.get('/profiles/' + userName)
            .then(response => this.setState({profile: response.data.profile, pending: false}))
    };

    render() {
        return withCommonStatusBar(<ScrollView keyboardShouldPersistTaps='always'>
            <ProfileInfo profile={this.state.profile} pending={this.state.pending}/>
        </ScrollView>);
    }
}