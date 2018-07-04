import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    Text,
    View,
    StyleSheet, FlatList,
} from 'react-native';
import CenterProgressBar from "../../style/CenterProgressBar";
import Api from "../../services/Api";
import Price from "../../values/Price";
import {currencyCodeToSymbol, tradePartner, tradeType, tradeTypeBuy} from "../../helpers";
import OnlineStatus from "../../style/OnlineStatus";
import Touchable from "../../style/Touchable";
import HeaderBar from "../../style/HeaderBar";
import {withCommonStatusBar} from "../../style/navigation";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    centerContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 48,
        paddingLeft: 8,
        paddingRight: 8,
    },
    alternate_background: {
        backgroundColor: '#EEEEEE'
    },
    userName: {
        fontWeight: 'bold',
        color: '#333333',
        fontSize: 16,
        paddingLeft: 2,
        paddingRight: 2,
        flex: 2,
    },
    amount: {
        color: '#111111',
        fontWeight: 'bold',
        paddingLeft: 2,
        paddingRight: 2,
        textAlign: 'center',
        flex: 2,
    },
    info: {
        paddingLeft: 2,
        paddingRight: 2,
        textAlign: 'center',
        flex: 2,
    },
    smallInfo: {
        paddingLeft: 2,
        paddingRight: 2,
        flex: 1,
    },
});

export default class Trades extends Component {
    state = {
        pending: false,
        trades: [],
    };

    componentDidMount() {
        this.load({page: 1})
    }

    load = (params = {}) => {
        this.setState({...this.state, pending: true});

        params = {
            ...this.props.params,
            sort: this.state.sort,
            scope: 'info_panel',
            limit: 10,
            ...params
        };

        Api.get('/trades', {sort: this.state.sort, limit: 2, scope: 'info_panel', ...params})
            .then(response => this.setState({
                pending: false,
                trades: response.data.trades.map(trade => trade),
                page: response.data.page,
                pages: response.data.pages,
                sort: params.sort
            }))
    };

    renderItem = ({item, index}) => {
        const trade = item;
        const partner = tradePartner(trade, this.props.user.id);
        const alt = index % 2 === 1;
        return (
            <Touchable onPress={() => this.props.openTrade(trade.id)}>
                <View style={[styles.rowContainer, alt ? styles.alternate_background : undefined]}>
                    <Text style={styles.smallInfo}>#{trade.id}</Text>
                    <Text style={styles.userName}>{partner.user_name}</Text>
                    <Text style={styles.info}>{tradeType(trade, this.props.user.id) === tradeTypeBuy ? 'Покупка' : 'Продажа'}</Text>
                    <Text style={styles.info}>{trade.status}</Text>
                    <Text style={styles.amount}>{Price.build(trade.fee).viewCrypto}</Text>
                    <Text style={styles.amount}>{Price.build(trade.price).viewFiat}</Text>
                </View>
            </Touchable>);
    };

  render() {
    return withCommonStatusBar(
        <View style={styles.container}>
            <HeaderBar title={'TRADES'}/>

            {this.state.pending ?

                <CenterProgressBar/> :

                <FlatList data={this.state.trades}
                          renderItem={this.renderItem}/>}
        </View>
    )
  }
}