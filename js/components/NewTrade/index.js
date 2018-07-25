import React, { Component } from "react";
import PropTypes from "prop-types";

import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  TextInput
} from "react-native";
import {
  createBasicNavigationOptions,
  withCommonStatusBar
} from "../../style/navigation";
import FormTextInput from "../FormTextInput";
import Price from "../../values/Price";
import { currencyCodeToSymbol, objMap } from "../../helpers";
import PrimaryButton from "../../style/ActionButton";
import Separator from "../../style/Separator";
import Api from "../../services/Api";
import OnlineStatus from "../../style/OnlineStatus";
import User from "../../models/User";
import PartnerLink from "../Trade/PartnerLink";

const styles = StyleSheet.create({
  centerContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8
  },
  pickerRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8
  },
  formRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  formStyle: {
    flex: 1
  },
  huge: {
    color: "#222222",
    fontSize: 26,
    marginBottom: 8
  },
  header: {
    color: "#2c09a3",
    fontWeight: "bold",
    fontSize: 26,
    marginBottom: 8
  },
  info: {
    backgroundColor: "white",
    margin: 8,
    padding: 8,
    borderRadius: 4
  },
  infoText: {
    margin: 2,
    fontSize: 16
  },
  bold: {
    margin: 2,
    fontSize: 16,
    fontWeight: "bold"
  },
  centeredText: {
    textAlign: "center",
    flex: 1,
    margin: 8
  },
  error: {
    color: "#dd0057",
    marginBottom: 4
  },
  warning: {
    color: "#8b572a",
    backgroundColor: "#fbf5eb",
    borderColor: "#f5a623",
    borderRadius: 4,
    borderWidth: 1,
    padding: 8,
    margin: 8
  },
  amountInputsContainer: {
    borderColor: "#d5d5d5",
    borderBottomWidth: 1,
    flex: 1,
    flexDirection: "row",
    //paddingBottom: 10,
    alignItems: "center"
  },
  currencyCode: {
    position: "absolute",
    right: 0,
    color: "#4a4a4a",
    fontWeight: "700",
    fontSize: 19,
    paddingBottom: 10
  },
  amountText: {
    paddingRight: 50,
    fontSize: 16,
    paddingBottom: 10,
    color: "#9b9b9b"
  }
});

export default class NewTrade extends Component {
  static navigationOptions = createBasicNavigationOptions("REQUEST");

  state = {
    ad: this.props.navigation.getParam("ad", { id: "NO-ID" }),
    form: {
      amount: undefined,
      cost: undefined,
      message: undefined
    },
    pending: false,
    errors: undefined,
    showInfoAboutPartner: false,
    amount: "",
    msg: ""
  };

  componentDidMount() {
    this.setState({ pending: true });
    Api.get("/pro/" + this.state.ad.id)
      .then(response => this.setState({ ad: response.data.ad, pending: false }))
      .catch(error => alert("Ad not found"));
  }

  onCostChange = value => {
    value = value || 0.0;
    const amount = value / this.state.ad.price;
    this.setState({
      form: { ...this.state.form, cost: value, amount: amount.toFixed(8) }
    });
  };

  onAmountChange = value => {
    value = value || 0.0;
    const cost = value * this.state.ad.price;
    this.setState({
      form: { ...this.state.form, amount: value, cost: cost.toFixed(2) }
    });
  };

  onMessageChange = value =>
    this.setState({ form: { ...this.state.form, message: value } });

  onSubmit = values => {
    this.setState({ pending: true, errors: undefined });
    Api.post(`/pro/${this.state.ad.id}/trades`, {
      trade: values,
      ad: { price: this.state.ad.price }
    })
      .then(response => {
        this.setState({ pending: false });
        this.props.openTrade(response.data.trade);
      })
      .catch(error => {
        const newState = { pending: false };

        if (error.response.status === 422) {
          newState.errors = error.response.data.errors;
        } else if (error.response.status === 429) {
          newState.errors = { opened_trade_ids: error.response.data.trade_ids };
        } else if (error.response.status === 410) {
          newState.errors = {
            schedule: [
              "Трейдер в данный момент не работает, смотрите расписание"
            ]
          };
        } else if (error.response.status === 405) {
          newState.errors = { yourself: ["Торговля с собой"] };
        }

        this.setState(newState);
      });
  };

  static renderCurrencyInput(
    limitMin,
    limitMax,
    curCode,
    isCrypt,
    value,
    onChange
  ) {
    const min = Price.build(limitMin);
    const max = Price.build(limitMax);

    return (
      <View style={styles.formStyle}>
        <View style={styles.formRow}>
          <FormTextInput
            keyboardType="numeric"
            style={styles.formStyle}
            placeholder={"0"}
            value={value}
            onChangeText={onChange}
          />
          <Text style={styles.header}>{curCode}</Text>
        </View>
        <Text>
          Лимит:{"\n"}
          {isCrypt ? min.viewCrypto : min.viewMain} –{" "}
          {isCrypt ? max.viewCrypto : max.viewMain}{" "}
          {currencyCodeToSymbol(curCode)}
        </Text>
      </View>
    );
  }

  renderFiatCurrencyInput() {
    const { ad, form } = this.state;
    return NewTrade.renderCurrencyInput(
      ad.limit_min,
      ad.limit_max,
      ad.currency_code,
      false,
      form.cost,
      this.onCostChange
    );
  }

  renderCryptoCurrencyInput() {
    const { ad, form } = this.state;
    return NewTrade.renderCurrencyInput(
      ad.limit_min / ad.price,
      ad.limit_max / ad.price,
      ad.crypto_currency_code,
      true,
      form.amount,
      this.onAmountChange
    );
  }

  showInfoAboutPartner = () =>
    this.setState({ showInfoAboutPartner: !this.state.showInfoAboutPartner });

  render() {
    const { ad, pending, form } = this.state;
    const { user } = ad;
    console.warn(JSON.stringify(ad, null, 2));
    return (
      <ScrollView
        style={{ padding: 17, backgroundColor: "#fff" }}
        keyboardShouldPersistTaps="always"
      >
        <View>
          <View
            style={{
              width: "100%",
              paddingBottom: 6,
              borderBottomWidth: 2,
              borderColor: "#d5d5d5"
            }}
          >
            <Text style={{ fontSize: 18, color: "grey", fontWeight: "bold" }}>
              TRANSFER VIA {ad.payment_method_code}
            </Text>
          </View>
          <TouchableOpacity
            onPress={this.showInfoAboutPartner}
            style={{
              width: "100%",
              marginTop: 15,
              flexDirection: "row",
              alignItems: "center",
              borderBottomWidth: this.state.showInfoAboutPartner ? 0 : 2,
              paddingBottom: 10,
              borderColor: "#d5d5d5",
              alignItems: "center"
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <OnlineStatus isOnline={ad.user.online} />
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {ad.user.user_name}
              </Text>
              <View
                style={{
                  marginLeft: 10,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text>
                  {User.approximateTradesCount(ad.user.completed_trades_count)}
                </Text>
              </View>
            </View>
            <View>
              <Image
                style={{ width: 12, height: 6, justifyContent: "flex-end" }}
                source={require("../../../assets/icons/Line.png")}
              />
            </View>
          </TouchableOpacity>
          {this.state.showInfoAboutPartner ? (
            <View
              style={{
                backgroundColor: "#F8F9FB",
                paddingBottom: 15,
                paddingTop: 15,
                borderBottomWidth: 2,
                borderColor: "#d5d5d5"
              }}
            >
              <Text
                style={{
                  color: "#4A4A4A",
                  fontSize: 12,
                  letterSpacing: 1.5
                }}
              >
                Country
              </Text>
              <Text style={{ fontSize: 18, marginTop: 10, color: "#4a4a4a" }}>
                {ad.country_code}
              </Text>
              <Text
                style={{
                  color: "#4A4A4A",
                  fontSize: 12,
                  marginTop: 10,
                  marginBottom: 5,
                  letterSpacing: 1
                }}
              >
                Term of transaction
              </Text>
              <Text style={{ fontSize: 18, color: "#4a4a4a" }}>
                This advertisement is for cash transactions only. Make a request
                only when you can make a cash payment within 12 hours.
              </Text>
            </View>
          ) : null}
          <Text
            style={{
              color: "#4A4A4A",
              fontSize: 12,
              marginTop: 16,
              letterSpacing: 1
            }}
          >
            COST
          </Text>
          <View style={styles.info}>
            <Text style={styles.centeredText}>
              <Text style={styles.header}>
                1 {ad.crypto_currency_code} / {Price.build(ad.price).viewMain}{" "}
                {currencyCodeToSymbol(ad.currency_code)}
              </Text>
            </Text>
          </View>
          <Text
            style={{
              color: "#4A4A4A",
              fontSize: 12,
              marginBottom: 10,
              letterSpacing: 1
            }}
          >
            AMOUNT
          </Text>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.amountInputsContainer}>
              <TextInput
                style={styles.amountText}
                onChangeText={amount => this.setState({ amount })}
                value={this.state.amount}
                placeholder="0"
                //defaultValue={"0"}
              />
              <Text style={styles.currencyCode}>{ad.currency_code}</Text>
            </View>
            <Image
              source={require("../../img/ic_swap.png")}
              style={{ height: 18, width: 18, marginLeft: 15, marginRight: 15 }}
            />
            <View style={styles.amountInputsContainer}>
              <Text style={styles.amountText}>
                {Price.build(this.state.amount / ad.price).viewCrypto || 0}
              </Text>
              <Text style={styles.currencyCode}>{ad.crypto_currency_code}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ marginTop: 10, flex: 1, color: "#4a4a4a" }}>
              Limit: {Math.round(ad.limit_min * 10) / 10} -{" "}
              {Math.round(ad.limit_max * 10) / 10}{" "}
              {currencyCodeToSymbol(ad.currency_code)}
            </Text>
            <Text
              style={{
                marginTop: 10,
                flex: 1,
                textAlign: "right",
                color: "#4a4a4a"
              }}
            >
              Limit: {Math.round(ad.limit_min / ad.price) / 1000000} -{" "}
              {Math.round(ad.limit_max / ad.price) / 1000000}{" "}
              {currencyCodeToSymbol(ad.crypto_currency_code)}
            </Text>
          </View>
          <Text
            style={{
              color: "#4A4A4A",
              fontSize: 12,
              marginTop: 30,
              marginBottom: 10,
              letterSpacing: 1
            }}
          >
            MESSAGE
          </Text>
          <View style={styles.amountInputsContainer}>
            <TextInput
              style={styles.amountText}
              onChangeText={msg => this.setState({ msg })}
              placeholder="You may leave a message"
              value={this.state.msg}
            />
          </View>

          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              flex: 1
            }}
          >
            <Text style={{ color: "#4a4a4a" }}>
              Time limit for payment of seller's invoice:
            </Text>
            <Text style={{ fontWeight: "700" }}>
              {" " + ad.escrow_time} min
            </Text>
          </View>

          <PrimaryButton
            onPress={() => this.onSubmit(form)}
            title={"SEND A REQUSET TO TRADER"}
            disabled={pending}
            style={{
              marginTop: 30,
              flex: 1,
              backgroundColor: "#5b6eff",
              boxShadow: "0 3 5 -3 rgba(31, 89, 230, 0.8)"
            }}
          >
            {pending ? <ActivityIndicator size="large" /> : undefined}
          </PrimaryButton>

          {objMap(this.state.errors, (key, value) => (
            <Text style={styles.warning} key={key}>
              {key}: {value.join(". ")}
            </Text>
          ))}
        </View>
      </ScrollView>
    );
  }
}

NewTrade.propTypes = {
  isFetching: PropTypes.bool,
  openTrade: PropTypes.func
};
