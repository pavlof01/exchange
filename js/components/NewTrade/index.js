import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    Text,
    View,
    StyleSheet, ScrollView, Image,
} from 'react-native';
import {createBasicNavigationOptions} from "../../style/navigation";
import FormTextInput from "../FormTextInput";
import Price from "../../values/Price";
import {currencyCodeToSymbol} from "../../helpers";
import PrimaryButton from "../../style/PrimaryButton";
import OnlineStatus from "../../style/OnlineStatus";
import Separator from "../../style/Separator";
import User from "../../models/User";

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
});



export default class NewTrade extends Component {
    static navigationOptions = createBasicNavigationOptions('Новая сделка');

    state = {
        ad: this.props.navigation.getParam('ad', {id: 'NO-ID'})
    };

    onCostChange = (value) => {
        value = value || 0.0;
        value = value / this.state.ad.price;
        this.form.setValue('amount', Price.build(value).viewCrypto);
    };

    onAmountChange = (value) => {
        value = value || 0.0;
        value = value * this.state.ad.price;
        this.form.setValue('cost', value.toFixed(2));
    };

    static renderCurrencyInput(limitMin, limitMax, curCode, isCrypt, onChange) {
        const min = Price.build(limitMin);
        const max = Price.build(limitMax);

        return (<View style={styles.formStyle}>
            <View style={styles.formRow}>
                <FormTextInput
                    style={styles.formStyle}
                    placeholder={'0'}
                    onChangeText={onChange}/>
                <Text style={styles.header}>{curCode}</Text>
            </View>
            <Text>Лимит:{'\n'}{isCrypt ? min.viewCrypto : min.viewMain} – {isCrypt ? max.viewCrypto : max.viewMain} {currencyCodeToSymbol(curCode)}</Text>
        </View>);
    }

    renderFiatCurrencyInput() {
        const { ad } = this.state;
        return NewTrade.renderCurrencyInput(ad.limit_min, ad.limit_max, ad.currency_code, false, this.onCostChange);
    }

    renderCryptoCurrencyInput() {
        const { ad } = this.state;
        return NewTrade.renderCurrencyInput(ad.limit_min / ad.price, ad.limit_max / ad.price, ad.crypto_currency_code, true, this.onAmountChange);
    }

    render() {
        const { ad } = this.state;
        const { user } = ad;
        return (
            <ScrollView>
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
                        placeholder={'Можете оставить сообщение с дополнительной информацией'}/>
                    <Text style={styles.centeredText}>Окно оплаты счёта продавца:<Text style={styles.bold}>{'\n'}{ad.escrow_time || 90} минут</Text></Text>

                    <PrimaryButton title={'Отправить запрос Трейдеру'}/>

                    <View style={styles.row}>
                        <Text>{ad.type === 'Ad::Buy' ? 'Покупатель' : 'Продавец'}</Text>
                        <OnlineStatus isOnline={ad.user.online}/>
                        <Text>{user.user_name} ({User.approximateTradesCount(user.completed_trades_count)})</Text>
                        <Text>{user.feedback_grade}%</Text>
                    </View>

                    <Separator/>

                    <Text style={styles.row}><Text style={styles.bold}>Страна:</Text> {ad.country_code}</Text>

                    {ad.conditions && <View style={styles.info}>
                        <Text>Условия сделки:</Text>
                        <Text>{ad.conditions}</Text>
                    </View>}

                    <View style={styles.info}>
                        <Text style={styles.header}>Советы</Text>
                        <Text style={styles.infoText}>Прочитайте объявление и проверьте условия.</Text>
                        <Text style={styles.infoText}>Предложите место встречи и время, если необходима сделка с наличными.</Text>
                        <Text style={styles.infoText}>Остерегайтесь мошенников! Проверяйте отзывы в профиле и проявляйте особую осторожность с недавно зарегистрированными пользователями.</Text>
                        <Text style={styles.infoText}>Обратите внимание, что округления и колебания цен могут изменить окончательную сумму в биткоинах. Сумма фиатных денег, вводимая вами, имеет значение, и сумма в биткоинах рассчитывается на момент запроса.</Text>
                    </View>

                    <View style={styles.info}>
                        <Text style={styles.header}>BitChange обеспечивает вашу безопасность</Text>
                        <Text style={styles.infoText}>Криптовалюта блокируется в депонировании платежа на BitChange, после того как вы отправили запрос. Оплатите счёт, отметьте его как оплаченный, и продавец отправит Вам криптовалюту, когда перечисление платежа отразится на его счете.</Text>
                        <Text style={styles.bold}>Обратите внимание: в настоящий момент вы можете запросить депонирование не больше, чем на 0.44 BTC. Вы сможете покупать на большую сумму, как только у вас будет достаточный объем сделок и репутация. Именно Продавец устанавливает ограничения.</Text>
                        <Text style={styles.infoText}>Депонирование платежей защищает и Покупателя, и Продавца в онлайн-сделках.</Text>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

NewTrade.propTypes = {
    isFetching: PropTypes.bool,
};