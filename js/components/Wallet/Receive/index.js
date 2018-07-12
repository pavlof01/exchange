import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    ActivityIndicator,
    Clipboard,
    Text,
    View,
    StyleSheet,
} from 'react-native';

import CardPicker from '../../../style/CardPicker';
import { MenuOption } from 'react-native-popup-menu';
import QRCode from '../QRCode';
import PrimaryButton from '../../../style/ActionButton';
import CurrencySelector from "../CurrencySelector";
import {Hint} from "../../../style/common";
import {fonts} from "../../../style/resourceHelpers";

const styles = StyleSheet.create({
    content: {
        flex: 1,
        padding: 16,
    },
    centerContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    address: {
        marginRight: 8,
        marginLeft: 8,
        color: '#000000',
        fontSize: 17,
        fontWeight: 'bold',
        fontFamily: fonts.bold.regular,
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
        if (this.isAddressLoaded()) {
            const {
                transactionTokens,
            } = this.props;
            Clipboard.setString(transactionTokens.data && transactionTokens.data.length > 0 && transactionTokens.data[0].address);
        }
    };

    isAddressLoaded = () => {
        const {
            transactionTokens,
        } = this.props;
        return (transactionTokens.data && transactionTokens.data.length > 0 && transactionTokens.data[0].address);
    };

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

                <View style={styles.centerContent}>
                    <CurrencySelector
                        cryptoCurrencies={cryptoCurrencies}
                        onValueChange={this.onCurrencyChange}
                        selectedValue={this.state.cryptoCurrencyCode}
                    />
                </View>
                <Hint>QR CODE</Hint>
                <View style={styles.centerContent}>
                    <QRCode transactionTokens={transactionTokens} />
                </View>
                <Hint>ADDRESS TO RECEIVE BITCOINS</Hint>
                <Text
                    style={styles.address}
                    selectable
                >
                    {this.getAddressFromTokens(transactionTokens)}
                </Text>

                <View style={{flex: 1, flexDirection: 'row'}}>
                    <PrimaryButton
                        onPress={this.generateNewToken}
                        title={transactionTokens.data && transactionTokens.data.length > 0 ? 'UPDATE' : 'GENERATE'}
                        style={{flex: 1, margin: 16}}
                        secondary
                        disabled={transactionTokens.generation_pending}
                    >
                        {transactionTokens.generation_pending ? <ActivityIndicator size="large"/> : null}
                    </PrimaryButton>
                    <PrimaryButton
                        onPress={this.copyAddress}
                        title={'COPY'}
                        style={{flex: 1, margin: 16}}
                        secondary
                        disabled={transactionTokens.generation_pending}
                    />
                </View>

            </View>
        )
    }
}
