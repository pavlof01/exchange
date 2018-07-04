import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    Text,
    View,
    StyleSheet, ScrollView,
} from 'react-native';
import HeaderBar from "../../style/HeaderBar";
import TopButton from "../../style/TopButton";
import Separator from "../../style/Separator";
import Transfer from "./Transfer";
import Receive from "./Receive";
import exchangeRates from "../../reducers/exchangeRates";
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
});

export default class Wallet extends Component {

    state = {
        selectedAction: 'transfer',
    };

    onTransferSelected = () => this.setState({selectedAction: 'transfer'});
    onReceiveSelected = () => this.setState({selectedAction: 'receive'});

  render() {
      const {
          user: { balance, crypto_amount_buy, crypto_amount_sell, currencyCode },
          exchangeRates,
          withdrawal,
          sendCryptoCurrency,
      } = this.props;

      let content, header;
      if (this.state.selectedAction === 'transfer') {
          content = <Transfer
              cryptoCurrencies={this.props.cryptoCurrencies}
              currencyCode={currencyCode}
              balance={balance}
              exchangeRates={exchangeRates}
              updateRates={this.props.updateRates}
              updateCurrencies={this.props.updateCurrencies}
              updateEstimatedFee={this.props.updateEstimatedFee}
              withdrawal={withdrawal}
              sendCryptoCurrency={sendCryptoCurrency}
          />;
          header = 'TRANSFER'
      } else {
          content = <Receive cryptoCurrencies={this.props.cryptoCurrencies}/>;
          header = 'RECEIVE';
      }

      return withCommonStatusBar(
        <View style={styles.container}>
            <HeaderBar title={header}/>
            {/*{this.actionName}*/}

            <View style={styles.rowContainer}>
                <TopButton title={'TRANSFER'} onPress={this.onTransferSelected} selected={this.state.selectedAction === 'transfer'} selectedColor={'blue'} color={'black'}/>

                <Separator vertical/>

                <TopButton title={'RECEIVE'} onPress={this.onReceiveSelected} selected={this.state.selectedAction === 'receive'} selectedColor={'blue'} color={'black'}/>
            </View>

            <Separator />

            <ScrollView keyboardShouldPersistTaps='always'>
                {content}
            </ScrollView>
        </View>
    )
  }
}