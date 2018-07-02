import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { FlatList, Image, StyleSheet, Text, View,} from 'react-native';
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
import {currencyCodeToSymbol} from "../../helpers";

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
    pickerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
    },
    pickerIcon: {
        height: 24,
        width: 24,
    },
    picker: {
        height: 50,
        width: 100,
    },
    cardText: {
        fontSize: 24,
        color: '#333333',
        margin: 8,
        fontWeight: "bold",
    },
    currency_circle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#c3c3c3',
        alignItems: 'center',
        justifyContent: 'center',
    },
    currency_symbol: {
        fontSize: 16,
        fontWeight: "bold",
        color: '#c3c3c3',
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    }
});

const cryptoIcons = {
    BTC: require('../../img/ic_btc.png'),
    ETH: require('../../img/ic_eth.png')
};

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

    static ItemWithIcon(label, icon) {
        return (<View style={styles.pickerRow}>{icon}<Text style={styles.cardText}>{label}</Text></View>)
    }

    static CryptItem(code) {
        return Offers.ItemWithIcon(code, <Image source={cryptoIcons[code]} style={styles.pickerIcon} resizeMode='contain'/>);
    }

    static FiatItem(code) {
        return Offers.ItemWithIcon(code, <View style={styles.currency_circle}><Text style={styles.currency_symbol}>{currencyCodeToSymbol(code)}</Text></View>);
    }

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
                    <CardPicker style={styles.picker} onValueChange={this.onCryptoCurrencyCodeChange}
                            selectedValue={this.props.filter.cryptoCurrencyCode} mode={'dropdown'}
                            renderButton={Offers.CryptItem}>
                        {this.props.cryptoCurrencies.map(
                            currency => <MenuOption key={currency.code} value={currency.code}>
                                {Offers.CryptItem(currency.code)}
                            </MenuOption>
                        )}
                    </CardPicker>

                    <Image source={require('../../img/ic_swap.png')} style={[styles.pickerIcon, {margin: 16}]}/>

                    <CardPicker style={styles.picker} onValueChange={this.onCurrencyCodeChange}
                            selectedValue={this.props.filter.currencyCode} mode={'dropdown'}
                                renderButton={Offers.FiatItem}>
                        {this.props.currencies.map(
                            currency => <MenuOption key={currency.code} value={currency.code}>
                                    {Offers.FiatItem(currency.code)}
                            </MenuOption>
                        )}
                    </CardPicker>
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