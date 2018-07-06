import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    Text,
    View,
    StyleSheet,
} from 'react-native';

import QRCode from '../QRCode';
import PrimaryButton from "../../../style/PrimaryButton";

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
        marginLeft: 16,
        flexDirection: 'row',
    },
    hintText: {
        fontSize: 11,
        textAlign: 'left',
    },
    address: {
        marginLeft: 16,
        color: '#000000',
        fontSize: 18,
        marginBottom: 8,
    }
});

export default class Receive extends Component {

    static propTypes = {
        currency: PropTypes.string,
        transactionTokens: PropTypes.any,
        getTransactionTokens: PropTypes.func,
        generateTransactionToken: PropTypes.func,
    };

    componentWillReceiveProps(props) {
        if (props.currency !== this.props.currency) {
            this.props.getTransactionTokens({ currency: props.currency })
        }
    }

    generateNewToken = () => {
        this.props.generateTransactionToken({ currency: this.props.currency })
    };

    copyAddress = () => {

    };

    hint = (title) => (
        <View style={styles.hintRow}>
            <Text style={styles.hintText}>{title}</Text>
        </View>
    );

    getAddressFromTokens = (transactionTokens) => {
        let address = ' ';
        if (transactionTokens && transactionTokens.data && transactionTokens.data.length > 0 && transactionTokens.data[0].address) {
            address = transactionTokens.data[0].address;
        }
        if (transactionTokens && transactionTokens.generation_pending) {
            address = 'address is generate...';
        }
        return address;
    };

    render() {
        const {
            transactionTokens,
        } = this.props;

        console.warn(JSON.stringify(transactionTokens, undefined, 2));

        return (
            <View style={styles.content}>
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
                    title={transactionTokens && transactionTokens.data && transactionTokens.data.length > 0 ? 'UPDATE' : 'GENERATE'}
                    style={{margin: 16}}
                    disabled={transactionTokens && transactionTokens.generation_pending}
                />
                <PrimaryButton
                    onPress={this.copyAddress}
                    title={'COPY'}
                    style={{margin: 16}}
                    disabled={transactionTokens && transactionTokens.generation_pending}
                />
            </View>
        )
    }
}
