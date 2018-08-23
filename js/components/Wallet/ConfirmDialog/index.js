import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Modal,
  Dimensions,
} from 'react-native';

import { injectIntl, intlShape } from 'react-intl';
import FormTextInput from '../../FormTextInput';
import PrimaryButton from '../../../style/ActionButton';
import { Hint } from '../../../style/common';
import { fonts } from '../../../style/resourceHelpers';

const { width, height } = Dimensions.get('window');

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
    flexDirection: 'column',
    backgroundColor: 'white',
    width: width - 50,
    height: 280,
    alignSelf: 'center',
    marginTop: height / 2 - 140,
    paddingLeft: 5,
    paddingRight: 5,
  },
  dialogTitle: {
    color: '#AAAAAA',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 16,
    marginBottom: 16,
    fontFamily: fonts.bold.regular,
  },
  dialogPrice: {
    // flex: 1,
    color: '#444444',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: fonts.bold.regular,
    marginBottom: 4,
  },
  dialogAddress: {
    // flex: 1,
    color: '#444444',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: fonts.bold.regular,
    marginBottom: 4,
  },
  buttonGroup: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  positiveButton: {
    width: width / 2 - 50,
    marginRight: 8,
    marginLeft: 8,
  },
  negativeButton: {
    width: width / 2 - 50,
    marginRight: 8,
    marginLeft: 8,
  },
  inputStyle: {
    // flex: 1,
  },
  dialogErrorLabel: {
    // flex: 1,
    color: '#d61b38',
  },
});

class ConfirmDialog extends Component {
  static propTypes = {
    priceLabel: PropTypes.string,
    priceText: PropTypes.string,
    addressText: PropTypes.string,
    passwordValue: PropTypes.string,
    onChangePassword: PropTypes.func,
    errorText: PropTypes.string,
    onCancelPress: PropTypes.func,
    onConfirmPress: PropTypes.func,
    intl: intlShape.isRequired,
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
      intl,
    } = this.props;

    return (
      <Modal
        animationType="fade"
        transparent
        onRequestClose={this.onCancelPress}
      >
        <View style={styles.container}>
          <ScrollView keyboardShouldPersistTaps="always">
            <View style={styles.dialogContainer}>
              <Text style={styles.dialogTitle}>
                {intl.formatMessage({ id: 'app.wallet.dialog.title', defaultMessage: 'Please confirm' }).toUpperCase()}
              </Text>
              <Hint>
                {priceLabel}
              </Hint>
              <Text style={styles.dialogPrice}>
                {priceText}
              </Text>
              <Hint>
                {intl.formatMessage({ id: 'app.wallet.dialog.to', defaultMessage: 'To' }).toUpperCase()}
              </Hint>
              <Text style={styles.dialogAddress}>
                {addressText}
              </Text>
              <Hint>
                {intl.formatMessage({ id: 'app.wallet.dialog.password', defaultMessage: 'Password' }).toUpperCase()}
              </Hint>
              <FormTextInput
                placeholder={intl.formatMessage({ id: 'app.wallet.dialog.password.placeholder', defaultMessage: 'Login password' })}
                secureTextEntry
                onChangeText={onChangePassword}
                value={passwordValue}
                style={styles.inputStyle}
                error={(errorText.length > 0)}
              />
              <Text style={styles.dialogErrorLabel}>
                {errorText}
              </Text>
              <View style={styles.buttonGroup}>
                <PrimaryButton
                  onPress={onCancelPress}
                  title={intl.formatMessage({ id: 'app.wallet.btn.cancel', defaultMessage: 'Cancel' }).toUpperCase()}
                  secondary
                  style={styles.negativeButton}
                />
                <PrimaryButton
                  onPress={onConfirmPress}
                  title={intl.formatMessage({ id: 'app.wallet.btn.confirm', defaultMessage: 'Confirm' }).toUpperCase()}
                  style={styles.positiveButton}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    );
  }
}

export default injectIntl(ConfirmDialog);
