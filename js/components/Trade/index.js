import React, { Component } from 'react';

import {
    StyleSheet,
    Alert, ActivityIndicator
} from 'react-native';
import Api from "../../services/Api";

import { tradePartner, tradeType, tradeTypeBuy } from "../../helpers";
import Buy from './Buy';
import Sell from './Sell';
import { createBasicNavigationOptions } from "../../style/navigation";
import Feedback from "./Feedback";

export default class Trade extends Component {
    static navigationOptions = createBasicNavigationOptions('Сделка');

    state = {
        pending: false,
        errors: undefined
    };

    componentDidMount = () => {
        this.props.updatePartnerActivity({[this.partner.id]: this.partner.online});
        //this.socket = new WebSocket('ws://91.228.155.81/cable');
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

                            //console.warn(JSON.stringify(error, undefined, 2));
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

    renderBuyActionBlock() {
        return <Buy
            socket={this.socket} 
            partnerName={this.partner.user_name} 
            isOnline = {this.props.partnerActivityStatuses[this.partner.id]} 
            {...this.props}/>;
    }

    renderSellActionBlock() {
        return <Sell
            socket={this.socket} 
            partnerName={this.partner.user_name} 
            isOnline = {this.props.partnerActivityStatuses[this.partner.id]}
            createdAt = {this.createdAt} 
            {...this.props}/>;
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
        return this.renderActionBlock();
    }
}