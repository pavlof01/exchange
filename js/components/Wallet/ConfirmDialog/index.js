import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {
    Text,
    View,
    ScrollView,
    StyleSheet, Modal,
} from 'react-native';

import FormTextInput from "../../FormTextInput";
import PrimaryButton from "../../../style/ActionButton";
import {Hint} from "../../../style/common";
import {fonts} from "../../../style/resourceHelpers";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
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
        color: '#AAAAAA',
        textAlign: 'center',
        fontSize: 16,
        marginBottom: 10,
        fontFamily: fonts.bold.regular,
    },
    dialogPrice: {
        flex: 1,
        color: '#444444',
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: fonts.bold.regular,
        marginBottom: 4,
    },
    dialogAddress: {
        flex: 1,
        color: '#444444',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: fonts.bold.regular,
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
            <Modal
                animationType={'fade'}
                transparent={true}
                onRequestClose={this.onCancelPress}
            >
            <View style={styles.container}>
                <ScrollView keyboardShouldPersistTaps='always'>
                    <View style={styles.dialogContainer}>
                        <Text style={styles.dialogTitle}>PLEASE CONFIRM</Text>
                        <Hint>{priceLabel}</Hint>
                        <Text style={styles.dialogPrice}>{priceText}</Text>
                        <Hint>TO</Hint>
                        <Text style={styles.dialogAddress}>{addressText}</Text>
                        <Hint>PASSWORD</Hint>
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
                                secondary
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
            </Modal>
        )
    }

}
