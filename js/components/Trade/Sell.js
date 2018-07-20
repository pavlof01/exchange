import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, FlatList, Alert, KeyboardAvoidingView, Keyboard, Dimensions } from 'react-native';
import Price from "../../values/Price";
import { currencyCodeToSymbol, keysToCamelCase } from "../../helpers";
import OnlineStatus from "../../style/OnlineStatus";
import User from "../../models/User";
import EscrowTimer from "./EscrowTimer";
import PrimaryButton from "../../style/ActionButton";
import moment from 'moment';

const styles = StyleSheet.create({
    header: {
        color: '#2C09A3',
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 8,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    pickerIcon: {
        height: 24,
        width: 24,
    },
    info: {
        margin: 5,
        //padding: 8,
        //borderRadius: 4,
    },
    centeredText: {
        textAlign: 'center',
        //flex: 1,
        margin: 8,
    },
    me: {
        flex: 1,
        alignItems:'flex-end',
    },
    trader: {
        flex:1,
    },
    displayNone: {
        display: 'none',
    }
});

export default class Sell extends Component {
    state = {
        messages: [],
        textMessage:'',
        showInfoAboutPartner:false,
        showKeyboard:false,
        expandChat:true
    };

      _keyboardDidShow = () => {
        this.setState({showKeyboard:true});
        if (this.state.messages.length > 4){
        this.messagesFlatList.scrollToIndex({animated: true, index: 0});
        }
      }
    
      _keyboardDidHide = () => {
        this.setState({showKeyboard:false});
      }

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
        /*let tunnelledHosts = ['papabit.com'];
        let protocol = 'ws:';
        let postfix = '/cable';*/
        //let url = protocol + '//' + window.location.hostname + postfix;
    
        this.socket = new WebSocket('ws://91.228.155.81/cable');
        this.socket.onopen = this.onConnect;
        this.socket.onmessage = this.onMessage;
        this.socket.onclose = this.onDisconnect;
      }

      onConnect = () => {
        let intervalId = setInterval(() => {
          switch (this.socket.readyState) {
            case this.socket.CLOSING:
            case this.socket.CLOSED:
              clearInterval(intervalId);
              break;
            case this.socket.OPEN:
              this.send({command: 'subscribe'});
              clearInterval(intervalId);
              break;
            default:
              break;
          }
        }, 100);
      };
    
      onMessage = (event) => {
        let data = JSON.parse(event.data);
        switch (data.type) {
          case 'welcome':
          case 'ping':
            break;
          case 'confirm_subscription':
            console.log('Subscription confirmed (Api::V1::ChatChannel)');
            break;
          default:
            let message = data.message;
            if (message.messages) {
              this.setState({messages: message.messages.map(message => keysToCamelCase(message))});
            } else if (message.error) {
              this.setState({error: message.error})
            }
            break;
        }
      };
    
      onDisconnect = (event) => {
        event.wasClean ?
          console.warn('Disconnect was clean (Api::V1::ChatChannel)') :
          console.warn('Disconnect (Api::V1::ChatChannel):', event);
      };
    
      sendMessage = (params = {}) => {
        this.setState({error: null});
        this.send({
          command: 'message',
          data: JSON.stringify({...params, action: 'create'}),
        });
      };
    
      send = (data) => {
        this.socket.send(
          JSON.stringify({
            ...data,
            identifier: JSON.stringify({
              channel: 'Api::V1::ChatChannel',
              conversation_id: this.props.trade.conversation_id
            })
          })
        );
      };
    
      onSubmit = () => {
        if (this.state.textMessage.length) {
            this.setState({textMessage:''});
            this.sendMessage({body: this.state.textMessage});
        }else{
            Alert.alert(
                'Введите сообщение',
              )
        }
        
      };
    
      formatDate(dateString) {
        let time = new Time(dateString);
        return time.hours + ':' + time.minutes;
      }
    
      uploadFile = (event) => {
        this.reader.readAsBinaryString(event.target.files[0]);
      };
    
      fileChanged = (event) => {
        this.sendMessage({
          attachment: btoa(event.target.result),
          filename: this.fileInput.files.item(0).name
        });
    
        this.fileInput.value = '';
      };
    
    showInfoAboutPartner = () => this.setState({showInfoAboutPartner:!this.state.showInfoAboutPartner});

    _keyExtractor = (item) => item.id;

    renderMessage = (message) => {
        const messageUserId = message.item.user.id;
        return (
        <View style={{paddingLeft:10,paddingRight:10,marginTop:15}} key={messageUserId}>
            <View style={messageUserId === this.props.user.id ? styles.me : styles.trader}>
            {messageUserId === this.props.user.id ? null:<Text style={{marginBottom:10, color:'grey'}}>{ message.item.user.userName}</Text>}
                <View style={{width:'85%',backgroundColor:'#ffffff',padding:10, flex:1, borderRadius:10}}>
                    <Text >
                        {message.item.body}
                    </Text>
                </View>
                <Text style={{fontSize:12,marginTop:5,color:'grey'}}>{moment(message.item.date).format('LT')} (MSK)</Text>
            </View>
        </View>
        )
    };

    render() {
        let trade = this.props.trade || {};
        let ad = trade.ad || {};
        return (
            <ScrollView style={{backgroundColor:'#fff',paddingLeft:10, paddingRight:10, flex:1}}>
            <View style={this.state.showKeyboard ? styles.displayNone:null}>  
            <View style={{width:'100%',paddingBottom:.5,borderBottomWidth:.5, borderColor: 'rgba(0,0,0, 0.3)',marginTop:15,}}>
                <Text style={{fontSize:18,  color:'grey',fontWeight:'bold'}}>TRANSFER VIA {ad.payment_method_code}</Text>
            </View>
            <TouchableOpacity onPress={this.showInfoAboutPartner} style={{width:'100%',paddingBottom:.5,borderBottomWidth:.5, borderColor: 'rgba(0,0,0, 0.3)',marginTop:15,flexDirection:'row',alignItems:'center'}}>
                <OnlineStatus isOnline={this.props.isOnline}/>
                <Text style={{fontSize:18, fontWeight:'bold'}}>{this.props.partnerName}</Text>
                <Text style={{marginLeft:10}}>{User.approximateTradesCount(this.props.user.completed_trades_count)}</Text>
            </TouchableOpacity>
            {this.state.showInfoAboutPartner ? (
            <View style={{backgroundColor:'#F8F9FB',paddingBottom:15,paddingTop:15}}>
                <Text style={{color:"#4A4A4A", fontSize:10, marginTop:10, marginBottom:15}}>Country</Text>
                <Text style={{fontSize:18}}>{ad.country_code}</Text>
                <Text style={{color:"#4A4A4A", fontSize:10, marginTop:10, marginBottom:15}}>Term of transaction</Text>
                <Text style={{fontSize:18}}>This advertisement is for cash transactions only. Make a request only when you can make a cash payment within 12 hours.</Text>
            </View>
            ):null}
            <View style={styles.info}>
                <Text style={styles.centeredText}><Text style={styles.header}>1 {ad.crypto_currency_code} / {Price.build(ad.price).viewMain} {currencyCodeToSymbol(ad.currency_code)}</Text></Text>
            </View>
            <Text style={{textAlign:'center'}}>
            Your request Trader {this.props.partnerName} PURCHASE ONLINE cryptocurrency from {this.props.createdAt}
            </Text>
            <View style={styles.row}>
                <Text style={[styles.header, styles.centeredText]}>
                    {Price.build(trade.amount * trade.price).viewMain} {ad.currency_code + ' '}
                </Text>
                <Image source={require('../../img/ic_swap.png')} style={[styles.pickerIcon]}/>
                <Text style={[styles.header, styles.centeredText]}>
                    {' ' + Price.build(trade.amount).viewCrypto} {ad.crypto_currency_code}
                </Text>
            </View>
            <View style={{marginTop:20, justifyContent:'center', flexDirection:'row', flex:1}}>
                <Text>Time left to pay:</Text>
                <Text><EscrowTimer expiredAt={this.props.trade.escrow_expired_at}/> min</Text>
            </View>
            </View> 
            <View style={{height:!this.state.expandChat ? Dimensions.get('window').height / 2.2:35 ,marginBottom:15,marginTop:15}}>
            <TouchableOpacity onPress={() => this.setState({expandChat:!this.state.expandChat})}>
                <View style={{width:'100%',borderBottomWidth:.5,borderColor:'grey',paddingBottom:2,marginBottom:15}}>
                    <Text style={{color:'grey'}}>CHAT</Text>
                </View>
            </TouchableOpacity>
                <FlatList
                    style={{backgroundColor:'#F2F3F4'}}
                    ref={ref => this.messagesFlatList = ref}
                    data={this.state.messages}
                    keyExtractor={this._keyExtractor}
                    renderItem={this.renderMessage}
                    inverted={true}
                />
                <TextInput
                    style={this.state.expandChat ? [styles.displayNone,{height:30}]:null}
                    placeholder="Введите сообщение"
                    returnKeyType='send'
                    onSubmitEditing={this.onSubmit} 
                    value={this.state.textMessage}
                    underlineColorAndroid="transparent"
                    onChangeText={(textMessage) => this.setState({textMessage})}
                    />
            </View>
            <View style={this.state.showKeyboard ? styles.displayNone:null}>
                <PrimaryButton title={'Complete the transaction'} color={'#5B6EFF'} style={{marginTop:30}}/>
                <PrimaryButton title={'Cancel the transaction'} color={'#ffffff'} style={{marginTop:30}} fontStyle={{color:'#696969'}}/>
            </View>
    </ScrollView>
        )
      }
};
