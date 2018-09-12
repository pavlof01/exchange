import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Modal,
  Dimensions,
  Platform,
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
    marginLeft: 4,
  },
  dialogAddress: {
    // flex: 1,
    color: '#4a4a4a',
    fontSize: 18,
    fontWeight: '400',
    fontFamily: fonts.regular.regular,
    marginBottom: 4,
    marginLeft: 4,
  },
  buttonGroup: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  btn: {
    width: width / 2 - 70,
    marginRight: 8,
    marginLeft: 8,
  },
  btnText: {
    fontWeight: '400',
    fontSize: width / 25,
  },
  dialogErrorLabel: {
    color: '#d61b38',
  },
  amountSentContainer: {
    borderBottomColor: 'rgba(151,151,151,0.2)',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  addressContainer: {
    borderBottomColor: 'rgba(151,151,151,0.2)',
    borderBottomWidth: 1,
    paddingBottom: 20,
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

  parseAmount = (amount) => {
    if (amount.indexOf('.') <= 0) {
      return Number.parseInt(amount).toFixed(2);
    }
    return amount;
  }

  render() {
    const {
      priceLabel,
      addressText,
      errorText,
      onCancelPress,
      onConfirmPress,
      intl,
      amount,
      currency,
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
                <View style={styles.amountSentContainer}>
                  <Hint>
                    {priceLabel}
                  </Hint>
                  <Text style={styles.dialogPrice}>
                    {`${this.parseAmount(amount)} ${currency}`}
                  </Text>
                </View>
                <Hint>
                  {intl.formatMessage({ id: 'app.wallet.dialog.to', defaultMessage: 'To' }).toUpperCase()}
                </Hint>
                <View style={styles.addressContainer}>
                  <Text style={styles.dialogAddress}>
                    {addressText}
                  </Text>
                </View>
                <Text style={styles.dialogErrorLabel}>
                  {errorText}
                </Text>
              </View>
              <View style={styles.buttonGroup}>
                <PrimaryButton
                  onPress={onCancelPress}
                  title={intl.formatMessage({ id: 'app.wallet.btn.cancel', defaultMessage: 'Cancel' })}
                  secondary
                  style={styles.btn}
                  fontStyle={styles.btnText}
                />
                <PrimaryButton
                  onPress={onConfirmPress}
                  title={intl.formatMessage({ id: 'app.wallet.btn.confirm', defaultMessage: 'Confirm' })}
                  style={styles.btn}
                  fontStyle={styles.btnText}
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
