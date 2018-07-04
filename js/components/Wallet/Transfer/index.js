import React, { Component } from 'react';

import {
    Text,
    View,
    StyleSheet, Image,
} from 'react-native';
import CardPicker from "../../../style/CardPicker";
import {MenuOption} from "react-native-popup-menu";
import {cryptoIcons} from "../../../style/resourceHelpers";

import {default as ProgressCircle} from 'react-native-progress-circle'
import FormTextInput from "../../FormTextInput";
import PrimaryButton from "../../../style/PrimaryButton";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 8,
    },
    centerContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pickerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
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
    inputHint: {
        fontSize: 11,
        textAlign: 'left',
    },
    hintRow: {
        marginTop: 4,
        flexDirection: 'row',
    },
    formStyle: {
        flex: 1,
    },
    formRow: {
        flex: 1,
        flexDirection: 'row',
    },
    header: {
        color: '#222222',
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 8,
    },
});

const DEFAULT_FORM_VALUES = {
    code: '',
    amount: '',
    address: '',
    password: '',
    currency: 'BTC',
    description: '',
};

const simpleCurrencyName = {
    BTC: 'Bitcoin',
    ETH: 'Ethereum',
};

export default class Transfer extends Component {

    state = {
        cryptoCurrencyCode: 'BTC',
        form: DEFAULT_FORM_VALUES,
        isConfirming: false,
    };

    componentWillMount() {
        const {currencyCode} = this.props;

        this.props.updateRates({ [currencyCode]: this.state.cryptoCurrencyCode });
        this.props.updateCurrencies();
        this.props.updateEstimatedFee({ currency: this.props.currencyCode });
    }

    componentWillReceiveProps({ withdrawal, exchangeRates, currency }) {
        const data = this.state;

        if (withdrawal.status === 200) {
            data.form  = { ...DEFAULT_FORM_VALUES };
            data.price = '';
            data.error.isSucceed = true;
            data.error.isConfirming = false;
        }

        if (withdrawal.status === 400) {
            data.error.isEmpty = true;
        }

        if (
            this.state.price &&
            this.props.exchangeRates !== exchangeRates &&
            exchangeRates[`${this.props.currency}_${this.state.currency}`]
        ) {
            data.price = data.form.amount * exchangeRates[`${this.props.currency}_${this.state.currency}`];
        }

        if (this.props.currency !== currency) {
            this.props.updateEstimatedFee({ currency });
            this.props.updateRates({ [currency]: this.state.currency });
        }

        console.warn(JSON.stringify(withdrawal));

        this.setState({ ...data, error: { ...withdrawal.error, ...data.error }});
    }

    onCostChange = (value) => {
        const rate  = this.props.exchangeRates[`${this.props.currencyCode}_${this.state.cryptoCurrencyCode}`];

        value = value || 0.0;
        const amount = value * rate;
        this.setState({form: {...this.state.form, cost: value, amount: amount.toFixed(8)}});
    };

    onAmountChange = (value) => {
        const rate  = this.props.exchangeRates[`${this.props.currencyCode}_${this.state.cryptoCurrencyCode}`];

        value = value || 0.0;
        const cost = value / rate;
        this.setState({form: {...this.state.form, amount: value, cost: cost.toFixed(2)}});
    };

    static ItemWithIcon(label, icon) {
        return (<View style={styles.pickerRow}>{icon}<Text style={styles.cardText}>{label}</Text></View>)
    }

    CryptItem = (code) => {
        const value = this.props.balance[code].value;
        return Transfer.ItemWithIcon(`${value} ${code}`, <Image source={cryptoIcons[code]} style={styles.pickerIcon} resizeMode='contain'/>);
    };

    onCryptoCurrencyCodeChange = (value) => this.setState({cryptoCurrencyCode: value});

    hint = (title) => <View style={styles.hintRow}><Text style={styles.inputHint}>{title}</Text></View>;

    onSubmitHandler = () => {
        if (this.state.isConfirming) {
            this.props.sendCryptoCurrency({ ...this.state.form, currency: this.props.currency })
        } else {
            this.setState({isConfirming: true});
        }
    };

    render() {
        const code = this.state.cryptoCurrencyCode;
        const {
            currencyCode,
            withdrawal: { pending },
        } = this.props;

        const submitButtonText = pending ? "WAIT" : this.state.isConfirming ? 'CONFIRM' : 'SEND';

        return (
            <View style={styles.container}>
                {this.hint('BALANCE')}
                <View style={styles.centerContent}>
                    <ProgressCircle
                        percent={15}
                        radius={128}
                        borderWidth={12}
                        shadowColor="#25367E"
                        color="#B6AFD0"
                        bgColor="#fff"
                    >
                        <CardPicker style={styles.picker} onValueChange={this.onCryptoCurrencyCodeChange}
                                    selectedValue={code}
                                    renderButton={this.CryptItem}>
                            {this.props.cryptoCurrencies.map(
                                currency => <MenuOption key={currency.code} value={currency.code}>
                                    {this.CryptItem(currency.code)}
                                </MenuOption>
                            )}
                        </CardPicker>
                    </ProgressCircle>
                </View>

                <View style={styles.formStyle}>

                {this.hint('ADDRESS')}
                <FormTextInput placeholder={`Enter ${simpleCurrencyName[code]} address`}/>

                {this.hint('AMOUNT')}
                <View style={styles.formRow}>
                    <FormTextInput
                        placeholder={`Amount to send`}
                        onChangeText={this.onAmountChange}
                        keyboardType={'numeric'}
                        value={this.state.form.amount}
                        style={styles.formStyle}/>
                    <Text style={styles.header}>{code}</Text>
                </View>

                {this.hint('COST')}
                <View style={styles.formRow}>
                    <FormTextInput
                        placeholder={`In other currency`}
                        onChangeText={this.onCostChange}
                        keyboardType={'numeric'}
                        value={this.state.form.cost}
                        style={styles.formStyle}/>
                    <Text style={styles.header}>{currencyCode}</Text>
                </View>

                <PrimaryButton onPress={this.onSubmitHandler} title={submitButtonText} style={{margin: 16}} />

                </View>

            </View>
        )
    }
}
