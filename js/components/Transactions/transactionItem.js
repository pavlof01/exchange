import React, { Component } from 'react';
import {
  View, Text, StyleSheet, Image,
} from 'react-native';
import moment from 'moment';
import Touchable from '../../style/Touchable';

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 15,
    paddingTop: 15,
    borderBottomColor: 'rgba(238, 238, 238,0.8)',
    borderBottomWidth: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  rowContaineCryptIcon: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  cryptIcon: {
    width: 30,
    height: 30,
  },
  rowContaineArrowIcon: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  arrowIcon: {
    transform: [
      { rotateZ: '-90deg' },
    ],
  },
  rowContainerBody: {
    flex: 6,
  },
  rowContainerAmount: {
    flexDirection: 'row',
  },
  amountText: {
    fontSize: 17,
    color: '#000000',
    fontWeight: '400',
  },
  dateAndStatusContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateText: {
    flex: 1,
    fontSize: 12,
    color: '#a7a7a7',
    fontWeight: '300',
  },
  status: {
    flex: 1,
    textAlign: 'right',
    color: '#25367e',
    fontSize: 12,
    fontWeight: '300',
    paddingRight: 10,
  },
  cryptAdressContainer: {
    height: 40,
    width: '100%',
    borderBottomColor: 'rgba(238, 238, 238,0.8)',
    borderBottomWidth: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  cryptAdress: {
    color: '#000000',
    opacity: 0.47,
    fontFamily: 'System',
    fontWeight: '300',
    fontSize: 14,
  },
});

class TransactionItem extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
    };
  }

  render() {
    const { item } = this.props;
    return (
      <Touchable onPress={() => this.setState({ isOpen: !this.state.isOpen })}>
        <View>
          <View style={[styles.rowContainer, this.state.isOpen ? { borderBottomWidth: 0 } : null]}>
            <View style={styles.rowContaineCryptIcon}>
              <Image
                style={styles.cryptIcon}
                resizeMode="contain"
                source={item.data.currency === 'BTC'
                  ? require('../../img/ic_btc.png') : require('../../img/ic_eth.png')}
              />
            </View>
            <View style={styles.rowContainerBody}>
              <View style={styles.rowContainerAmount}>
                <Text style={styles.amountText}>
                  {item.data.currency}
                  {' '}
                </Text>
                <Text style={styles.amountText}>
                  {item.amount}
                </Text>
              </View>
              <View style={styles.dateAndStatusContainer}>
                <Text style={styles.dateText}>
                  {moment(item.date).format('YYYY.MM.DD H:mm:ss')}
                </Text>
                <Text style={styles.status}>
                  {this.state.isOpen ? 'Confirm' : null}
                </Text>
              </View>
            </View>
            <View style={styles.rowContaineArrowIcon}>
              <Image style={[styles.arrowIcon, this.state.isOpen ? { transform: [{ rotateZ: '0deg' }] } : null]} source={require('../../img/ic_picker.png')} />
            </View>
          </View>
          {this.state.isOpen ? (
            <View style={[styles.cryptAdressContainer]}>
              <Text style={styles.cryptAdress}>
                {item.comment}
              </Text>
            </View>
          ) : null}

        </View>
      </Touchable>
    );
  }
}

export default TransactionItem;
