import React, { Component } from 'react';

import {
    Text,
    View,
    StyleSheet,
    Alert, Image, ScrollView, ActivityIndicator
} from 'react-native';
import Api from "../../services/Api";
import Price from "../../values/Price";
import {currencyCodeToSymbol, tradePartner, tradeType, tradeTypeBuy, tradeTypeSell} from "../../helpers";
import PrimaryButton from "../../style/PrimaryButton";
import EscrowTimer from "./EscrowTimer";
import PartnerLink from "./PartnerLink";
import Separator from "../../style/Separator";
import TradeTrivia from "./TradeTrivia";
import TradeAdvices from "./TradeAdvices";
import {createBasicNavigationOptions, withCommonStatusBar} from "../../style/navigation";

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

export default class Trade extends Component {
    static navigationOptions = createBasicNavigationOptions('Сделка');

    state = {
        pending: false,
        errors: undefined
    };

    componentDidMount() {
        this.props.updatePartnerActivity({[this.partner.id]: this.partner.online})
    }

    tradeActionHandlerFactory = (endpoint) => () => {
        Alert.alert('Вы уверены?', undefined, [
            {text: 'Отмена', onPress: () => {}, style: 'cancel'},
            {text: 'Да', onPress: () => {
                    Api.post(`/trades/${this.props.trade.id}${endpoint}`)
                        .then(response => {
                            this.props.update(response.data.trade);
                            this.setState({pending: false});
                        }).catch(error => {
                            const newState = {pending: false};

                            console.warn(JSON.stringify(error, undefined, 2));
                            if (error.response.status === 405) {
                                newState.errors = error.response.data.errors;
                            }

                            this.setState(newState);
                        });

                    this.setState({pending: true})
                }},
        ]);
    };

    onPaidHandler = this.tradeActionHandlerFactory('/confirm');
    onCancelHandler = this.tradeActionHandlerFactory('/cancel');
    onCompleteHandler = this.tradeActionHandlerFactory('/complete');

    get createdAt() {
        let date = new Date(this.props.trade.created_at);

        let day = ("0" + date.getDate()).slice(-2);
        let month = ("0" + (date.getMonth() + 1)).slice(-2);
        let year = date.getFullYear();

        let hours = ("0" + date.getHours()).slice(-2);
        let minutes = ("0" + date.getMinutes()).slice(-2);
        return day + '.' + month + '.' + year + ' ' + hours + ':' + minutes;
    }

    renderBuyActionBlock(status) {
        if (status === 'new') {
            return <View style={styles.formRow}>
                    <PrimaryButton onPress={this.onCancelHandler} title={'Отменить сделку'} color={'#C00'} style={{margin: 8, flex: 1}}/>
                    <PrimaryButton onPress={this.onPaidHandler} title={'Оплатить сделку'} style={{margin: 8, flex: 1}}/>
                </View>
        }
    }

    renderSellActionBlock(status) {
        if (['paid_confirmed', 'expired_and_paid'].includes(status)) {
            return <PrimaryButton onPress={this.onCompleteHandler} title={'Отпустить крипту'} style={{margin: 8}}/>;
        }
    };

    renderActionBlock = () => {
        if(!this.isTradeLoaded){
            return undefined;
        }

        if(this.state.pending) {
            return <ActivityIndicator size="large" />
        }
        const { status } = this.props.trade;
        return this.isUserBuying() ? this.renderBuyActionBlock(status) : this.renderSellActionBlock(status);
    };

    isUserBuying = () => {
        return this.isTradeLoaded() && (tradeType(this.props.trade, this.props.user.id) === tradeTypeBuy);
    };

    isTradeLoaded = () => {
        return !!this.props.trade.status;
    };

    get partner() {
        return this.isTradeLoaded() ? tradePartner(this.props.trade, this.props.user.id) : "";
    }

    get actionTitle () {
        return this.isUserBuying() ? 'ПОКУПКУ ОНЛАЙН' : 'ПРОДАЖУ ОНЛАЙН';
    }

    render() {
        let trade = this.props.trade || {};
        let ad = trade.ad || {};

        return withCommonStatusBar(<ScrollView keyboardShouldPersistTaps='always'>
            <View>
                    <Text style={[styles.header, styles.centeredText]}>{ad.payment_details}</Text>
                    <View style={styles.info}>
                        <Text style={[styles.huge, styles.centeredText]}>{ad.payment_method_code}</Text>
                        <Text style={styles.centeredText}><Text style={styles.header}>Цена за 1 {ad.crypto_currency_code}:</Text> <Text style={[styles.huge, {color: '#25367E'}]}>{Price.build(ad.price).viewMain} {currencyCodeToSymbol(ad.currency_code)}</Text></Text>
                    </View>

                {
                    this.isTradeLoaded() ? <View style={{padding: 8, backgroundColor: 'white'}}>
                        <Text>Ваш запрос Трейдеру <Text style={styles.bold}>{this.partner.user_name}</Text> на <Text
                            style={styles.bold}>{this.actionTitle}</Text> криптовалюты от <Text>{this.createdAt}</Text></Text>
                        <Text style={[styles.header, styles.centeredText]}>
                            {Price.build(trade.amount * trade.price).viewMain} {ad.currency_code + ' '}
                            <Image source={require('../../img/ic_swap.png')} style={[styles.pickerIcon, {margin: 16}]}/>
                            {' ' + Price.build(trade.amount).viewCrypto} {ad.crypto_currency_code}
                        </Text>
                        {
                            this.props.trade.status === 'new' && <Text>Осталось для оплаты <EscrowTimer
                                expiredAt={this.props.trade.escrow_expired_at}/> минут</Text>
                        }
                    </View> : <ActivityIndicator size="large"/>
                }

                    {this.renderActionBlock()}

                    <PartnerLink user={this.partner} isSeller={this.isUserBuying()}  onProfileOpen={this.props.openProfile}
                                 online={this.props.partnerActivityStatuses[this.partner.id]} />

                    <Separator/>

                    <TradeTrivia ad={ad}/>

                    <TradeAdvices/>
            </View>
        </ScrollView>);
    }
}