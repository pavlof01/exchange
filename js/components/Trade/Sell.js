import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
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

export default class Sell extends Component {
    state = {
        amount:0,
        message:'',
        showInfoAboutPartner:false
    };

    showInfoAboutPartner = () => this.setState({showInfoAboutPartner:!this.state.showInfoAboutPartner});
    render() {
        let trade = this.props.trade || {};
        let ad = trade.ad || {};
        console.warn(ad);
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
            <PrimaryButton title={'Complete the transaction'} color={'#5B6EFF'} style={{marginTop:30}}/>
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
