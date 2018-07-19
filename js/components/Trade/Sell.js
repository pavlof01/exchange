import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import Price from "../../values/Price";
import { currencyCodeToSymbol, keysToCamelCase } from "../../helpers";
import OnlineStatus from "../../style/OnlineStatus";
import User from "../../models/User";
import EscrowTimer from "./EscrowTimer";
import PrimaryButton from "../../style/ActionButton";
import { GiftedChat } from 'react-native-gifted-chat';

const styles = StyleSheet.create({
    centerContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
    },
    pickerIcon: {
        height: 24,
        width: 24,
    },
    pickerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
    },
    formRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    formStyle: {
        flex: 1,
    },
    huge: {
        color: '#222222',
        fontSize: 26,
        marginBottom: 8,
    },
    header: {
        color: '#2C09A3',
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 8,
    },
    info: {
        margin: 5,
        //padding: 8,
        //borderRadius: 4,
    },
    bold: {
        margin: 2,
        fontSize: 16,
        fontWeight: 'bold',
    },
    centeredText: {
        textAlign: 'center',
        //flex: 1,
        margin: 8,
    },
    error: {
        color: '#dd0057',
        marginBottom: 4,
    },
    warning: {
        color: '#8b572a',
        backgroundColor: '#fbf5eb',
        borderColor: '#f5a623',
        borderRadius: 4,
        borderWidth: 1,
        padding: 8,
        margin: 8,
    },
    me: {
        flex: 1,
    },
    trader: {
        flex:1,
        alignItems:'flex-end',
    }
});

export default class Sell extends Component {
    state = {
        messages: [],
        showInfoAboutPartner:false
    };

    componentWillMount() {
        /*const ws = new WebSocket('ws://host.com/path');
        this.setState({
          messages: [
            {
              _id: 1,
              text: 'Hello developer',
              createdAt: new Date(),
              user: {
                _id: 2,
                name: 'React Native',
              },
            },
          ],
        })*/
    }

    componentDidMount() {
        /*let tunnelledHosts = ['papabit.com'];
        let protocol = 'ws:';
        let postfix = '/cable';*/
        //let url = protocol + '//' + window.location.hostname + postfix;
    
        this.socket = new WebSocket('ws://91.228.155.81/cable');
        this.socket.onopen = () => {
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
        this.socket.onmessage = (event) => {
        let data = JSON.parse(event.data);
        switch (data.type) {
          case 'welcome':
          case 'ping':
            break;
          case 'confirm_subscription':
            console.warn('Subscription confirmed (Api::V1::ChatChannel)');
            break;
          default:
            let message = data.message;
            //console.warn(message);
            if (message.messages) {
              this.setState({messages: message.messages.map(message => keysToCamelCase(message))});
            } else if (message.error) {
              this.setState({error: message.error})
            }
            break;
        }
          };
        //this.socket.onopen = this.onConnect;
        //this.socket.onmessage = this.onMessage;
        this.socket.onclose = event => {
            event.wasClean ?
            console.log('Disconnect was clean (Api::V1::ChatChannel)') :
            console.log('Disconnect (Api::V1::ChatChannel):', event);
        }
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
            console.warn('Subscription confirmed (Api::V1::ChatChannel)');
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
          console.log('Disconnect was clean (Api::V1::ChatChannel)') :
          console.log('Disconnect (Api::V1::ChatChannel):', event);
      };
    
      sendMessage = (params = {}) => {
        //console.warn("sendMessage",params);
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
        //if (this.bodyInput.value) {
          this.sendMessage({body: 'test'});
          //this.bodyInput.value = '';
        //}
        
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
        <View key={messageUserId} style={{backgroundColor:'#00cc00'}}>
            <View style={messageUserId === this.props.user.id ? styles.trader : styles.me}>
                <View style={{width:'70%',backgroundColor:'red',padding:10,margin:10, flex:1}}>
                    <Text >
                        {message.item.body}
                    </Text>
                </View>
            </View>
        </View>
        )
    };

    onSend(messages = []) {
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, messages),
        }))
      }

    render() {
        let trade = this.props.trade || {};
        let ad = trade.ad || {};
        //console.warn(this.props.trade.conversation_id);
        //console.warn(JSON.stringify(this.props.trade,null,2));
        return (
            <ScrollView style={{backgroundColor:'#fff',paddingLeft:10, paddingRight:10, flex:1}}>  
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
            <View style={{marginTop:20, justifyContent:'center', flexDirection:'row', flex:1}}>
                <Text>Time left to pay:</Text>
                    <Text><EscrowTimer expiredAt={this.props.trade.escrow_expired_at}/> min</Text>
            </View>
            
                <FlatList
                    //style={{height:400,backgroundColor:'#cccccc'}}
                    data={this.state.messages}
                    keyExtractor={this._keyExtractor}
                    renderItem={this.renderMessage}
                />
            
            <PrimaryButton onPress={this.onSubmit} title={'Complete the transaction'} color={'#5B6EFF'} style={{marginTop:30}}/>
            <PrimaryButton title={'Cancel the transaction'} color={'#ffffff'} style={{marginTop:30}} fontStyle={{color:'#696969'}}/>
        {/*
            this.isTradeLoaded() ? <View style={styles.info}>
                <Text style={{textAlign:'center'}}>Your request Trader {this.partner.user_name} {this.actionTitle} cryptocurrency from {this.createdAt}</Text>
    
                <View style={styles.row}>
                    <Text style={[styles.header, styles.centeredText]}>{Price.build(trade.amount * trade.price).viewMain} {ad.currency_code + ' '}</Text>
                    <Image source={require('../../img/ic_swap.png')} style={[styles.pickerIcon, {margin: 16}]}/>
                    <Text style={[styles.header, styles.centeredText]}>{' ' + Price.build(trade.amount).viewCrypto} {ad.crypto_currency_code}</Text>
                </View>
                {
                    this.props.trade.status === 'new' && <Text>Осталось для оплаты <EscrowTimer
                        expiredAt={this.props.trade.escrow_expired_at}/> минут</Text>
                }
            </View> : <ActivityIndicator size="large"/>
            */}
            
            {/*<PartnerLink user={this.partner} isSeller={this.isUserBuying()}  onProfileOpen={this.props.openProfile}
                         online={this.props.partnerActivityStatuses[this.partner.id]} />*/}
    
            {/*
                trade.feedback_allowed &&
                    <View style={styles.info}>
                        <Feedback {...this.props} feedback={trade.feedbacks[this.props.user.id]}/>
                    </View>
            */}
    </ScrollView>
        )
      }
};
