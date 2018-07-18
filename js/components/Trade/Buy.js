import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Image } from 'react-native';
import Price from "../../values/Price";
import { currencyCodeToSymbol } from "../../helpers";
import OnlineStatus from "../../style/OnlineStatus";
import User from "../../models/User";
import EscrowTimer from "./EscrowTimer";
import PrimaryButton from "../../style/ActionButton";

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
    }
});

export default class Buy extends Component {

    state = {
        amount:0,
        message:''
    };

  render() {
    let trade = this.props.trade || {};
    let ad = trade.ad || {};
    console.warn(ad.currency_code);
    return (
        <View style={{backgroundColor:'#fff',paddingLeft:10, paddingRight:10, flex:1}}>  
        <View style={{width:'100%',paddingBottom:.5,borderBottomWidth:.5, borderColor: 'rgba(0,0,0, 0.3)',marginTop:15,}}>
            <Text style={{fontSize:18,  color:'grey',fontWeight:'bold'}}>TRANSFER VIA {ad.payment_method_code}</Text>
        </View>
        <View style={{width:'100%',paddingBottom:.5,borderBottomWidth:.5, borderColor: 'rgba(0,0,0, 0.3)',marginTop:15,flexDirection:'row',alignItems:'center'}}>
            <OnlineStatus isOnline={this.props.isOnline}/>
            <Text style={{fontSize:18, fontWeight:'bold'}}>{this.props.partnerName}</Text>
            <Text style={{marginLeft:10}}>{User.approximateTradesCount(this.props.user.completed_trades_count)}</Text>
        </View>
        <Text style={{color:"#4A4A4A", fontSize:10, marginTop:10}}>COST</Text>
        <View style={styles.info}>
            <Text style={styles.centeredText}><Text style={styles.header}>1 {ad.crypto_currency_code} / {Price.build(ad.price).viewMain} {currencyCodeToSymbol(ad.currency_code)}</Text></Text>
        </View>
        <Text style={{color:"#4A4A4A",fontSize:10, marginBottom:10}}>AMOUNT</Text>
        <View style={{flexDirection:'row'}}>
            <View style={{ borderColor: 'gray', borderBottomWidth: 1,flex:1, flexDirection:'row'}}>
                <TextInput
                style={{paddingRight:30}}
                placeholder='0'
                onChangeText={(amount) => this.setState({amount})}
                value={this.state.amount}/>
                <Text style={{position:'absolute',right:0, color:'grey'}}>{ad.currency_code}</Text>
            </View>
            <Image source={require('../../img/ic_swap.png')} style={{height:18, width:18, marginLeft:15, marginRight:15}}/>
            <View style={{ borderColor: 'gray', borderBottomWidth: 1, flex:1, flexDirection:'row'}}>
                <Text>{Price.build(this.state.amount / ad.price).viewCrypto}</Text>
                <Text style={{position:'absolute',right:0, color:'grey'}}>{ad.crypto_currency_code}</Text>
            </View>
        </View>
        <Text style={{marginTop:10}}>Limit: {Math.round(ad.limit_min * 10) / 10} - {Math.round(ad.limit_max * 10) / 10} {currencyCodeToSymbol(ad.currency_code)}</Text>
        <Text style={{color:"#4A4A4A", fontSize:10, marginTop:10, marginBottom:10}}>MESSAGE</Text>
        <TextInput
            style={{borderColor: 'rgba(0,0,0, 0.3)', borderBottomWidth: 1,fontSize:18}}
            placeholder='You may leave a message'
            onChangeText={(message) => this.setState({message})}
            value={this.state.message}/>
        <View style={{marginTop:20, justifyContent:'space-around', flexDirection:'row', flex:1}}>
            <Text>Time limit for payment of seller's invoice:</Text>
                <Text><EscrowTimer expiredAt={this.props.trade.escrow_expired_at}/> min</Text>
        </View>
        <PrimaryButton title={'SEND REQUSET TO A TRADER'} color={'#5B6EFF'} /*style={{margin: 8, flex: 1}}*//>
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
</View>
    )
  }
};
