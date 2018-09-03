import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Modal,
  Dimensions,
  Platform
} from 'react-native';

import { injectIntl, intlShape } from 'react-intl';
import FormTextInput from '../../FormTextInput';
import PrimaryButton from '../../../style/ActionButton';
import { Hint } from '../../../style/common';
import { fonts } from '../../../style/resourceHelpers';

const { width, height } = Dimensions.get('window');
const isAndroid = Platform.OS === 'android';
const MARGIN_FOR_CENTER_MODAL = isAndroid ? 210 : 200;

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
    height: 400,
    alignSelf: 'center',
    marginTop: height / 2 - MARGIN_FOR_CENTER_MODAL,
    padding: 25,
  },
  titleContainer: {
    flex: 0.6,
  },
  dialogTitleText: {
    color: '#25367e',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: fonts.regular.regular,
  },
  mainInfo: {
    flex: 1,
  },
  dialogPrice: {
    color: '#4a4a4a',
    fontSize: 24,
    fontWeight: '400',
    fontFamily: fonts.regular.regular,
    marginBottom: 4,
  },
  dialogAddress: {
    // flex: 1,
    color: '#4a4a4a',
    fontSize: 18,
    fontWeight: '400',
    fontFamily: fonts.regular.regular,
    marginBottom: 4,
  },
  buttonGroup: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
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
              <View style={styles.titleContainer}>
                <Text style={styles.dialogTitleText}>
                  {intl.formatMessage({ id: 'app.wallet.dialog.title', defaultMessage: 'Please confirm' }).toUpperCase()}
                </Text>
              </View>
              <View style={styles.mainInfo}>
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
                <Text style={styles.dialogErrorLabel}>
                  {errorText}
                </Text>
              </View>
              <View style={styles.buttonGroup}>
                <PrimaryButton
                  onPress={onCancelPress}
                  title={intl.formatMessage({ id: 'app.wallet.btn.cancel', defaultMessage: 'Cancel' })}
                  secondary
                  style={styles.negativeButton}
                />
                <PrimaryButton
                  onPress={onConfirmPress}
                  title={intl.formatMessage({ id: 'app.wallet.btn.confirm', defaultMessage: 'Confirm' })}
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
