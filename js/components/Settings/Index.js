import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    ActivityIndicator, ScrollView,
    StyleSheet, Switch,
    Text, TextInput,
    View,
} from 'react-native';
import Touchable from '../../style/Touchable';
import BorderlessButton from "../../style/BorderlessButton";
import OwnProfileLink from "./OwnProfileLink";
import Separator from "../../style/Separator";
import FormTextInput from "../FormTextInput";
import PrimaryButton from "../../style/PrimaryButton";
import HeaderBar from "../../style/HeaderBar";

const styles = StyleSheet.create({
    centerContent: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        color: '#222222',
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 8,
    },
    bold: {
        margin: 2,
        fontSize: 16,
        fontWeight: 'bold',
    },
    wideRowItem: {
        flex: 2,
    },
    rowItem: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        padding: 4,
        alignItems: 'center',
    },
    row2: {
        flexDirection: 'row',
        padding: 8,
    },
    info: {
        backgroundColor: 'white',
        margin: 8,
        padding: 8,
        borderRadius: 4,
    },
    infoText: {
        margin: 2,
        fontSize: 16,
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

const Header = (props) => <Text style={styles.header}>{props.children}</Text>;
const Bold = (props) => <Text style={styles.bold}>{props.children}</Text>;

export default class Settings extends Component {
    state = {
        pending: false,
        introduction: this.props.user.introduction,
        ad_sell_enabled: this.props.user.ad_buy_enabled,
        ad_buy_enabled: this.props.user.ad_sell_enabled };

    componentWillReceiveProps({ user }) {
        const { user : { introduction, ad_buy_enabled, ad_sell_enabled }} = this.props;
        this.setState({
            pending: false,
            ...(introduction !== user.introduction ? { introduction: user.introduction } : {}),
            ...(ad_buy_enabled !== user.ad_buy_enabled ? { ad_buy_enabled: user.ad_buy_enabled } : {}),
            ...(ad_sell_enabled !== user.ad_sell_enabled ? { ad_sell_enabled: user.ad_sell_enabled } : {}),
        });
    }

    onSubmitUserMeta = () => {

        const { user : { introduction, ad_buy_enabled, ad_sell_enabled }} = this.props;

        const meta = {
            ...(introduction !== this.state.introduction ? { introduction: this.state.introduction } : {}),
            ...(ad_buy_enabled !== this.state.ad_buy_enabled ? { ad_buy_enabled: this.state.ad_buy_enabled } : {}),
            ...(ad_sell_enabled !== this.state.ad_sell_enabled ? { ad_sell_enabled: this.state.ad_sell_enabled } : {}),
        };

        this.props.updateUserMeta(meta);

        // this.setState({pending:true});
    };

    onLogoutPressed = () => this.props.logout();
    onIntroductionChanged = (value) => this.setState({ introduction: value });
    onAdBuyEnabledChanged = (value) => this.setState({ ad_buy_enabled: value });
    onAdSellEnabledChanged = (value) => this.setState({ ad_sell_enabled: value });

  render() {
        const { user } = this.props;

        return (
        <View>
            <HeaderBar title={'SETTINGS'}/>
            <View style={styles.row}>
                <View style={styles.wideRowItem}>
                    <OwnProfileLink user={this.props.user} onProfileOpen={this.props.openProfile} />
                </View>
                <View style={styles.rowItem}>
                    <BorderlessButton
                        onPress={this.onLogoutPressed}
                        textStyle={{fontWeight: 'bold'}}
                        title={'Logout'}
                    />
                </View>
            </View>

            <ScrollView keyboardShouldPersistTaps='always'>

                <View style={styles.info}>
                    {!user.email_verified_date && <Text style={styles.warning}>
                        Вы еще не подтвердили вашу электронную почту.
                        У вас осталось примерно <Bold>2&nbsp;дня, 23&nbsp;часа</Bold>,
                        до того как срок действия email подтверждения истечет. Проверьте вашу почту.
                    </Text>}


                    <Header>E-mail</Header>
                    <Bold>{user.email}</Bold>

                    {!user.email_verified_date &&
                    <Text style={[styles.bold, {color: 'red'}]}>E-mail не подтвержден</Text>}

                    {user.email_verified_date &&
                    <Text style={[styles.bold, {color: 'green'}]}>E-mail подтвержден</Text>}

                    <Separator/>

                    <Header>О себе</Header>
                    <TextInput
                        onChangeText={this.onIntroductionChanged}
                        multiline
                        style={{height: 150}}
                        value={this.state.introduction ? this.state.introduction : ""}
                        onChange={this.onIntroductionChanged}
                        placeholder="Показывается в общедоступном профиле. Только текст, не более 200 символов."
                    />

                    <View style={styles.row2}>
                        <Text style={[styles.infoText, styles.rowItem]}>Продажи временно приостановлены</Text>
                        <Switch
                            value={this.state.ad_sell_enabled}
                            onValueChange={this.onAdSellEnabledChanged}/>
                    </View>

                    <View style={styles.row2}>
                        <Text style={[styles.infoText, styles.rowItem]}>Покупки временно приостановлены</Text>
                        <Switch
                            value={this.state.ad_buy_enabled}
                            onValueChange={this.onAdBuyEnabledChanged}/>
                    </View>

                    <PrimaryButton onPress={this.onSubmitUserMeta} title={'Сохранить профиль'} disabled={this.state.pending}>
                        {this.state.pending ? <ActivityIndicator size="large"/> : undefined}
                    </PrimaryButton>
                </View>
            </ScrollView>
        </View>
    )
  }
}

Settings.propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func,
};