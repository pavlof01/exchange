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
import Touchable from '../../../style/Touchable';

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

  renderCountryItem = (country) => {
    const active = this.state.selectedCountry == country.item.name;
    return (
      <Touchable onPress={() => this.setState({ selectedCountry: country.item.name })}>
        <View style={active ? styles.active : styles.countryContainer}>
          <Text style={styles.countryName}>{country.item.name}</Text>
        </View>
      </Touchable>
    );
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.scrollContainer}>
          <FlatList
            data={this.props.countries}
            extraData={this.state.selectedCountry}
            keyExtractor={this.countryKeyExtractor}
            renderItem={this.renderCountryItem}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  active: {
    backgroundColor: '#7F63A5',
    paddingBottom: 20,
    paddingTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#d5d5d5',
    flexDirection: 'row',
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
    paddingBottom: 20,
    paddingTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#d5d5d5',
    flexDirection: 'row',
  },
  countryName: {
    height: 18,
    fontSize: 18,
    fontFamily: fonts.regular.regular,
    letterSpacing: 0.2,
  },
  headerStyle: {
    backgroundColor: 'red',
  },

});
