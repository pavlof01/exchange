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
    errorRow: {
        flex: 1,
        flexDirection: 'row',
    },
    errorText: {
        flex: 1,
        color: '#d61b38',
        textAlign: 'center',
    },
    successText: {
        flex: 1,
        color: '#14d459',
        textAlign: 'center',
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
        price: "",
        isConfirming: false,
        error: { isEmpty: false, isSucceed: false },
    };

    componentWillMount() {
        const {currencyCode} = this.props;

        this.props.updateRates({ [currencyCode]: this.state.cryptoCurrencyCode });
        this.props.updateCurrencies();
        this.props.updateEstimatedFee({ currency: this.props.currencyCode });
    }

    componentWillReceiveProps({ withdrawal, exchangeRates }) {
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
            exchangeRates[`${this.props.currencyCode}_${this.state.currency}`]
        ) {
            data.price = data.form.amount * exchangeRates[`${this.props.currencyCode}_${this.state.currency}`];
        }

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

    clearedErrorList = name => {
        const  error = this.state.error;
        delete error[name];
        delete error.isEmpty;
        delete error.isSucceed;

        return error
    };

    static ItemWithIcon(label, icon) {
        return (<View style={styles.pickerRow}>{icon}<Text style={styles.cardText}>{label}</Text></View>)
    }

    CryptItem = (code) => {
        const value = this.props.balance[code].value;
        return Transfer.ItemWithIcon(`${value} ${code}`, <Image source={cryptoIcons[code]} style={styles.pickerIcon} resizeMode='contain'/>);
    };

    onCryptoCurrencyCodeChange = (value) => {
        const form = {
            ...this.state.form,
            currency: value,
        };
        this.setState({ form, cryptoCurrencyCode: value});
    };

    onAddressChange = (value) => {
        const form = {
            ...this.state.form,
            address: value,
        };
        this.setState({ form });
    };

    hint = (title) => <View style={styles.hintRow}><Text style={styles.inputHint}>{title}</Text></View>;

    onSubmitHandler = () => {
        this.props.onWalletOperationStart({ ...this.state.form });
    };

    renderPasswordError = () => {
        return (
            <View style={styles.formRow}>
                <Text style={styles.errorText}>{'Wrong password'}</Text>
            </View>
        );
    };

    renderSucessText = () => {
        return (
            <View style={styles.formRow}>
                <Text style={styles.successText}>{'Transaction added to queue'}</Text>
            </View>
        );
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
                <FormTextInput
                    placeholder={`Enter ${simpleCurrencyName[code]} address`}
                    onChangeText={this.onAddressChange}
                    value={this.state.form.address}
                    style={styles.formStyle}
                />

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

                { this.state.isConfirming ? this.renderConfirmPasswordField() : null }

                <PrimaryButton onPress={this.onSubmitHandler} title={submitButtonText} style={{margin: 16}} />

                { this.state.error.isEmpty ? this.renderPasswordError() : null }

                { this.state.error.isSucceed ? this.renderSucessText() : null }

                </View>

            </View>
        )
    }
}
