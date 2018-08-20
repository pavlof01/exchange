import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Keyboard,
  Dimensions,
} from 'react-native';
import moment from 'moment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { injectIntl, intlShape } from 'react-intl';
import ChatView from './ChatView';
import Price from '../../values/Price';
import User from '../../models/User';
import EscrowTimer from './EscrowTimer';
import PrimaryButton from '../../style/ActionButton';
import { fonts } from '../../style/resourceHelpers';
import TraderInfo from '../TraderInfo';
import {
  currencyCodeToSymbol,
  getTradeTitle,
  TRADE_STATUS_PAID_CONFIRMED,
} from '../../helpers';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  me: {
    flex: 1,
    alignItems: 'flex-end',
  },
  trader: {
    flex: 1,
  },
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

class Buy extends Component {
  state = {
    textMessage: '',
    showKeyboard: false,
    enableScrollViewScroll: true,
  };

  keyboardDidShow = (e) => {
    // this.scrollKeyboard.props.scrollToPosition(0, height * 1.2 - e.endCoordinates.height);
  };

  keyboardWillHide = () => {
    // this.setState({ showKeyboard: false });
  };

  componentDidMount() {
    this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  getTradeDescriptionStyleByStatus = (status) => {
    switch (status) {
      case TRADE_STATUS_PAID_CONFIRMED:
        return styles.tradeDescriptionConfirmed;
      default:
        return styles.tradeDescription;
    }
  };

  // TODO: Remove old render message method.
  renderMessage = (message) => {
    const messageUserId = message.item.user.id;
    const { user } = this.props;
    return (
      <View style={{ paddingLeft: 10, paddingRight: 10, marginTop: 15 }} key={messageUserId}>
        <View style={messageUserId === user.id ? styles.me : styles.trader}>
          {messageUserId === user.id ? null
            : (
              <Text style={{ marginBottom: 10, color: 'grey' }}>
                {message.item.user.userName}
              </Text>
            )}
          <View style={{
            width: '85%', backgroundColor: '#ffffff', padding: 10, flex: 1, borderRadius: 10,
          }}
          >
            {message.item.body.length
              ? (
                <Text>
                  {message.item.body}
                </Text>
              )
              : (
                <Image
                  style={{ width: 150, height: 150 }}
                  source={{ uri: `http://91.228.155.81${message.item.attachment.url}` }}
                />
              )}
          </View>
          <Text
            style={{ fontSize: 12, marginTop: 5, color: 'grey' }}
          >
            {moment(message.item.date).format('LT')}
            {' '}
            {'(MSK)'}
          </Text>
        </View>
      </View>
    );
  };

  _scrollToInput = (reactNode) => {
    // Add a 'scroll' ref to your ScrollView
    this.scrollKeyboard.props.scrollToFocusedInput(reactNode);
  }

  render() {
    const {
      user,
      trade,
      isOnline,
      partnerName,
      messages,
      sendMessage,
      onCompleteHandler,
      onCancelHandler,
      intl,
    } = this.props;
    const {
      enableScrollViewScroll,
      showKeyboard,
      textMessage,
    } = this.state;
    const { ad } = trade;
    const currencyCode = trade.ad.currency_code || '';
    const cryptoCurrencyCode = trade.ad.crypto_currency_code || '';
    const received = `${Price.build(trade.amount).viewCrypto} ${cryptoCurrencyCode}`;
    const send = `${Price.build(trade.amount * trade.price).viewMain} ${currencyCode}`;
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
      <KeyboardAwareScrollView innerRef={(ref) => { this.scrollKeyboard = ref; }}>
        <View
          onStartShouldSetResponderCapture={() => {
            this.setState({ enableScrollViewScroll: true });
          }}
          style={styles.container}
        >
          <ScrollView
            scrollEnabled={enableScrollViewScroll}
            style={{ backgroundColor: '#fff', flex: 1 }}
            keyBoardShouldPersistTaps="never"
            nestedScrollEnabled
          >
            <View style={showKeyboard ? styles.displayNone : null}>
              <Text style={styles.title}>
                {getTradeTitle(intl, trade.status, ad.payment_method_code).toUpperCase()}
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
                  {intl.formatMessage({ id: 'app.trade.request', defaultMessage: 'Your request Trader' })}
                  <Text style={styles.tradeDescriptionBold}>
                    {partnerName}
                  </Text>
                  {intl.formatMessage({ id: 'app.trade.purchase', defaultMessage: '\nPURCHASE ONLINE cryptocurrency from\n {date} {time}' }, { date, time })}
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
                  {intl.formatMessage({ id: 'app.newTrade.text.timeLeft', defaultMessage: 'Time left to pay: ' })}
                  {' '}
                  <Text style={styles.timeLeftTimeText}>
                    <EscrowTimer expiredAt={trade.escrow_expired_at} />
                    {' '}
                    {intl.formatMessage({ id: 'app.trade.min', defaultMessage: 'min' })}
                  </Text>
                </Text>
              </View>
              <ChatView
                _scrollToInput={this._scrollToInput}
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
              <View style={(showKeyboard || trade.status !== 'new') ? styles.displayNone : styles.bottomButtons}>
                <PrimaryButton
                  onPress={onCompleteHandler}
                  title={intl.formatMessage({ id: 'app.trade.complete', defaultMessage: 'Complete the transaction' })}
                  color="#5B6EFF"
                  style={{ marginTop: 30 }}
                />
                <PrimaryButton
                  onPress={onCancelHandler}
                  title={intl.formatMessage({ id: 'app.trade.cancel', defaultMessage: 'Cancel the transaction' })}
                  color="#F5F5F5"
                  style={{ marginTop: 20 }}
                  fontStyle={{ color: '#000000' }}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

Buy.propTypes = {
  user: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  trade: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  isOnline: PropTypes.bool,
  partnerName: PropTypes.string,
  messages: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  sendMessage: PropTypes.string,
  onCompleteHandler: PropTypes.func,
  onCancelHandler: PropTypes.func,
};

export default injectIntl(Buy);
