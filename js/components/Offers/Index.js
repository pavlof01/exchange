import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {ActivityIndicator, FlatList, Picker, StyleSheet, Text, View,} from 'react-native';
import TopButton from "./TopButton";
import Separator from "../../style/Separator";
import HeaderBar from "../../style/HeaderBar";
import Price from "../../values/Price";
import CenterProgressBar from "../../style/CenterProgressBar";
import CardPicker from "../../style/CardPicker";
import {MenuOption} from "react-native-popup-menu";
import Touchable from "../../style/Touchable";
import {newTrade} from "../../actions/navigation";
import OnlineStatus from "../../style/OnlineStatus";

const styles = StyleSheet.create({
    centerContent: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 48,
    },
    picker: {
        height: 50,
        width: 100,
    },
    cardText: {
        fontSize: 24,
        color: 'black',
    },
});

export default class Offers extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchCurrencies();
        this.props.fetchPaymentMethods();
        this.props.fetchCountries();
    }

    onFilterChangeFactory = (name) => (value) => {
        this.props.updateFilter({[name]: value});
    };

    onCryptoCurrencyCodeChange = this.onFilterChangeFactory('cryptoCurrencyCode');
    onCurrencyCodeChange = this.onFilterChangeFactory('currencyCode');
    onPaymentMethodCodeChange = this.onFilterChangeFactory('paymentMethodCode');
    onActionCodeChangeToBuy = () => this.props.updateFilter({type: 'buy', sort: '-price'});
    onActionCodeChangeToSell = () => this.props.updateFilter({type: 'sell', sort: 'price'});

    openNewTrade = (ad) => {
        this.props.newTrade(ad)
    };

    // /new_trade/${ad.id}
    renderItem = (it) => {
        const ad = it.item;
        return (
            <Touchable onPress={() => this.openNewTrade(ad)}>
                <View style={styles.rowContainer}>
                    <OnlineStatus isOnline={ad.user.online}/>
                    <Text>{ad.user.user_name}</Text>
                    {ad.payment_method_banks.map(
                        bank => <Text key={bank.id}>{bank.name}</Text>
                    )}
                    <Text>{Price.build(ad.limit_min).viewMain} – {Price.build(ad.limit_max).viewMain}</Text>
                    <Text>{Price.build(ad.price).viewMain} </Text>
                </View>
            </Touchable>);
    };

    render() {
        let header;
        if(this.props.filter.type === 'buy') {
            header = 'BUY OFFERS';
        } else {
            header = 'SELL OFFERS';
        }
        return (
            <View>
                <HeaderBar title={header}/>
                {/*{this.actionName}*/}

                <View style={styles.rowContainer}>
                    <TopButton title={'КУПИТЬ'} onPress={this.onActionCodeChangeToBuy} selected={this.props.filter.type === 'buy'} selectedColor={'green'} color={'black'}/>
                    <TopButton title={'ПРОДАТЬ'} onPress={this.onActionCodeChangeToSell} selected={this.props.filter.type === 'sell'} selectedColor={'red'} color={'black'}/>
                </View>

                <Separator />

                <View style={styles.rowContainer}>
                    <Picker style={styles.picker} onValueChange={this.onCryptoCurrencyCodeChange}
                            selectedValue={this.props.filter.cryptoCurrencyCode} mode={'dropdown'}>
                        {this.props.cryptoCurrencies.map(
                            currency => <Picker.Item key={currency.code} value={currency.code} label={currency.code}/>
                        )}
                    </Picker>

                    <Picker style={styles.picker} onValueChange={this.onCurrencyCodeChange}
                            selectedValue={this.props.filter.currencyCode} mode={'dropdown'}>
                        {this.props.currencies.map(
                            currency => <Picker.Item key={currency.code} value={currency.code} label={currency.code}/>
                        )}
                    </Picker>
                </View>

                <CardPicker style={styles.picker} onValueChange={this.onPaymentMethodCodeChange}
                        selectedValue={this.props.filter.paymentMethodCode || 'ANY'}
                            renderButton={(value, text) => <Text style={styles.cardText}>{text}</Text>}>
                    <MenuOption value="ANY" text={'любым способом'}/>
                    {this.props.paymentMethods.map(
                        method => <MenuOption key={method.code} value={method.code} text={method.name}/>
                    )}
                </CardPicker>

                <Separator />

                {this.props.orders.pending ?

                    <CenterProgressBar /> :

                    <FlatList data={this.props.orders.list}
                              renderItem={this.renderItem}/>}

            </View>
        )
    }
}

Offers.propTypes = {
    isFetching: PropTypes.bool,
    updateFilter: PropTypes.func,
    fetchCurrencies: PropTypes.func,
    fetchPaymentMethods: PropTypes.func,
    fetchCountries: PropTypes.func,
    newTrade: PropTypes.func,
};