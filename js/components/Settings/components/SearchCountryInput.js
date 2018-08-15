import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, StyleSheet } from 'react-native';
import { injectIntl, intlShape } from 'react-intl';
import { fonts } from '../../../style/resourceHelpers';

const styles = StyleSheet.create({
  searchContainer: {
    height: 45,
    backgroundColor: '#9b9b9b',
    margin: 0,
  },
  searchTextWrapper: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingStart: 15,
    paddingEnd: 15,
    margin: 7,
    justifyContent: 'center',
  },
  searchTextInput: {
    height: 45,
    fontSize: 16,
    lineHeight: 18,
    fontFamily: fonts.bold.regular,
  },
});

class SearchCountryInput extends Component {
  render() {
    const { intl } = this.props;
    return (
      <View style={styles.searchContainer}>
        <View style={styles.searchTextWrapper}>
          <TextInput
            style={styles.searchTextInput}
            onChangeText={text => this.props.filterCountry(text)}
            placeholder={intl.formatMessage({ id: 'app.settings.selectCountry.placeholder', defaultMessage: 'Enter country' })}
            underlineColorAndroid="transparent"
          />
        </View>
      </View>
    );
  }
}

SearchCountryInput.propTypes = {
  intl: intlShape.isRequired,
  filterCountry: PropTypes.func,
};

export default injectIntl(SearchCountryInput);