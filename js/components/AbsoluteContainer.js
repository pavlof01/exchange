import React, { Component } from 'react';
import {
  View, StyleSheet, Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';

const { width } = Dimensions.get('window');

const MARGIN_SIDE = 20;
// ОТСТУПЫ ПО БОКАМ

const styles = StyleSheet.create({
  body: {
    flex: 1,
    width: width - MARGIN_SIDE,
    position: 'absolute',
    backgroundColor: '#fff',
    alignSelf: 'center',
  },
});

class AbsoluteContainer extends Component {
  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    const { children } = this.props;
    return (
      <View style={styles.body}>
        {children}
      </View>
    );
  }
}

AbsoluteContainer.propTypes = {
  children: PropTypes.any, // eslint-disable-line react/forbid-prop-types
};

export default AbsoluteContainer;
