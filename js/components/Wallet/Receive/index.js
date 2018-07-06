import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    ActivityIndicator,
    Text,
    View,
    StyleSheet,
} from 'react-native';

import CardPicker from '../../../style/CardPicker';
import { MenuOption } from 'react-native-popup-menu';
import QRCode from '../QRCode';
import PrimaryButton from '../../../style/PrimaryButton';
import CurrencySelector from "../CurrencySelector";

const styles = StyleSheet.create({
    content: {
        flex: 1,
        paddingTop: 8,
    },
    centerContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    hintRow: {
        marginTop: 4,
        marginLeft: 8,
        flexDirection: 'row',
    },
    hintText: {
        fontSize: 11,
        textAlign: 'left',
    },
    address: {
        marginRight: 8,
        marginLeft: 8,
        color: '#000000',
        fontSize: 17,
        marginBottom: 8,
    }
});

export default class Receive extends Component {

    static propTypes = {
        cryptoCurrencies: PropTypes.array,
        currency: PropTypes.string,
        transactionTokens: PropTypes.any,
        getTransactionTokens: PropTypes.func,
        generateTransactionToken: PropTypes.func,
    };

    state = {
        cryptoCurrencyCode: this.props.currency || 'BTC',
    };

    componentWillMount() {
        this.props.getTransactionTokens({ currency: this.state.cryptoCurrencyCode });

        if (!this.isAddressLoaded()) {
            this.generateNewToken();
        }
    }

    generateNewToken = () => {
        this.props.generateTransactionToken({ currency: this.state.cryptoCurrencyCode })
    };

    copyAddress = () => {

    };

    isAddressLoaded = () => {
        const {
            transactionTokens,
        } = this.props;
        return (transactionTokens && transactionTokens.data && transactionTokens.data.length > 0 && transactionTokens.data[0].address);
    };

    hint = (title) => (
        <View style={styles.hintRow}>
            <Text style={styles.hintText}>{title}</Text>
        </View>
    );

    getAddressFromTokens = (transactionTokens) => {
        let address = ' ';
        if (this.isAddressLoaded()) {
            address = transactionTokens.data[0].address;
        }
        if (transactionTokens && transactionTokens.generation_pending) {
            address = 'address is being generated...';
        }
        return address;
    };

    onCurrencyChange = (code) => {
        this.props.getTransactionTokens({ currency: code });
        this.setState({cryptoCurrencyCode: code}, this.generateNewToken);
    };

    render() {
        const {
            transactionTokens,
            cryptoCurrencies,
        } = this.props;

        return (
            <View style={styles.content}>
                <CurrencySelector
                    cryptoCurrencies={cryptoCurrencies}
                    onValueChange={this.onCurrencyChange}
                    selectedValue={this.state.cryptoCurrencyCode}
                />
                {this.hint('QR CODE')}
                <View style={styles.centerContent}>
                    <QRCode transactionTokens={transactionTokens} />
                </View>
                {this.hint('ADDRESS TO RECEIVE BITCOINS')}
                <Text
                    style={styles.address}
                    selectable
                >
                    {this.getAddressFromTokens(transactionTokens)}
                </Text>
                <PrimaryButton
                    onPress={this.generateNewToken}
                    title={transactionTokens.data && transactionTokens.data.length > 0 ? 'UPDATE' : 'GENERATE'}
                    style={{margin: 16}}
                    disabled={transactionTokens.generation_pending}
                >
                    {transactionTokens.generation_pending ? <ActivityIndicator size="large"/> : null}
                </PrimaryButton>
                <PrimaryButton
                    onPress={this.copyAddress}
                    title={'COPY'}
                    style={{margin: 16}}
                    disabled={transactionTokens.generation_pending}
                />
            </View>
        )
    }
}
