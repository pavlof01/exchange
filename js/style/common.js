import { StyleSheet, Text } from 'react-native';
import React from 'react';
import { fonts } from './resourceHelpers';

export const common = StyleSheet.create({
  hintText: {
    marginTop: 4,
    marginLeft: 4,
    marginBottom: 20,
    fontSize: 10,
    textAlign: 'left',
    fontFamily: fonts.medium.regular,
    color: '#686868',
    letterSpacing: 1.5,
  },
});

export const Hint = props => <Text {...props} style={common.hintText} />;
