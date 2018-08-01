import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  AsyncStorage,
  Button,
} from 'react-native';
import { fonts } from '../../../style/resourceHelpers';
import CountryItem from '../SettingsItem';

export default class SelectCountries extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'SELECT COUNTRY',
      headerRight: (
        <Button
          onPress={navigation.getParam('selectCountry')}
          title="Select"
          color="#fff"
        />
      ),
      headerStyle: { backgroundColor: '#2B2B82' },
      headerTitleStyle: { color: 'white' },
      headerTintColor: 'white',
    }

  };

  constructor(props) {
    super(props);
    this.state = {
      selectedCountry: '',
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({ selectCountry: this.selectCountry });
  }

  countryKeyExtractor = country => country.code;

  selectCountry = () => {
    AsyncStorage.setItem('selectedCountry', this.state.selectedCountry);
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.scrollContainer}>
          <FlatList
            data={this.props.countries}
            keyExtractor={this.countryKeyExtractor}
            renderItem={country => (
              <CountryItem
                onPress={() => this.setState({ selectedCountry: country.item.name })}
                textStyle={styles.countryName}
                text={country.item.name}
                styleContainer={this.state.selectedCountry == country.item.name ? styles.active : null}
              />
            )}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  active: {
    backgroundColor: '#2B2B82'
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingLeft: 25,
    paddingRight: 25,
    flex: 1,
  },
  countryContainer: {
    paddingBottom: 15,
    paddingTop: 15,
  },
  countryName: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: fonts.regular.regular,
  },
  headerStyle: {
    backgroundColor: 'red',
  },

});
