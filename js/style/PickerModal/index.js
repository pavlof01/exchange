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
      if (isAndroid) {
        return (
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedValue || 'ANY'}
              style={{ height: 50 }}
              onValueChange={onValueChange}
            >
              <Picker.Item value="ANY" label={defaultValueLabel || 'none selected'} />
              {
                items.map(
                  item => (
                    <Picker.Item key={item.label} value={item.value} label={item.label} />
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
            title={(this.props.countryMap[this.props.countryCode] || { name: 'Не выбрано' }).name} onPress={this.open}
          />
          <Modal
            animationType="slide"
            transparent
            visible={this.state.shouldPick}
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
                  onValueChange={this.props.onCountryCodeChange}
                >
                  <PickerIOS.Item value="ANY" label="Не выбрано" />
                  {this.props.countries.map(
                    country => <PickerIOS.Item key={country.code} value={country.code} label={country.name} />,
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
  selectedValue: PropTypes.any,
  onValueChange: PropTypes.func.isRequired,
  items: PropTypes.array,
};

export default PickerModal;
