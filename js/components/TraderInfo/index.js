import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import { injectIntl, intlShape } from 'react-intl';
import Touchable from '../../style/Touchable';
import OnlineStatus from '../../style/OnlineStatus';
import { fonts } from '../../style/resourceHelpers';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusLine: {
    paddingStart: 17,
    paddingEnd: 17,
    flexDirection: 'row',
    height: 48,
    alignItems: 'center',
  },
  pickerIcon: {
    marginLeft: 10,
  },
  pickerIconOpen: {
    marginLeft: 10,
    transform: [
      { scaleY: -1 },
    ],
  },
  traderName: {
    color: '#4a4a4a',
    fontFamily: fonts.bold.regular,
    fontSize: 18,
    marginRight: 12,
  },
  completedTradesCount: {
    color: '#4a4a4a',
    fontFamily: fonts.medium.regular,
    fontSize: 16,
    marginRight: 12,
  },
  border: {
    marginStart: 17,
    marginEnd: 17,
    borderBottomColor: '#D5D5D5',
    borderBottomWidth: 1,
  },
  infoContainer: {
    backgroundColor: '#f8f9fb',
    paddingStart: 17,
    paddingEnd: 17,
    paddingTop: 20,
    paddingBottom: 20,
  },
  infoTitle: {
    color: '#4a4a4a',
    fontFamily: fonts.medium.regular,
    fontSize: 10,
    marginBottom: 6,
  },
  infoText: {
    color: '#4a4a4a',
    fontFamily: fonts.medium.regular,
    fontSize: 14,
    marginBottom: 6,
  },
  infoTextMargin: {
    marginBottom: 10,
  },
});

class TraderInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: props.isOpen || false,
    };
  }

  handleToggleInfo = () => {
    const {
      isOpen,
    } = this.state;
    this.setState({ isOpen: !isOpen });
  };

  render() {
    const {
      isOpen,
    } = this.state;
    const {
      intl,
      isOnline,
      traderName,
      completedTradesCount,
      countryCode,
    } = this.props;
    return (
      <View style={styles.container}>
        <Touchable onPress={this.handleToggleInfo}>
          <View style={styles.statusLine}>
            <OnlineStatus isOnline={isOnline} />
            <Text style={styles.traderName}>
              {traderName}
            </Text>
            <Text style={styles.completedTradesCount}>
              {completedTradesCount}
            </Text>
            <View style={styles.container} />
            <Image source={require('../../img/ic_picker.png')} style={isOpen ? styles.pickerIconOpen : styles.pickerIcon} />
          </View>
        </Touchable>
        {
          isOpen && (
            <View style={styles.infoContainer}>
              <Text style={styles.infoTitle}>
                {intl.formatMessage({ id: 'app.TraderInfo.label.country', defaultMessage: 'Country' }).toUpperCase()}
              </Text>
              <Text style={[styles.infoText, styles.infoTextMargin]}>
                {countryCode}
              </Text>
              <Text style={styles.infoTitle}>
                {intl.formatMessage({ id: 'app.TraderInfo.label.termOfTransaction', defaultMessage: 'Term of transaction' }).toUpperCase()}
              </Text>
              <Text style={styles.infoText}>
                {'This advertisement is for cash transactions only. Make a request only when you can make a cash payment within 12 hours.'}
              </Text>
            </View>
          )
        }
        <View style={styles.border} />
      </View>
    );
  }
}

TraderInfo.propTypes = {
  intl: intlShape.isRequired,
  isOpen: PropTypes.bool,
  isOnline: PropTypes.bool,
  traderName: PropTypes.string,
  completedTradesCount: PropTypes.string,
  countryCode: PropTypes.string,
};

export default injectIntl(TraderInfo);
