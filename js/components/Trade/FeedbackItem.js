import React from 'react';
import PropTypes from 'prop-types';

import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import { fonts } from '../../style/resourceHelpers';
import Touchable from '../../style/Touchable';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingEnd: 17,
    paddingStart: 17,
    paddingTop: 6,
    paddingBottom: 6,
  },
  checkBoxColumn: {
    width: 18,
  },
  descriptionsColumn: {
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    fontSize: 16,
    fontFamily: fonts.bold.regular,
  },
  description: {
    fontSize: 16,
    fontFamily: fonts.medium.regular,
    color: '#000000',
  },
});

class FeedbackItem extends React.PureComponent {
  render() {
    const {
      onPress,
      active,
      title,
      titleColor,
      description,
    } = this.props;
    return (
      <Touchable onPress={onPress}>
        <View style={styles.container}>
          <View style={styles.checkBoxColumn}>
          </View>
          <View style={styles.descriptionsColumn}>
            <Text style={[styles.title, { color: titleColor }]}>
              {title}
            </Text>
            <Text style={styles.description}>
              {description}
            </Text>
          </View>
        </View>
      </Touchable>
    );
  }
}

FeedbackItem.propTypes = {
  onPress: PropTypes.func,
  active: PropTypes.bool,
  title: PropTypes.string,
  titleColor: PropTypes.string,
  description: PropTypes.string,
};

export default FeedbackItem;
