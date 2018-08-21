import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  Picker,
  Platform,
  Dimensions,
} from 'react-native';
import Touchabe from '../Touchable';
import BorderlessButton from '../BorderlessButton';
import { fonts } from '../resourceHelpers';

const { width, height } = Dimensions.get('window');

const MODAL_DIALOG_SAFE_MARGIN = 24;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    flexShrink: 1,
    flexDirection: 'column',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerContainer: {
    flex: 1,
  },
  selectorContainer: {
    flex: 1,
  },
  selectorText: {
    paddingTop: 14,
    paddingBottom: 9,
    paddingLeft: 20,
    color: '#4a4a4a',
    fontFamily: fonts.bold.regular,
    fontSize: 18,
    fontWeight: '700',
  },
  modalShade: {
    position: 'absolute',
    width,
    height,
    flex: 1,
    flexGrow: 1,
    flexShrink: 1,
    flexWrap: 'wrap',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalShadeWrapper: {
    position: 'absolute',
    width,
    height,
    flex: 1,
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    zIndex: 1000,
  },
  centerContainer: {
    position: 'absolute',
    maxHeight: height - MODAL_DIALOG_SAFE_MARGIN * 2,
    zIndex: 1001,
    margin: MODAL_DIALOG_SAFE_MARGIN,
  },
  itemContainer: {
    paddingTop: MODAL_DIALOG_SAFE_MARGIN,
    overflow: 'scroll',
    zIndex: 1005,
  },
  bankLabelText: {
    textAlign: 'center',
    fontSize: 16,
  },
  bankContainer: {
    padding: 10,
  },
  title: {
    color: '#4a4a4a',
    marginTop: 16,
    fontSize: 12,
    fontFamily: fonts.medium.regular,
    letterSpacing: 1,
    marginBottom: 5,
    textAlign: 'center',
  },
  titleContainer: {
    padding: 5,
    borderBottomColor: '#e1e1e1',
    borderBottomWidth: 1,
  },
  scrollView: {
    height: height / 1.5,
    width: width / 1.3,
    backgroundColor: '#fff'
  },
  activeBank: {
    fontFamily: fonts.bold.regular,
  }
});

const isAndroid = Platform.OS === 'android';

class PickerModal extends React.Component {
  state = {
    shouldPick: false,
  };

  open = () => this.setState({ shouldPick: true });

  hide = () => this.setState({ shouldPick: false });

  bank = (item) => {
    const active = item.value === this.props.selectedValue;
    return (
      <TouchableOpacity
        key={item.value}
        value={item.value}
        onPress={() => this.selectPaymentMethod(item.value)}
        style={styles.bankContainer}
      >
        <Text style={[styles.bankLabelText, active ? styles.activeBank : null]}>
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  selectPaymentMethod = (type) => {
    this.props.onValueChange(type);
    this.hide();
  }

  render() {
    const {
      selectedValue,
      onValueChange,
      items,
      defaultValueLabel,
    } = this.props;
    const {
      shouldPick,
    } = this.state;
    let selectedName = defaultValueLabel || 'none selected';
    items.forEach((item) => {
      if (item.value === selectedValue) {
        selectedName = item.label;
      }
    });
    if (isAndroid) {
      return (
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedValue || 'ANY'}
            style={{ height: 50 }}
            onValueChange={onValueChange}
          >
            <Picker.Item
              value="ANY"
              label={defaultValueLabel || 'none selected'}
            />
            {
              items.map(
                item => (
                  <Picker.Item
                    key={item.value}
                    value={item.value}
                    label={item.label}
                  />
                ),
              )
            }
          </Picker>
        </View>
      );
    }

    return (
      <React.Fragment>
        <Touchabe onPress={this.open} style={styles.pickerContainer}>
          <View style={styles.selectorContainer}>
            <Text style={styles.selectorText}>
              {selectedName}
            </Text>
          </View>
        </Touchabe>
        <Modal
          animationType="fade"
          transparent
          visible={shouldPick}
          onRequestClose={this.hide}
        >
          <View style={styles.container}>
            <View style={styles.modalShadeWrapper}>
              <TouchableOpacity activeOpacity={1} onPress={this.hide}>
                <View style={styles.modalShade} />
              </TouchableOpacity>
            </View>
            <View style={styles.centerContainer}>
              <View style={styles.itemContainer}>
                <ScrollView bounces={false} style={styles.scrollView}>
                  <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                      {this.props.title}
                    </Text>
                  </View>
                  <TouchableOpacity
                    key='any'
                    onPress={() => this.selectPaymentMethod('ANY')}
                    style={styles.bankContainer}
                  >
                    <Text style={styles.bankLabelText}>
                      ANY
                    </Text>
                  </TouchableOpacity>
                  {
                    items.map(item => this.bank(item))
                  }
                </ScrollView>
              </View>
            </View>
          </View>
        </Modal>
      </React.Fragment>
    );
  }
}

PickerModal.propTypes = {
  defaultValueLabel: PropTypes.string,
  selectedValue: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  onValueChange: PropTypes.func.isRequired,
  items: PropTypes.array, // eslint-disable-line react/forbid-prop-types
};

export default PickerModal;
