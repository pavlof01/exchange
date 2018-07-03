import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {ActivityIndicator, FlatList, Image, StyleSheet, Text, View,} from 'react-native';
import TopButton from "../../style/TopButton";
import Separator from "../../style/Separator";
import HeaderBar from "../../style/HeaderBar";
import Price from "../../values/Price";
import CardPicker from "../../style/CardPicker";
import {MenuOption} from "react-native-popup-menu";
import Touchable from "../../style/Touchable";
import OnlineStatus from "../../style/OnlineStatus";
import {currencyCodeToSymbol} from "../../helpers";
import {cryptoIcons} from "../../style/resourceHelpers";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 48,
        paddingLeft: 8,
        paddingRight: 8,
    },
    pickerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
    inputHint: {
        marginLeft: 8,
        fontSize: 11
    },
    userName: {
        fontWeight: 'bold',
        color: '#333333',
        fontSize: 16,
        marginLeft: 4,
        flex: 1,
    },
    amount: {
        color: '#111111',
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
    },
    limitsAmount: {
        color: '#111111',
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 2,
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
    },
    alternate_background: {
        backgroundColor: '#EEEEEE'
    }
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
    renderItem = ({item, index}) => {
        const ad = item;
        const alt = index % 2 === 1;
        return (
            <Touchable onPress={() => this.openNewTrade(ad)}>
                <View style={[styles.rowContainer, alt ? styles.alternate_background : undefined]}>
                    <OnlineStatus isOnline={ad.user.online}/>
                    <Text style={styles.userName}>{ad.user.user_name}</Text>
                    {ad.payment_method_banks.map(
                        bank => <Text key={bank.id}>{bank.name}</Text>
                    )}
                    <Text style={styles.limitsAmount}>{currencyCodeToSymbol(ad.currency_code)}{Price.build(ad.limit_min).viewMain} – {Price.build(ad.limit_max).viewMain}</Text>
                    <Text style={styles.amount}>{currencyCodeToSymbol(ad.currency_code)}{Price.build(ad.price).viewMain} </Text>
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
            <View style={styles.container}>
                <HeaderBar title={header}/>
                {/*{this.actionName}*/}

                <View style={styles.rowContainer}>
                    <TopButton title={'BUY'} onPress={this.onActionCodeChangeToBuy} selected={this.props.filter.type === 'buy'} selectedColor={'green'} color={'black'}/>

                    <Separator vertical/>

                    <TopButton title={'SELL'} onPress={this.onActionCodeChangeToSell} selected={this.props.filter.type === 'sell'} selectedColor={'red'} color={'black'}/>
                </View>

                <Separator />

                <View style={styles.pickerRow}>
                    <View>
                        <Text style={styles.inputHint}>YOU {this.props.filter.type === 'buy' ? 'BUY' : 'SELL'}</Text>
                        <CardPicker style={styles.picker} onValueChange={this.onCryptoCurrencyCodeChange}
                                selectedValue={this.props.filter.cryptoCurrencyCode} mode={'dropdown'}
                                renderButton={Offers.CryptItem}>
                            {this.props.cryptoCurrencies.map(
                                currency => <MenuOption key={currency.code} value={currency.code}>
                                    {Offers.CryptItem(currency.code)}
                                </MenuOption>
                            )}
                        </CardPicker>
                    </View>

                    <Image source={require('../../img/ic_swap.png')} style={[styles.pickerIcon, {margin: 16, marginTop: 32}]}/>

                    <View>
                        <Text style={styles.inputHint}>FOR</Text>
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
                </View>

                <Text style={styles.inputHint}>SELECT PAYMENT METHOD</Text>
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

                    <ActivityIndicator size="large" style={{margin: 16}} /> :

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