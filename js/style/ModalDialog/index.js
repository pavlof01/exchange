import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  StyleSheet,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { fonts } from '../resourceHelpers';
import PrimaryButton from '../../style/ActionButton';

const styles = StyleSheet.create({
  modalShade: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  dialogContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    padding: 16,
    marginTop: 80,
    marginBottom: 120,
  },
  headerContainer: {
  },
  dialogTitle: {
    flex: 1,
    color: '#9b9b9b',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 16,
    marginBottom: 16,
    fontFamily: fonts.bold.regular,
  },
  dialogMessage: {
    flex: 1,
    color: '#444444',
    fontSize: 20,
    fontFamily: fonts.bold.regular,
    marginBottom: 4,
  },
  buttonGroup: {
    flex: 1,
    flexDirection: 'row',
  },
  positiveButton: {
    margin: 16,
    marginRight: 0,
    marginLeft: 8,
    flex: 1,
  },
  negativeButton: {
    margin: 16,
    marginLeft: 0,
    marginRight: 8,
    flex: 1,
  },
});

class ModalDialog extends Component {

  onRequestClose = () => {
    const {
      onClose,
    } = this.props;
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  onNegativePress = () => {
    if (typeof this.props.onNegativePress === 'function') {
      this.props.onNegativePress();
    }
  };

  onPositivePress = () => {
    if (typeof this.props.onPositivePress === 'function') {
      this.props.onPositivePress();
    }
  };

  renderHeader = () => {
    const {
      title,
    } = this.props;
    if (!title && title.length === 0) return null;
    return (
      <Text style={styles.dialogTitle}>{title}</Text>
    );
  };

  renderContent = () => {
    const {
      children,
      message,
    } = this.props;
    if (message) {
      return (
        <Text style={styles.dialogMessage}>{message}</Text>
      );
    }
  };

  render() {
    return (
      <Modal
        animationType={'fade'}
        transparent={true}
        onRequestClose={this.onRequestClose}
      >
        <View style={styles.modalShade}>
          <ScrollView keyboardShouldPersistTaps='always'>
            <View style={styles.dialogContainer}>
              <View style={styles.headerContainer}>
                { this.renderHeader() }
              </View>
              { this.renderContent() }
              <View style={styles.buttonGroup}>
                <PrimaryButton
                  onPress={this.onNegativePress}
                  title={'CANCEL'}
                  secondary
                  style={styles.negativeButton}
                />
                <PrimaryButton
                  onPress={this.onPositivePress}
                  title={'OK'}
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

ModalDialog.propTypes = {
  children: PropTypes.element,
  title: PropTypes.string,
  message: PropTypes.string,
  onPositivePress: PropTypes.func,
  onNegativePress: PropTypes.func,
  onClose: PropTypes.func,
};

export default ModalDialog;
