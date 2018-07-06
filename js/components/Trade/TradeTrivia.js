import React from 'react';
import {
    StyleSheet, Text,
    View,
} from 'react-native';

const styles = StyleSheet.create({
    header: {
        color: '#222222',
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 8,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
    },
    info: {
        backgroundColor: 'white',
        margin: 8,
        padding: 8,
    },
    infoText: {
        margin: 2,
        fontSize: 16,
    },
    bold: {
        margin: 2,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

class TradeTrivia extends React.Component {

    render() {
        const {ad} = this.props;

        return ad.conditions ? <View style={styles.info}>
            <Text>Условия сделки:</Text>
            <Text>{ad.conditions}</Text>
        </View> : null;
    }
}

export default TradeTrivia;
