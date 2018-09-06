import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  StyleSheet,
  RefreshControl,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { injectIntl, intlShape } from 'react-intl';
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
import { fonts } from '../../style/resourceHelpers';
import AbsoluteContainer from '../AbsoluteContainer';

const { height } = Dimensions.get('window');

const MARGIN_FROM_TOP_TO_MAIN_CONTAINER = 50;
// отступ от верха, регулирование величины наложения
// контейнера на абсолютный хедер
const ACTIVITY_INDICATOR_HEIGHT = 60;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    backgroundColor: '#243682',
    position: 'absolute',
    width: '100%',
    height: 112,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
    paddingTop: 10,
    backgroundColor: '#ffffff',
    marginBottom: 10,
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
  tradeNumber: {
    flex: 3,
    color: '#b0b0b0',
  },
  tradeType: {
    textAlign: 'center',
    flex: 3,
    fontFamily: fonts.semibold.regular,
  },
  currencyType: {
    flex: 3,
    alignItems: 'center',
  },
  imageCurrencyType: {
    width: 22,
    height: 22,
  },
  statusContainer: {
    flex: 1,
  },
  statusActive: {
    width: 8,
    height: 40,
    backgroundColor: '#DADADA',
    left: -4,
  },
  statusNoneActive: {
    width: 8,
    height: 40,
    backgroundColor: '#2a3b89',
    left: -4,
  },
  username: {
    flex: 5,
    fontFamily: fonts.semibold.regular,
  },
  flatListContainer: {
    height: height - 112,
  },
  activityIndicator: {
    marginTop: height / 2 - ACTIVITY_INDICATOR_HEIGHT,
  },
  body: {
    marginTop: MARGIN_FROM_TOP_TO_MAIN_CONTAINER,
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

  renderItem = ({ item }) => {
    const trade = item;
    const partner = tradePartner(trade, this.props.user.id);
    // const alt = index % 2 === 0;
    return (
      <Touchable onPress={() => this.props.openTrade(trade.id)}>
        <View
          style={[styles.rowContainer]}
        >
          <View style={styles.statusContainer}>
            {!this.isActiveTrade(trade.status)
              ? (<View style={styles.statusActive} />) : (<View style={styles.statusNoneActive} />)}
          </View>
          <Text style={styles.tradeNumber}>
            #
            {trade.id}
          </Text>
          <Text style={styles.username}>
            {partner.user_name}
          </Text>
          <Text style={styles.tradeType}>
            {tradeType(trade, this.props.user.id) === tradeTypeBuy
              ? this.props.intl.formatMessage({ id: 'app.trades.type.buy', defaultMessage: 'Buy' }).toUpperCase()
              : this.props.intl.formatMessage({ id: 'app.trades.type.sell', defaultMessage: 'Sell' }).toUpperCase()}
          </Text>
          <View style={styles.currencyType}>
            {trade.ad.crypto_currency_code === 'BTC' ? (
              <Image
                style={styles.imageCurrencyType}
                source={require('../../img/ic_btc.png')}
              />
            ) : (
                <Image
                  style={styles.imageCurrencyType}
                  source={require('../../img/ic_eth.png')}
                />
              )}
          </View>
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
          <HeaderBar title="TRADES" />
        </View>
        <View style={styles.body}>
          <AbsoluteContainer>
            {isFetch && trades.length === 0
              ? (<ActivityIndicator style={styles.activityIndicator} size="large" />)
              : (
                <FlatList
                  style={styles.flatListContainer}
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
          </AbsoluteContainer>
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
