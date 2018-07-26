import React, {Component} from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from "react-native";
import ChatView from "./ChatView";
import Price from "../../values/Price";
import {currencyCodeToSymbol} from "../../helpers";
import OnlineStatus from "../../style/OnlineStatus";
import User from "../../models/User";
import EscrowTimer from "./EscrowTimer";
import PrimaryButton from "../../style/ActionButton";
import moment from "moment";
import { fonts } from "../../style/resourceHelpers";
import KeyboardAvoidingWrapView from '../KeyboardAvoidingWrapView';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  header: {
    color: "#2C09A3",
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 8,
  },
  info: {
    margin: 5,
  },
  centeredText: {
    textAlign: "center",
    margin: 8,
  },
  me: {
    flex: 1,
    alignItems: "flex-end",
  },
  trader: {
    flex: 1,
  },
  displayNone: {
    display: "none",
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
  tradeDescriptionBold: {
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

export default class Buy extends Component {

  state = {
    amount: 0,
    textMessage: "",
    showInfoAboutPartner: false,
    showKeyboard: false,
    expandChat: true,
    enableScrollViewScroll: true,
  };

  _keyboardDidShow = () => {
    if (!this.state.expandChat) {
      this.setState({showKeyboard: true});
    }
  };

  _keyboardDidHide = () => {
    this.setState({showKeyboard: false});
  };

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", this._keyboardDidHide);
  }

  showInfoAboutPartner = () => this.setState({showInfoAboutPartner: !this.state.showInfoAboutPartner});

  // TODO: Remove old render message method.
  renderMessage = (message) => {
    const messageUserId = message.item.user.id;
    return (
      <View style={{paddingLeft: 10, paddingRight: 10, marginTop: 15}} key={messageUserId}>
        <View style={messageUserId === this.props.user.id ? styles.me : styles.trader}>
          {messageUserId === this.props.user.id ? null :
            <Text style={{marginBottom: 10, color: "grey"}}>{message.item.user.userName}</Text>}
          <View style={{width: "85%", backgroundColor: "#ffffff", padding: 10, flex: 1, borderRadius: 10}}>
            {message.item.body.length ?
              (<Text>{message.item.body}</Text>)
              :
              (<Image style={{width: 150, height: 150}}
                      source={{uri: "http://91.228.155.81" + message.item.attachment.url}}/>)}
          </View>
          <Text
            style={{fontSize: 12, marginTop: 5, color: "grey"}}>{moment(message.item.date).format("LT")} (MSK)</Text>
        </View>
      </View>
    );
  };

  render() {
    let trade = this.props.trade || {};
    let ad = trade.ad || {};
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
    }
    return (
      <KeyboardAvoidingWrapView
        behavior={'padding'}
        style={styles.container}
      >
        <View
          onStartShouldSetResponderCapture={() => {
            this.setState({ enableScrollViewScroll: true });
          }}
          style={styles.container}
        >
          <ScrollView
            scrollEnabled={this.state.enableScrollViewScroll}
            style={{backgroundColor: "#fff", flex: 1}}
            keyBoardShouldPersistTaps={'never'}
          >
            <View style={this.state.showKeyboard ? styles.displayNone : null}>
              <Text style={styles.title}>{`Transfer via ${ad.payment_method_code}`.toUpperCase()}</Text>
              <View style={{ paddingStart: 17, paddingEnd: 17 }}>
              <TouchableOpacity onPress={this.showInfoAboutPartner} style={{
                width: "100%",
                paddingBottom: .5,
                borderBottomWidth: .5,
                borderColor: "rgba(0,0,0, 0.3)",
                marginTop: 15,
                flexDirection: "row",
                alignItems: "center"
              }}>
                <OnlineStatus isOnline={this.props.isOnline}/>
                <Text style={{fontSize: 18, fontWeight: "bold"}}>{this.props.partnerName}</Text>
                <Text style={{marginLeft: 10}}>{User.approximateTradesCount(this.props.user.completed_trades_count)}</Text>
              </TouchableOpacity>
              {this.state.showInfoAboutPartner ? (
                <View style={{backgroundColor: "#F8F9FB", paddingBottom: 15, paddingTop: 15}}>
                  <Text style={{color: "#4A4A4A", fontSize: 10, marginTop: 10, marginBottom: 15}}>Country</Text>
                  <Text style={{fontSize: 18}}>{ad.country_code}</Text>
                  <Text style={{color: "#4A4A4A", fontSize: 10, marginTop: 10, marginBottom: 15}}>Term of transaction</Text>
                  <Text style={{fontSize: 18}}>This advertisement is for cash transactions only. Make a request only when
                    you can make a cash payment within 12 hours.</Text>
                </View>
              ) : null
              }
              <Text style={styles.costText}>{`1 ${ad.crypto_currency_code} / ${Price.build(ad.price).viewMain} ${currencyCodeToSymbol(ad.currency_code)}`}</Text>
              <Text style={styles.tradeDescription}>{'Your request Trader '}<Text style={styles.tradeDescriptionBold}>{this.props.partnerName}</Text>{`\nPURCHASE ONLINE cryptocurrency from\n${date} ${time} `}</Text>
              <View style={styles.swapContainer}>
                <Text style={styles.swapTextLeft}>{send}</Text>
                <Image source={require("../../img/ic_swap.png")}
                       style={{height: 18, width: 18, marginLeft: 15, marginRight: 15}}
                />
                <Text style={styles.swapTextRight}>{received}</Text>
              </View>

              <Text style={styles.timeLeftText}>Time left to pay: <Text style={styles.timeLeftTimeText}><EscrowTimer expiredAt={this.props.trade.escrow_expired_at}/> min</Text></Text>

            </View>
            <ChatView
              onStartShouldSetResponderCapture={
                () => {
                  this.setState({ enableScrollViewScroll: false });
                  if (this.state.enableScrollViewScroll === false) {
                    this.setState({ enableScrollViewScroll: true });
                  }
                }
              }
              messages={this.props.messages}
              userId={this.props.user.id}
              onChangeText={(textMessage) => this.setState({textMessage})}
              onSubmitEditing={() => this.props.sendMessage(this.state.textMessage, () => this.setState({textMessage: ""}))}
              messageValue={this.state.textMessage}
            />
            <View style={(this.state.showKeyboard || this.props.trade.status !== 'new') ? styles.displayNone : styles.bottomButtons}>
              <PrimaryButton
                onPress={this.props.onCompleteHandler}
                title={"COMPLETE THE TRANSACTION"}
                color={"#5B6EFF"}
                style={{marginTop: 30}}
              />
              <PrimaryButton
                onPress={this.props.onCancelHandler}
                title={"CANCEL THE TRANSACTION"}
                color={"#F5F5F5"}
                style={{marginTop: 20}}
                fontStyle={{color: '#000000'}}
              />
            </View>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingWrapView>
    );
  }
};
