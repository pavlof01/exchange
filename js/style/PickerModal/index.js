import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Modal,
  PickerIOS,
  Picker,
  Platform,
} from 'react-native';
import BorderlessButton from '../BorderlessButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00000080',
  },
  pickerContainer: {
    flex: 1,
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
          <BorderlessButton
            title={selectedName}
            onPress={this.open}
          />
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
                  title="Назад"
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
