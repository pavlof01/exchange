import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {
    Text,
    View,
    ScrollView,
    StyleSheet,
} from 'react-native';

import FormTextInput from "../../FormTextInput";
import PrimaryButton from "../../../style/PrimaryButton";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    dialogContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        padding: 16,
        marginTop: 80,
        marginBottom: 120,
    },
    dialogTitle: {
        flex: 1,
        color: '#BBBBBB',
        textAlign: 'center',
        fontSize: 16,
        marginBottom: 10,
    },
    dialogLabel: {
        flex: 1,
        color: '#999999',
        fontSize: 12,
    },
    dialogPrice: {
        flex: 1,
        color: '#555555',
        fontSize: 20,
        marginBottom: 4,
    },
    dialogAddress: {
        flex: 1,
        color: '#555555',
        fontSize: 16,
        marginBottom: 4,
    },
    buttonGroup: {
        flex: 1,
        flexDirection: 'row',
    },
    inputStyle: {
        flex: 1,
    },
    dialogErrorLabel: {
        flex: 1,
        color: '#d61b38',
    },
});

export default class ConfirmDialog extends Component {

    static propTypes = {
        priceLabel: PropTypes.string,
        priceText: PropTypes.string,
        addressText: PropTypes.string,
        passwordValue: PropTypes.string,
        onChangePassword: PropTypes.func,
        errorText: PropTypes.string,
        onCancelPress: PropTypes.func,
        onConfirmPress: PropTypes.func,
    };

    render() {
        const {
            priceLabel,
            priceText,
            addressText,
            passwordValue,
            onChangePassword,
            errorText,
            onCancelPress,
            onConfirmPress,
        } = this.props;

        return (
            <View style={styles.container}>
                <ScrollView keyboardShouldPersistTaps='always'>
                    <View style={styles.dialogContainer}>
                        <Text style={styles.dialogTitle}>PLEASE{'\n'}CONFIRM</Text>
                        <Text style={styles.dialogLabel}>{priceLabel}</Text>
                        <Text style={styles.dialogPrice}>{priceText}</Text>
                        <Text style={styles.dialogLabel}>{'TO'}</Text>
                        <Text style={styles.dialogAddress}>{addressText}</Text>
                        <Text style={styles.dialogLabel}>{'PASSWORD'}</Text>
                        <FormTextInput
                            placeholder={`login password`}
                            secureTextEntry
                            onChangeText={onChangePassword}
                            value={passwordValue}
                            style={styles.inputStyle}
                            error={(errorText.length > 0)}
                        />
                        <Text style={styles.dialogErrorLabel}>{errorText}</Text>
                        <View style={styles.buttonGroup}>
                            <PrimaryButton
                                onPress={onCancelPress}
                                title={'CANCEL'}
                                style={{margin: 16, marginLeft: 0, marginRight: 8, flex: 1}}
                            />
                            <PrimaryButton
                                onPress={onConfirmPress}
                                title={'CONFIRM'}
                                style={{margin: 16, marginRight: 0, marginLeft: 8, flex: 1}}
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }

}
