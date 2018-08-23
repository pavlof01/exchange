import { StyleSheet, Text } from 'react-native';
import React from 'react';
import { fonts } from './resourceHelpers';

export const common = StyleSheet.create({
  hintText: {
    marginTop: 4,
    marginLeft: 4,
    fontSize: 11,
    textAlign: 'left',
    fontFamily: fonts.medium.regular,
  },
});

export const Hint = props => <Text {...props} style={common.hintText} />;
