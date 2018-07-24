import React, {Component} from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  Keyboard,
  Dimensions
} from "react-native";
import Price from "../../values/Price";
import {currencyCodeToSymbol, keysToCamelCase} from "../../helpers";
import OnlineStatus from "../../style/OnlineStatus";
import User from "../../models/User";
import EscrowTimer from "./EscrowTimer";
import PrimaryButton from "../../style/ActionButton";
import moment from "moment";

const styles = StyleSheet.create({
  header: {
    color: "#2C09A3",
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  pickerIcon: {
    height: 24,
    width: 24,
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
  },
});

export default class Sell extends Component {
  state = {
    textMessage: "",
    showInfoAboutPartner: false,
    showKeyboard: false,
    expandChat: true
  };

  _keyboardDidShow = () => {
    this.setState({showKeyboard: true});
  };

  _keyboardDidHide = () => {
    this.setState({showKeyboard: false});
  };

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", this._keyboardDidHide);
  }

  showInfoAboutPartner = () => this.setState({showInfoAboutPartner: !this.state.showInfoAboutPartner});

  _keyExtractor = (item) => item.id;

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
    return (
      <ScrollView keyboardShouldPersistTaps='always'
                  style={{backgroundColor: "#fff", paddingLeft: 10, paddingRight: 10, flex: 1}}>
        <View style={this.state.showKeyboard ? styles.displayNone : null}>
          <View style={{
            width: "100%",
            paddingBottom: .5,
            borderBottomWidth: .5,
            borderColor: "rgba(0,0,0, 0.3)",
            marginTop: 15,
          }}>
            <Text style={{fontSize: 18, color: "grey", fontWeight: "bold"}}>TRANSFER VIA {ad.payment_method_code}</Text>
          </View>
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
          ) : null}
          <View style={styles.info}>
            <Text style={styles.centeredText}><Text
              style={styles.header}>1 {ad.crypto_currency_code} / {Price.build(ad.price).viewMain} {currencyCodeToSymbol(ad.currency_code)}</Text></Text>
          </View>
          <Text style={{textAlign: "center"}}>
            Your request Trader {this.props.partnerName} PURCHASE ONLINE cryptocurrency from {this.props.createdAt}
          </Text>
          <View style={styles.row}>
            <Text style={[styles.header, styles.centeredText]}>
              {Price.build(trade.amount * trade.price).viewMain} {ad.currency_code + " "}
            </Text>
            <Image source={require("../../img/ic_swap.png")} style={[styles.pickerIcon]}/>
            <Text style={[styles.header, styles.centeredText]}>
              {" " + Price.build(trade.amount).viewCrypto} {ad.crypto_currency_code}
            </Text>
          </View>
          <View style={{marginTop: 20, justifyContent: "center", flexDirection: "row", flex: 1}}>
            <Text>Time left to pay:</Text>
            <Text><EscrowTimer expiredAt={this.props.trade.escrow_expired_at}/> min</Text>
          </View>
        </View>
        <View style={{
          height: !this.state.expandChat ? Dimensions.get("window").height / 2.2 : 35,
          marginBottom: 15,
          marginTop: 15
        }}>
          <TouchableOpacity onPress={() => this.setState({expandChat: !this.state.expandChat})}>
            <View
              style={{width: "100%", borderBottomWidth: .5, borderColor: "grey", paddingBottom: 2, marginBottom: 15}}>
              <Text style={{color: "grey"}}>CHAT</Text>
            </View>
          </TouchableOpacity>
          <FlatList
            keyboardShouldPersistTaps='handled'
            style={{backgroundColor: "#F2F3F4"}}
            ref={ref => this.messagesFlatList = ref}
            data={this.props.messages}
            keyExtractor={this._keyExtractor}
            renderItem={this.renderMessage}
            inverted={true}
          />
          <TextInput
            style={this.state.expandChat ? [styles.displayNone, {height: 30}] : null}
            placeholder="Enter message"
            //returnKeyType='send'
            maxLength={128}
            //enablesReturnKeyAutomatically
            onSubmitEditing={() => this.props.sendMessage(this.state.textMessage, () => this.setState({textMessage: ""}))}
            value={this.state.textMessage}
            underlineColorAndroid="transparent"
            onChangeText={(textMessage) => this.setState({textMessage})}
          />
        </View>
        <View style={this.state.showKeyboard ? styles.displayNone : styles.bottomButtons}>
          <PrimaryButton
            onPress={this.props.onPaidHandler}
            title={"Send crypt"}
            color={"#5B6EFF"}
            style={{marginTop: 30}}
          />
        </View>
      </ScrollView>
    );
  }
};
