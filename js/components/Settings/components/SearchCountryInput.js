import React, { Component } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { injectIntl } from 'react-intl';
import { fonts } from '../../../style/resourceHelpers';

const styles = StyleSheet.create({
  searchContainer: {
    height: 45,
    backgroundColor: '#9b9b9b',
    padding: 7,
  },
  searchTextInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingLeft: 15,
    fontSize: 16,
    fontFamily: fonts.bold.regular,
  }
});

class SearchCountryInput extends Component {
  render() {
    const { intl } = this.props;
    return (
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchTextInput}
          onChangeText={text => this.props.filterCountry(text)}
          placeholder={intl.formatMessage({ id: 'app.settings.selectCountry.placeholder', defaultMessage: 'Enter country' })}
        />
      </View>
    );
  }
}

export default injectIntl(SearchCountryInput);