import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet
} from 'react-native';
import { createBasicNavigationOptions } from "../../../style/navigation";
import Title from '../Title';
import FormTextInput from '../../FormTextInput';
import SettingsItem from '../SettingsItem';
import PrimaryButton from "../../../style/ActionButton";
import { fonts } from '../../../style/resourceHelpers';

export default class IdInfo extends Component {
  static navigationOptions = createBasicNavigationOptions('ID INFO');
  constructor(props) {
    super(props);
    this.state = {
      lastName: '',
      firstName: '',
      dateOfBirth: '',
      city: '',
      address: '',
      postcode: ''
    };
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.scrollContainer}>
          <Title text="PERSONAL INFORMATION" />
          <FormTextInput
            onChangeText={(lastName) => this.setState({ lastName })}
            value={this.state.lastName}
            textStyle={this.state.lastName.length !== 0 ? styles.text : styles.placeholderText}
            style={styles.input}
            placeholder="Last name" />
          <FormTextInput
            onChangeText={(firstName) => this.setState({ firstName })}
            value={this.state.firstName}
            textStyle={this.state.firstName.length !== 0 ? styles.text : styles.placeholderText}
            style={styles.input}
            placeholder="First name" />
          <FormTextInput
            onChangeText={(dateOfBirth) => this.setState({ dateOfBirth })}
            value={this.state.dateOfBirth}
            textStyle={this.state.dateOfBirth.length !== 0 ? styles.text : styles.placeholderText}
            style={styles.input}
            placeholder="Date of birth" />
          <SettingsItem styleContainer={{ paddingBottom: 25, paddingTop: 25, }} text="Country" />
          <FormTextInput
            onChangeText={(city) => this.setState({ city })}
            value={this.state.city}
            textStyle={this.state.city.length !== 0 ? styles.text : styles.placeholderText}
            style={styles.input}
            placeholder="City" />
          <FormTextInput
            onChangeText={(address) => this.setState({ address })}
            value={this.state.address}
            textStyle={this.state.address.length !== 0 ? styles.text : styles.placeholderText}
            style={styles.input}
            placeholder="Address" />
          <FormTextInput
            onChangeText={(postcode) => this.setState({ postcode })}
            value={this.state.postcode}
            textStyle={this.state.postcode.length !== 0 ? styles.text : styles.placeholderText}
            style={styles.input}
            placeholder="Postcode" />
          <PrimaryButton
            style={styles.saveBtn}
            //onPress={this.onLoginPressed}
            title={'SAVE'}
            /*disabled={this.props.isFetching}*/ >
            {this.props.isFetching ?
              <ActivityIndicator size="large" />
              :
              undefined}
          </PrimaryButton>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },
  scrollContainer: {
    paddingLeft: 25,
    paddingRight: 25,
    flex: 1,
  },
  text: {
    fontSize: 18,
    fontFamily: fonts.bold.regular,
    color: '#4a4a4a',
    letterSpacing: 1
  },
  placeholderText: {
    fontSize: 18,
    fontFamily: fonts.regular.regular
  },
  input: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  saveBtn: {
    marginTop: 30,
    width: '50%',
    alignSelf: 'center',
  }
});
