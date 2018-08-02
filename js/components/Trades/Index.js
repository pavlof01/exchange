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
    flex: 2,
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
            ) : (
              <View
                style={{ width: 10, height: 10, backgroundColor: '#14D459' }}
              />
            )}
          </View>
          <Text style={styles.info}>
            {trade.id}
          </Text>
          <Text style={{ flex: 5 }}>
            {partner.user_name}
          </Text>
          <Text style={styles.info}>
            {tradeType(trade, this.props.user.id) === tradeTypeBuy
              ? 'Buy'
              : 'Sell'}
          </Text>
          <Text style={styles.info}>
            {trade.ad.crypto_currency_code}
          </Text>
        </View>
      </Touchable>
    );
  };

  sortByTypeSell = () => {
    const sortedTrades = this.state.trades.sort(trade => (trade.ad.type === 'Ad::Sell' ? 1 : -1));
    this.setState({ trades: sortedTrades });
  };

  sortByCurrency = () => {
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
    } = this.props;
    return withCommonStatusBar(
      <View style={styles.container}>
        <HeaderBar title="TRADES" />
        <View style={styles.rowContainer}>
          <Text style={styles.empty} />
          <Text style={styles.info}>
            {'#'}
          </Text>
          <Text style={{ flex: 5 }}>
            {'USER'}
          </Text>
          <Touchable
            style={styles.info}
            onPress={() => this.sortMessages('byType')}
          >
            <Text style={styles.info}>
              {'TYPE'}
            </Text>
          </Touchable>
          <Touchable
            style={styles.info}
            onPress={() => this.sortMessages('byCurrency')}
          >
            <Text style={styles.info}>
              {'CURR'}
            </Text>
          </Touchable>
        </View>
        {isFetch && trades.length === 0 ? (
          <CenterProgressBar />
        ) : (
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
                {'У вас ещё не было сделок'}
              </Text>
            )}
            ListFooterComponent={
              isFetch && <ActivityIndicator size="large" />
            }
            onEndReached={this.loadNext}
            onEndReachedThreshold={0.3}
          />
        )}
      </View>,
    );
  }
}

Trades.propTypes = {
  refreshTrades: PropTypes.func.isRequired,
  fetchTrades: PropTypes.func.isRequired,
  trades: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  lastLoadedPage: PropTypes.number,
  isFetch: PropTypes.bool,
  isReachEnd: PropTypes.bool,
};

export default Trades;
