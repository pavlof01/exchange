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
import ConfirmDialog from "./ConfirmDialog";

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

const DEFAULT_FORM_VALUES = {
    code: '',
    amount: '',
    address: '',
    password: '',
    currency: 'BTC',
    description: '',
};

export default class Wallet extends Component {

    state = {
        selectedAction: 'transfer',
        isConfirming: false,
        form: DEFAULT_FORM_VALUES,
    };

    onTransferSelected = () => this.setState({selectedAction: 'transfer'});
    onReceiveSelected = () => this.setState({selectedAction: 'receive'});

    onWalletOperationStart = ( form ) => {
        this.setState({ isConfirming: true, form });
    };

    closeConfirmDialog = () => {
        this.setState({ isConfirming: false });
    };

    renderConfirmDialog = () => {
        const {
            amount,
            currency,
            address,
            password,
        } = this.state.form;
        return (
            <ConfirmDialog
                priceLabel={'YOU SEND'}
                priceText={`${amount} ${currency}`}
                addressText={address}
                passwordValue={password}
                onChangePassword={this.onChangePassword}
                errorText={''}
                onCancelPress={this.closeConfirmDialog}
                onConfirmPress={this.onConfirmPress}
            />
        );
    };

    onConfirmPress = () => {
        const params = { ...this.state.form };
        this.props.sendCryptoCurrency(params);
    };

    onChangePassword = (value) => {
        const form = {
            ...this.state.form,
            password: value,
        };

        this.setState({ form });
    };

  render() {
      const {
          user: { balance, crypto_amount_buy, crypto_amount_sell, currencyCode },
          exchangeRates,
          withdrawal,
          sendCryptoCurrency,
          transactionTokens,
          getTransactionTokens,
          generateTransactionToken,
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
              onWalletOperationStart={this.onWalletOperationStart}
              sendCryptoCurrency={sendCryptoCurrency}
          />;
          header = 'TRANSFER'
      } else {
          content = <Receive
              currency={"BTC"}
              cryptoCurrencies={this.props.cryptoCurrencies}
              transactionTokens={transactionTokens}
              getTransactionTokens={getTransactionTokens}
              generateTransactionToken={generateTransactionToken}
          />;
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

            { this.state.isConfirming ? this.renderConfirmDialog() : null }

        </View>
    )
  }
}