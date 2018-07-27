import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Keyboard,
} from 'react-native';
import moment from 'moment';
import Price from '../../values/Price';
import ChatView from './ChatView';
import {
  currencyCodeToSymbol,
  getTradeTitle,
} from '../../helpers';
import TraderInfo from '../TraderInfo';
import User from '../../models/User';
import EscrowTimer from './EscrowTimer';
import PrimaryButton from '../../style/ActionButton';
import { fonts } from '../../style/resourceHelpers';

const styles = StyleSheet.create({
  displayNone: {
    display: 'none',
  },
  bottomButtons: {
    paddingBottom: 24,
    paddingStart: 60,
    paddingEnd: 60,
  },
  title: {
    color: '#9b9b9b',
    marginEnd: 17,
    marginStart: 17,
    marginTop: 16,
    paddingBottom: 3,
    marginBottom: 3,
    fontSize: 16,
    fontFamily: fonts.bold.regular,
    borderBottomColor: '#D5D5D5',
    borderBottomWidth: 1,
  },
  costText: {
    color: '#2c09a3',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 15,
    fontSize: 18,
    fontFamily: fonts.bold.regular,
  },
  tradeDescription: {
    lineHeight: 24,
    textAlign: 'center',
    color: '#4a4a4a',
    fontSize: 18,
    fontFamily: fonts.medium.regular,
  },
  tradeDescriptionConfirmed: {
    lineHeight: 24,
    textAlign: 'center',
    color: '#F9D749',
    fontSize: 18,
    fontFamily: fonts.medium.regular,
  },
  tradeDescriptionBold: {
    color: '#4a4a4a',
    fontFamily: fonts.bold.regular,
  },
  swapContainer: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 30,
  },
  swapTextLeft: {
    flex: 1,
    color: '#4a4a4a',
    textAlign: 'right',
    fontSize: 22,
    lineHeight: 22,
    fontFamily: fonts.bold.regular,
  },
  swapTextRight: {
    flex: 1,
    color: '#4a4a4a',
    textAlign: 'left',
    fontSize: 22,
    lineHeight: 22,
    fontFamily: fonts.bold.regular,
  },
  timeLeftText: {
    lineHeight: 24,
    textAlign: 'center',
    color: '#4a4a4a',
    fontSize: 12,
    fontFamily: fonts.medium.regular,
  },
  timeLeftTimeText: {
    lineHeight: 24,
    color: '#2c09a3',
    fontSize: 16,
    fontFamily: fonts.bold.regular,
  },
});

class Sell extends Component {
  state = {
    textMessage: '',
    showKeyboard: false,
    enableScrollViewScroll: true,
  };

  _keyboardDidShow = () => {
    this.setState({ showKeyboard: true });
  };

  _keyboardDidHide = () => {
    this.setState({ showKeyboard: false });
  };

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  getTradeDescriptionStyleByStatus = (status) => {
    switch (status) {
      case 'paid_confirmed':
        return styles.tradeDescriptionConfirmed;
      default:
        return styles.tradeDescription;
    }
  };

  render() {
    const {
      user,
      trade,
      isOnline,
      partnerName,
      messages,
      sendMessage,
      onPaidHandler,
    } = this.props;
    const {
      enableScrollViewScroll,
      showKeyboard,
      textMessage,
    } = this.state;
    const { ad } = trade;
    const currencyCode = trade.ad.currency_code || '';
    const cryptoCurrencyCode = trade.ad.crypto_currency_code || '';
    const received = `${Price.build(trade.amount * trade.price).viewMain} ${currencyCode}`;
    const send = `${Price.build(trade.amount).viewCrypto} ${cryptoCurrencyCode}`;
    let date = '--.--.--';
    let time = '--:-- (MSK)';
    try {
      const paidConfirmedAt = moment(trade.created_at).utcOffset('+0300');
      date = paidConfirmedAt.format('DD.MM.YYYY');
      time = `${paidConfirmedAt.format('HH:mm')} (MSK)`;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
    return (
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={{
          backgroundColor: '#fff', flex: 1,
        }}
      >
        <View style={showKeyboard ? styles.displayNone : null}>
          <Text style={styles.title}>
            {getTradeTitle(trade.status, ad.payment_method_code).toUpperCase()}
          </Text>
          <TraderInfo
            isOnline={isOnline}
            traderName={partnerName}
            completedTradesCount={User.approximateTradesCount(ad.user.completed_trades_count)}
            countryCode={ad.country_code}
          />
          <View style={{ paddingStart: 17, paddingEnd: 17 }}>
            <Text style={styles.costText}>
              {`1 ${ad.crypto_currency_code} / ${Price.build(ad.price).viewMain} ${currencyCodeToSymbol(ad.currency_code)}`}
            </Text>
            <Text style={this.getTradeDescriptionStyleByStatus(trade.status)}>
              {'Your request Trader '}
              <Text style={styles.tradeDescriptionBold}>
                {partnerName}
              </Text>
              {`\nSELL ONLINE cryptocurrency from\n${date} ${time} `}
            </Text>
            <View style={styles.swapContainer}>
              <Text style={styles.swapTextLeft}>
                {send}
              </Text>
              <Image
                source={require('../../img/ic_swap.png')}
                style={{
                  height: 18, width: 18, marginLeft: 15, marginRight: 15,
                }}
              />
              <Text style={styles.swapTextRight}>
                {received}
              </Text>
            </View>
            <Text style={styles.timeLeftText}>
              {'Time left to pay: '}
              <Text style={styles.timeLeftTimeText}>
                <EscrowTimer expiredAt={trade.escrow_expired_at} />
                {' min'}
              </Text>
            </Text>
          </View>

        </View>
        <ChatView
          onStartShouldSetResponderCapture={
            () => {
              this.setState({ enableScrollViewScroll: false });
              if (enableScrollViewScroll === false) {
                this.setState({ enableScrollViewScroll: true });
              }
            }
          }
          messages={messages}
          userId={user.id}
          onChangeText={newTextMessage => this.setState({ textMessage: newTextMessage })}
          onSubmitEditing={() => sendMessage(textMessage, () => this.setState({ textMessage: '' }))}
          messageValue={textMessage}
        />
        <View style={(showKeyboard) ? styles.displayNone : styles.bottomButtons}>
          {['paid_confirmed', 'expired_and_paid'].includes(trade.status)
            && (
            <PrimaryButton
              onPress={onPaidHandler}
              title="Send crypt"
              color="#5B6EFF"
              style={{ marginTop: 30 }}
            />
            )
          }
        </View>
      </ScrollView>
    );
  }
}

Sell.propTypes = {
  user: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  trade: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  isOnline: PropTypes.bool,
  partnerName: PropTypes.string,
  messages: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  sendMessage: PropTypes.string,
  onPaidHandler: PropTypes.func,
};

export default Sell;
