import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    Text,
    View,
    StyleSheet, CheckBox, Picker,
} from 'react-native';
import FormTextInput from "../FormTextInput";

const styles = StyleSheet.create({
    centerContent: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    picker: {
        height: 50,
        width: 100,
    },
});

export default class Offers extends Component {

    constructor(props) {
        super(props);

        this.state = {
            actionCode: "buy"
        }
    }

    componentDidMount() {
        this.props.fetchCurrencies();
        this.props.fetchPaymentMethods();
        this.props.fetchCountries();
    }

    onFilterChangeFactory = (name) => (value) => {
        this.props.updateFilter({ [name]: value });
    };

    onCryptoCurrencyCodeChange = this.onFilterChangeFactory('cryptoCurrencyCode');
    onCurrencyCodeChange = this.onFilterChangeFactory('currencyCode');
    onPaymentMethodCodeChange = this.onFilterChangeFactory('paymentMethodCode');
    onCountryCodeChange = this.onFilterChangeFactory('countryCode');


    onCheckboxChange = (value) => {
        this.props.updateFilter({
            'smsRequired': value ? false : null,
        });
    };

    render() {
        return (
            <View style={styles.centerContent}>
                {/*{this.actionName}*/}

                <Picker style={styles.picker} selectedValue={this.state.actionCode} onValueChange={(value, index) => this.setState({actionCode: value})} mode={'dropdown'}>
                    <Picker.Item value="buy" label={'Купить'}/>
                    <Picker.Item value="sell" label={'Продать'}/>
                </Picker>
                {/*{this.props.filter.cryptoCurrencyCode}*/}

                <Picker style={styles.picker} onValueChange={this.onCryptoCurrencyCodeChange} selectedValue={this.props.filter.cryptoCurrencyCode}>
                    {this.props.cryptoCurrencies.map(
                        currency => <Picker.Item key={currency.code} value={currency.code} label={currency.code}/>
                    )}
                </Picker>
                {/*{this.props.filter.currencyCode}*/}

                <Picker style={styles.picker} onValueChange={this.onCurrencyCodeChange} selectedValue={this.props.filter.currencyCode}>
                    {this.props.currencies.map(
                        currency => <Picker.Item key={currency.code} value={currency.code} label={currency.code}/>
                    )}
                </Picker>


                {/*{this.props.filter.paymentMethodCode || 'Любым способом'}*/}
                <Picker style={styles.picker} onValueChange={this.onPaymentMethodCodeChange} selectedValue={this.props.filter.paymentMethodCode || ''}>
                    <Picker.Item value="ANY" label={'любым способом'} />
                    {this.props.paymentMethods.map(
                        method => <Picker.Item key={method.code} value={method.code} label={method.name}/>
                    )}
                </Picker>

                {/*в стране*/}
                {/*{this.props.filter.countryCode}*/}
                <Picker style={styles.picker} onValueChange={this.onCountryCodeChange} selectedValue={this.props.filter.countryCode}>
                    {this.props.countries.map(
                        country => <Picker.Item key={country.code} value={country.code} label={country.name}/>
                    )}
                </Picker>

                <FormTextInput placeholder={'Сбербанк, банкомат и пр.'}/>
                <View>
                    <CheckBox
                        value={this.props.filter.smsRequired !== null}
                        onValueChange={this.onCheckboxChange}/>
                    {/*Без смс*/}
                </View>

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
};