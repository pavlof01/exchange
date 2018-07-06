import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {
    Text,
    View,
    StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
    pickerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
    cardText: {
        fontSize: 24,
        color: '#333333',
        margin: 8,
        fontWeight: 'bold',
    },
});

export default class CurrencyItemWithIcon extends Component {

    static propTypes = {
        label: PropTypes.string,
        icon: PropTypes.element,
    };

    render() {
        const {
            label,
            icon,
        } = this.props;

        return (
            <View style={styles.pickerRow}>{icon}<Text style={styles.cardText}>{label}</Text></View>
        )
    }

}
