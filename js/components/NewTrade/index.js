import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    Text,
    View,
    StyleSheet, ScrollView, Image, ActivityIndicator,
} from 'react-native';
import {createBasicNavigationOptions, withCommonStatusBar} from "../../style/navigation";
import FormTextInput from "../FormTextInput";
import Price from "../../values/Price";
import {currencyCodeToSymbol, objMap} from "../../helpers";
import PrimaryButton from "../../style/PrimaryButton";
import OnlineStatus from "../../style/OnlineStatus";
import Separator from "../../style/Separator";
import User from "../../models/User";
import Api from "../../services/Api";
import TradeAdvices from "../Trade/TradeAdvices";
import TradeTrivia from "../Trade/TradeTrivia";
import PartnerLink from "../Trade/PartnerLink";

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

export default class NewTrade extends Component {
    static navigationOptions = createBasicNavigationOptions('Новая сделка');

    state = {
        ad: this.props.navigation.getParam('ad', {id: 'NO-ID'}),
        form: {
            amount: undefined,
            cost: undefined,
            message: undefined,
        },
        pending: false,
        errors: undefined
    };

    componentDidMount() {
        this.setState({pending: true});
        Api.get('/pro/' + this.state.ad.id)
            .then(response => this.setState({ad: response.data.ad, pending: false}))
            .catch(error => alert('Ad not found'));
    }

    onCostChange = (value) => {
        value = value || 0.0;
        const amount = value / this.state.ad.price;
        this.setState({form: {...this.state.form, cost: value, amount: amount.toFixed(8)}});
    };

    onAmountChange = (value) => {
        value = value || 0.0;
        const cost = value * this.state.ad.price;
        this.setState({form: {...this.state.form, amount: value, cost: cost.toFixed(2)}});
    };

    onMessageChange = (value) => this.setState({form: {...this.state.form, message: value}});

    onSubmit = (values) => {
        this.setState({pending: true, errors: undefined});
        Api.post(`/pro/${this.state.ad.id}/trades`, {trade: values, ad: {price: this.state.ad.price}})
            .then(response => {
                this.setState({pending: false});
                this.props.openTrade(response.data.trade)
            })
            .catch(error => {
                const newState = {pending: false};

                if (error.response.status === 422) {
                    newState.errors = error.response.data.errors;
                } else if (error.response.status === 429) {
                    newState.errors = {opened_trade_ids: error.response.data.trade_ids};
                } else if (error.response.status === 410) {
                    newState.errors = {schedule: ['Трейдер в данный момент не работает, смотрите расписание']};
                } else if (error.response.status === 405) {
                    newState.errors = {yourself: ['Торговля с собой']};
                }

                this.setState(newState);
            });
    };

    static renderCurrencyInput(limitMin, limitMax, curCode, isCrypt, value, onChange) {
        const min = Price.build(limitMin);
        const max = Price.build(limitMax);

        return (<View style={styles.formStyle}>
            <View style={styles.formRow}>
                <FormTextInput
                    keyboardType='numeric'
                    style={styles.formStyle}
                    placeholder={'0'}
                    value={value}
                    onChangeText={onChange}/>
                <Text style={styles.header}>{curCode}</Text>
            </View>
            <Text>Лимит:{'\n'}{isCrypt ? min.viewCrypto : min.viewMain} – {isCrypt ? max.viewCrypto : max.viewMain} {currencyCodeToSymbol(curCode)}</Text>
        </View>);
    }

    renderFiatCurrencyInput() {
        const { ad, form } = this.state;
        return NewTrade.renderCurrencyInput(ad.limit_min, ad.limit_max, ad.currency_code, false, form.cost, this.onCostChange);
    }

    renderCryptoCurrencyInput() {
        const { ad, form } = this.state;
        return NewTrade.renderCurrencyInput(ad.limit_min / ad.price, ad.limit_max / ad.price, ad.crypto_currency_code, true, form.amount, this.onAmountChange);
    }

    render() {
        const { ad, pending, form } = this.state;
        const { user } = ad;
        return withCommonStatusBar(
            <ScrollView keyboardShouldPersistTaps='always'>
                <View>
                    <View style={styles.info}>
                        <Text style={[styles.huge, styles.centeredText]}>{ad.payment_method_code}</Text>
                        <Text style={styles.centeredText}><Text style={styles.header}>Цена за 1 {ad.crypto_currency_code}:</Text> <Text style={[styles.huge, {color: '#25367E'}]}>{Price.build(ad.price).viewMain} {currencyCodeToSymbol(ad.currency_code)}</Text></Text>
                    </View>
                    <View style={styles.pickerRow}>
                        {this.renderFiatCurrencyInput()}
                        <Image source={require('../../img/ic_swap.png')} style={[styles.pickerIcon, {margin: 16}]}/>
                        {this.renderCryptoCurrencyInput()}
                    </View>

                    <FormTextInput
                        placeholder={'Можете оставить сообщение с дополнительной информацией'}
                        onChangeText={this.onMessageChange}
                    />
                    <Text style={styles.centeredText}>Окно оплаты счёта продавца:<Text style={styles.bold}>{'\n'}{ad.escrow_time || 90} минут</Text></Text>

                    <PrimaryButton onPress={() => this.onSubmit(form)} title={'Отправить запрос Трейдеру'} disabled={pending} style={{margin: 8, flex: 1}}>
                        {pending ? <ActivityIndicator size="large"/> : undefined}
                    </PrimaryButton>

                    {
                        objMap(this.state.errors, (key, value) => <Text style={styles.warning} key={key}>{key}: {value.join('. ')}</Text>)
                    }

                    <PartnerLink user={user} online={user.online} isSeller={ad.type === 'Ad::Buy'}/>

                    <Separator/>

                    <TradeTrivia ad={ad}/>

                    <TradeAdvices/>
                </View>
            </ScrollView>
        )
    }
}

NewTrade.propTypes = {
    isFetching: PropTypes.bool,
    openTrade: PropTypes.func,
};