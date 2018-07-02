import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    Text,
    View,
    StyleSheet, ScrollView,
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
    formStyle: {
        flex: 1,
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

        return (<View>
            <FormTextInput
                placeholder={'0'}
                onChangeText={onChange}/>
            <Text>Лимит: {isCrypt ? min.viewCrypto : min.viewMain} – {isCrypt ? max.viewCrypto : max.viewMain} {currencyCodeToSymbol(curCode)}</Text>
        </View>);
    }

    renderFiatCurrencyInput() {
        const { ad } = this.state;
        return NewTrade.renderCurrencyInput(ad.limitMin, ad.limitMax, ad.currencyCode, false, this.onCostChange);
    }

    renderCryptoCurrencyInput() {
        const { ad } = this.state;
        return NewTrade.renderCurrencyInput(ad.limitMin / ad.price, ad.limitMax / ad.price, ad.cryptoCurrencyCode, true, this.onAmountChange);
    }

    render() {
        const { ad } = this.state;
        const { user } = ad;
        return (
            <ScrollView>
                <View>
                    <View style={styles.pickerRow}>
                        {this.renderFiatCurrencyInput()}
                        {this.renderCryptoCurrencyInput()}
                    </View>

                    <FormTextInput
                        placeholder={'Можете оставить сообщение с дополнительной информацией'}/>
                    <Text>Окно оплаты счёта продавца: {ad.escrowTime || 90} минут</Text>

                    <PrimaryButton title={'Отправить запрос Трейдеру'}/>

                    <View style={styles.row}>
                        <Text>{ad.type === 'Ad::Buy' ? 'Покупатель' : 'Продавец'}</Text>
                        <OnlineStatus isOnline={ad.user.online}/>
                        <Text>{user.userName} ({User.approximateTradesCount(user.completedTradesCount)})</Text>
                        <Text>{user.feedbackGrade}%</Text>
                    </View>

                    <Separator/>

                    <Text>Страна: {ad.countryCode}</Text>

                    {ad.conditions && <Text>Условия сделки:</Text>}
                    {ad.conditions && <Text>{ad.conditions}</Text>}

                    <View>
                        <Text>Советы</Text>
                        <Text>Прочитайте объявление и проверьте условия.</Text>
                        <Text>Предложите место встречи и время, если необходима сделка с наличными.</Text>
                        <Text>Остерегайтесь мошенников! Проверяйте отзывы в профиле и проявляйте особую осторожность с недавно зарегистрированными пользователями.</Text>
                        <Text>Обратите внимание, что округления и колебания цен могут изменить окончательную сумму в биткоинах. Сумма фиатных денег, вводимая вами, имеет значение, и сумма в биткоинах рассчитывается на момент запроса.</Text>
                    </View>

                    <View>
                        <Text>BitChange обеспечивает вашу безопасность</Text>
                        <Text>Криптовалюта блокируется в депонировании платежа на BitChange, после того как вы отправили запрос. Оплатите счёт, отметьте его как оплаченный, и продавец отправит Вам криптовалюту, когда перечисление платежа отразится на его счете.</Text>
                        <Text>Обратите внимание: в настоящий момент вы можете запросить депонирование не больше, чем на 0.44 BTC. Вы сможете покупать на большую сумму, как только у вас будет достаточный объем сделок и репутация. Именно Продавец устанавливает ограничения.</Text>
                        <Text>Депонирование платежей защищает и Покупателя, и Продавца в онлайн-сделках.</Text>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

NewTrade.propTypes = {
    isFetching: PropTypes.bool,
};