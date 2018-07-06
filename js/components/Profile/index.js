import React, { Component } from 'react';

import {
    ScrollView
} from 'react-native';
import Api from "../../services/Api";
import {createBasicNavigationOptions, withCommonStatusBar} from "../../style/navigation";
import ProfileInfo from "./ProfileInfo";

export default class Profile extends Component {
    static navigationOptions = createBasicNavigationOptions('Профиль');

    state = {
        profile: this.props.navigation.getParam('profile', {user_name: 'NO-ID'}),
        pending: false,
        errors: undefined
    };

    openFeedback = () => {
        this.props.openFeedback(this.state.profile.user_name)
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
            <ProfileInfo profile={this.state.profile} pending={this.state.pending} openFeedback={this.openFeedback}/>
        </ScrollView>);
    }
}