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
    },
    centerContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
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

    render() {
        const {
            transactionTokens,
        } = this.props;

        console.warn(JSON.stringify(transactionTokens, undefined, 2));

        return (
            <View style={styles.content}>
                <View style={styles.centerContent}>
                    <QRCode transactionTokens={transactionTokens} />
                </View>
                <PrimaryButton onPress={this.generateNewToken} title={'UPDATE'} style={{margin: 16}} />
            </View>
        )
    }
}
