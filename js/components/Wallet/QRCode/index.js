import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    Text,
    Image,
    View,
    StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
    centerContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default class QRCode extends Component {

    static propTypes = {
        transactionTokens: PropTypes.any,
    };

    render() {
        const { transactionTokens } = this.props;

        let content = null;
        if (transactionTokens && transactionTokens.data && transactionTokens.data.length > 0) {
            const base64code = transactionTokens.data[0].qr_code.replace(/\n/g, '');
            content = (
                <Image
                    source={{uri: `data:image/png;base64, ${base64code}`}}
                    style={{width: 260, height: 260}}
                />
            );
        } else {
            content = (
                <Text>You don't have any active addresses</Text>
            );
        }

        return (
            <View style={styles.centerContent}>
                { content }
            </View>
        )
    }
}
