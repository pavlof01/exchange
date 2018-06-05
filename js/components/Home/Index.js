import React, { Component } from 'react';

import { keysToSnakeCase } from '../../helpers'
import { Text } from 'react-native';

export default class Home extends Component {
  componentDidMount() {
    this.fetchHomeTimer = setInterval(this.fetchHome, 30 * 1000);
    this.props.fetchCurrencies();
    this.fetchHome();
    this.fetchRates(this.props.filter);
  }

  componentWillUnmount() {
    clearInterval(this.fetchHomeTimer);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.filter !== this.props.filter) {
      this.fetchRates(newProps.filter);
      this.fetchHome(newProps.filter);
    }
  }

  fetchRates = (filter) => {
    this.props.fetchRates({
      [filter.cryptoCurrencyCode]: ['USD', filter.currencyCode].join(','),
      USD: [filter.currencyCode].join(',')
    });
  };

  fetchHome = (filter = this.props.filter) => {
    this.props.fetchHome(keysToSnakeCase(filter));
  };

  render() {

    return <Text>Hello!</Text>
  }
}