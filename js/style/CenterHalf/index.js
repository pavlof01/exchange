import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

const CenterHalf = props => (
  <View style={{ margin: 16, flex: 1, flexDirection: 'row' }}>
    <View style={{ flex: 1 }} />
    <View style={{ flex: 2 }}>
      {props.children}
    </View>
    <View style={{ flex: 1 }} />
  </View>
);

CenterHalf.propTypes = {
  children: PropTypes.any, // eslint-disable-line react/forbid-prop-types
};

export default CenterHalf;
