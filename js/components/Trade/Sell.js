import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import Price from "../../values/Price";
import { currencyCodeToSymbol } from "../../helpers";
import OnlineStatus from "../../style/OnlineStatus";
import User from "../../models/User";
import EscrowTimer from "./EscrowTimer";
import PrimaryButton from "../../style/ActionButton";

export default class Sell extends Component {
  render() {
    return (
      <View>
        <Text>SELL</Text>
      </View>
    )
  }
};
