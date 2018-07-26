import React, {Component} from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Keyboard,
  Dimensions,
} from "react-native";
import Price from "../../values/Price";
import {currencyCodeToSymbol} from "../../helpers";
import OnlineStatus from "../../style/OnlineStatus";
import User from "../../models/User";
import EscrowTimer from "./EscrowTimer";
import PrimaryButton from "../../style/ActionButton";
import moment from "moment";
import { fonts } from "../../style/resourceHelpers";

const styles = StyleSheet.create({
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
    //flex: 1,
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
});

export default class Buy extends Component {

  state = {
    amount: 0,
    textMessage: "",
    showInfoAboutPartner: false,
    showKeyboard: false,
    expandChat: true
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
      <ScrollView
        keyboardShouldPersistTaps='always'
        scrollEnabled={!this.state.showKeyboard}
        style={{backgroundColor: "#fff", flex: 1}}
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
          ) : null}

          <Text style={{color: "#4A4A4A", fontSize: 10, marginTop: 10}}>COST</Text>
          <View style={styles.info}>
            <Text style={styles.centeredText}><Text
              style={styles.header}>1 {ad.crypto_currency_code} / {Price.build(ad.price).viewMain} {currencyCodeToSymbol(ad.currency_code)}</Text></Text>
          </View>
          <Text style={{color: "#4A4A4A", fontSize: 10, marginBottom: 10}}>AMOUNT</Text>
          <View style={{flexDirection: "row"}}>
            <View style={{borderColor: "gray", borderBottomWidth: 1, flex: 1, flexDirection: "row"}}>
              <TextInput
                style={{paddingRight: 30}}
                placeholder='0'
                onChangeText={(amount) => this.setState({amount})}
                value={this.state.amount}/>
              <Text style={{position: "absolute", right: 0, color: "grey"}}>{ad.currency_code}</Text>
            </View>
            <Image source={require("../../img/ic_swap.png")}
                   style={{height: 18, width: 18, marginLeft: 15, marginRight: 15}}/>
            <View style={{borderColor: "gray", borderBottomWidth: 1, flex: 1, flexDirection: "row"}}>
              <Text>{Price.build(this.state.amount / ad.price).viewCrypto}</Text>
              <Text style={{position: "absolute", right: 0, color: "grey"}}>{ad.crypto_currency_code}</Text>
            </View>
          </View>
          <View style={{flexDirection: "row", justifyContent: "space-between"}}>
            <Text
              style={{marginTop: 10}}>Limit: {Math.round(ad.limit_min * 10) / 10} - {Math.round(ad.limit_max * 10) / 10} {currencyCodeToSymbol(ad.currency_code)}</Text>
            <Text
              style={{marginTop: 10}}>Limit: {Price.build(ad.limit_min / ad.price).viewCrypto} - {Price.build(ad.limit_max / ad.price).viewCrypto} {currencyCodeToSymbol(ad.currency_code)}</Text>
          </View>
          <View style={{marginTop: 20, justifyContent: "space-around", flexDirection: "row", flex: 1}}>
            <Text>Time limit for payment of seller's invoice:</Text>
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
            placeholder="You may leave a message"
            //returnKeyType='return'
            maxLength={128}
            //enablesReturnKeyAutomatically
            onSubmitEditing={() => this.props.sendMessage(this.state.textMessage, () => this.setState({textMessage: ""}))}
            value={this.state.textMessage}
            underlineColorAndroid="transparent"
            onChangeText={(textMessage) => this.setState({textMessage})}
          />
        </View>
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
    );
  }
};
