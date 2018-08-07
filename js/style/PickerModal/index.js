import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  PickerIOS,
  Picker,
  Platform,
} from 'react-native';
import Touchabe from '../Touchable';
import BorderlessButton from '../BorderlessButton';
import { fonts } from '../resourceHelpers';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00000080',
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
});

const isAndroid = Platform.OS === 'android';

class PickerModal extends React.Component {
  state = {
    shouldPick: false,
  };

  open = () => this.setState({ shouldPick: true });

  hide = () => this.setState({ shouldPick: false });

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
          animationType="slide"
          transparent
          visible={shouldPick}
          onRequestClose={this.hide}
        >
          <View style={styles.container}>
            <View style={{ flex: 1 }} />
            <View style={{ backgroundColor: 'white' }}>
              <BorderlessButton
                title="Back"
                onPress={this.hide}
              />
              <PickerIOS
                selectedValue={selectedValue || 'ANY'}
                onValueChange={onValueChange}
              >
                <PickerIOS.Item value="ANY" label={defaultValueLabel || 'none selected'} />
                {items.map(
                  item => (
                    <PickerIOS.Item
                      key={item.value}
                      value={item.value}
                      label={item.label}
                    />
                  ),
                )}
              </PickerIOS>
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
