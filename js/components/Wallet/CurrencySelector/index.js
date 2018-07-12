import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {
    Image,
    StyleSheet,
} from 'react-native';

import CardPicker from '../../../style/CardPicker';
import {MenuOption} from 'react-native-popup-menu';
import {cryptoIcons} from '../../../style/resourceHelpers';
import CurrencyItemWithIcon from './CurrencyItemWithIcon';

const styles = StyleSheet.create({
    pickerIcon: {
        height: 24,
        width: 24,
    },
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
    picker: {
        height: 50,
        width: 100,
    },
});

export default class CurrencySelector extends Component {

    static propTypes = {
        cryptoCurrencies: PropTypes.array,
        onValueChange: PropTypes.func,
        selectedValue: PropTypes.string,
    };

    state = {
        cryptoCurrencyCode: this.props.selectedValue || 'BTC',
    };

    renderItem = (code) => (
        <CurrencyItemWithIcon icon={<Image source={cryptoIcons[code]} style={styles.pickerIcon} resizeMode='contain'/>}
                              label={code}/>
    );

    onCryptoCurrencyCodeChange = (value) => {
        this.props.onValueChange(value);
        this.setState({cryptoCurrencyCode: value})
    };

    render() {
        const {
            cryptoCurrencies,
        } = this.props;

        return (
            <CardPicker
                style={styles.picker}
                onValueChange={this.onCryptoCurrencyCodeChange}
                selectedValue={this.state.cryptoCurrencyCode}
                renderButton={this.renderItem}
            >
                {
                    cryptoCurrencies.map(
                        currency => <MenuOption key={currency.code} value={currency.code}>
                            {this.renderItem(currency.code)}
                        </MenuOption>
                    )
                }
            </CardPicker>
        )
    }

}
