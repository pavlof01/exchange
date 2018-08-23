import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { injectIntl, intlShape } from 'react-intl';
import CenterProgressBar from '../../style/CenterProgressBar';
import {
  tradePartner,
  tradeType,
  tradeTypeBuy,
  TRADE_STATUS_NEW,
  TRADE_STATUS_PAID_CONFIRMED,
} from '../../helpers';
import Touchable from '../../style/Touchable';
import HeaderBar from '../../style/HeaderBar';
import { withCommonStatusBar } from '../../style/navigation';

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#2B2B82',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  centerMessage: {
    flex: 1,
    height: 64,
    fontSize: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
    paddingTop: 20,
  },
  alternate_background: {
    backgroundColor: '#EEEEEE',
  },
  info: {
    textAlign: 'center',
    flex: 3,
  },
  empty: {
    flex: 1,
  },
});

const PAGE_SIZE = 15;

class Trades extends Component {
  state = {
    trades: [],
  };

  componentDidMount() {
    this.onRefresh();
  }

  onRefresh = () => {
    const {
      refreshTrades,
    } = this.props;
    const params = {
      scope: 'info_panel',
      limit: PAGE_SIZE,
      page: 1,
    };
    refreshTrades(params);
  };

  loadNext = () => {
    const {
      fetchTrades,
      lastLoadedPage,
      isFetch,
      isReachEnd,
    } = this.props;
    const nextPage = lastLoadedPage + 1;
    const params = {
      scope: 'info_panel',
      limit: PAGE_SIZE,
      page: nextPage,
    };

    if (!isFetch && !isReachEnd) {
      fetchTrades(params);
    }
  };

  isActiveTrade = status => status === TRADE_STATUS_NEW || status === TRADE_STATUS_PAID_CONFIRMED;

  renderItem = ({ item, index }) => {
    const trade = item;
    const partner = tradePartner(trade, this.props.user.id);
    const alt = index % 2 === 0;
    return (
      <Touchable onPress={() => this.props.openTrade(trade.id)}>
        <View
          style={[
            styles.rowContainer,
            alt ? styles.alternate_background : undefined,
          ]}
        >
          <View style={{ flex: 1, alignItems: 'center' }}>
            {!this.isActiveTrade(trade.status) ? (
              <View
                style={{ width: 10, height: 10, backgroundColor: '#DADADA' }}
              />
            ) : (<View style={{ width: 10, height: 10, backgroundColor: '#14D459' }} />)}
          </View>
          <Text style={styles.info}>
            {trade.id}
          </Text>
          <Text style={{ flex: 5 }}>
            {partner.user_name}
          </Text>
          <Text style={styles.info}>
            {tradeType(trade, this.props.user.id) === tradeTypeBuy
              ? this.props.intl.formatMessage({ id: 'app.trades.type.buy', defaultMessage: 'Buy' })
              : this.props.intl.formatMessage({ id: 'app.trades.type.sell', defaultMessage: 'Sell' })}
          </Text>
          <Text style={styles.info}>
            {trade.ad.crypto_currency_code}
          </Text>
        </View>
      </Touchable>
    );
  };

  sortByTypeSell = () => {
    // eslint-disable-next-line react/no-access-state-in-setstate
    const sortedTrades = this.state.trades.sort(trade => (trade.ad.type === 'Ad::Sell' ? 1 : -1));
    this.setState({ trades: sortedTrades });
  };

  sortByCurrency = () => {
    // eslint-disable-next-line react/no-access-state-in-setstate
    const sortedTrades = this.state.trades.sort(trade => (trade.ad.crypto_currency_code === 'ETH' ? -1 : 1));
    this.setState({ trades: sortedTrades });
  };

  sortMessages = (sortType) => {
    switch (sortType) {
      case 'byType':
        this.sortByTypeSell();
        break;
      case 'byCurrency':
        this.sortByCurrency();
        break;
      default:
        console.log('default');
    }
  };

  render() {
    const {
      isFetch,
      trades,
      intl,
    } = this.props;
    return withCommonStatusBar(
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.container}>
          <HeaderBar title={intl.formatMessage({ id: 'app.trades.header', defaultMessage: 'Trades' }).toUpperCase()} />
          <View style={styles.rowContainer}>
            <Text style={styles.empty} />
            <Text style={styles.info}>
              {'#'}
            </Text>
            <Text style={{ flex: 5 }}>
              {intl.formatMessage({ id: 'app.trades.user', defaultMessage: 'User' }).toUpperCase()}
            </Text>
            <Touchable
              style={styles.info}
              onPress={() => this.sortMessages('byType')}
            >
              <Text style={styles.info}>
                {intl.formatMessage({ id: 'app.trades.type', defaultMessage: 'Type' }).toUpperCase()}
              </Text>
            </Touchable>
            <Touchable
              style={styles.info}
              onPress={() => this.sortMessages('byCurrency')}
            >
              <Text style={styles.info}>
                {intl.formatMessage({ id: 'app.trades.curr', defaultMessage: 'Curr' }).toUpperCase()}
              </Text>
            </Touchable>
          </View>
          {isFetch && trades.length === 0 ? (<CenterProgressBar />) :
            (
              <FlatList
                data={trades}
                refreshControl={(
                  <RefreshControl
                    refreshing={isFetch}
                    onRefresh={this.onRefresh}
                  />
                )}
                renderItem={this.renderItem}
                keyExtractor={i => i.id}
                ListEmptyComponent={(
                  <Text style={styles.centerMessage}>
                    {intl.formatMessage({ id: 'app.trades.noTrades', defaultMessage: 'no trades' }).toUpperCase()}
                  </Text>
                )}
                ListFooterComponent={
                  isFetch && <ActivityIndicator size="large" />
                }
                onEndReached={this.loadNext}
                onEndReachedThreshold={0.3}
              />
            )}
        </View>
      </SafeAreaView>,
    );
  }
}

Trades.propTypes = {
  intl: intlShape.isRequired,
  refreshTrades: PropTypes.func.isRequired,
  fetchTrades: PropTypes.func.isRequired,
  trades: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  lastLoadedPage: PropTypes.number,
  isFetch: PropTypes.bool,
  isReachEnd: PropTypes.bool,
  openTrade: PropTypes.func,
  user: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default injectIntl(Trades);
