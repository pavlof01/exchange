import React, { Component } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  StyleSheet,
  RefreshControl,
  Image,
  Dimensions,
  Animated,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { injectIntl, intlShape } from 'react-intl';
import HeaderBar from '../../style/HeaderBar';
import TopButton from '../../style/TopButton';
import AbsoluteContainer from '../AbsoluteContainer';
import { fonts } from '../../style/resourceHelpers';
import { withCommonStatusBar } from '../../style/navigation';
import Touchable from '../../style/Touchable';

const { height } = Dimensions.get('window');
const isAndroid = Platform.OS === 'android';

const MARGIN_FROM_TOP_TO_MAIN_CONTAINER = 116;
// отступ от верха, регулирование величины наложения
// контейнера на абсолютный хедер
const ACTIVITY_INDICATOR_HEIGHT = 60;

const HEIGHT_HEADER_FOR_INTERPOLATE = isAndroid ? 56 : 36;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    backgroundColor: '#243682',
    position: 'absolute',
    width: '100%',
    height: 176,
  },
  topButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: '#243682',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderBottomColor: 'rgba(238, 238, 238,0.8)',
    borderBottomWidth: 1,
  },
  rowContaineCryptIcon: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  cryptIcon: {
    width: 30,
    height: 30,
  },
  rowContaineArrowIcon: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  arrowIcon: {
    transform: [
      { rotateZ: '-90deg' },
    ],
  },
  rowContainerBody: {
    flex: 5,
  },
  rowContainerAmount: {
    flexDirection: 'row',
  },
  amountText: {
    fontSize: 17,
    color: '#000000',
    fontWeight: '400',
  },
  dateText: {
    fontSize: 12,
    color: '#a7a7a7',
    fontWeight: '300',
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

  flatListContainer: {
    height: height - 132,
  },
  activityIndicator: {
    marginTop: height / 2 - ACTIVITY_INDICATOR_HEIGHT,
  },
  body: {
    marginTop: MARGIN_FROM_TOP_TO_MAIN_CONTAINER,
  },
});

class Transactions extends Component {
  constructor() {
    super();
    this.state = {
      headerHeight: new Animated.Value(0),
    };
  }

  componentDidMount() {
    this.props.getTransactionList(1);
  }

  renderItem = ({ item }) => (
    <Touchable onPress={() => console.warn('dsfsd')/* this.props.openTrade(trade.id) */}>
      <View
        style={[styles.rowContainer]}
      >
        <View style={styles.rowContaineCryptIcon}>
          <Image
            style={styles.cryptIcon}
            source={item.data.currency === 'BTC'
              ? require('../../img/ic_btc.png') : require('../../img/ic_eth.png')}
          />
        </View>
        <View style={styles.rowContainerBody}>
          <View style={styles.rowContainerAmount}>
            <Text style={styles.amountText}>
              {item.data.currency}
            </Text>
            <Text style={styles.amountText}>
              {item.amount}
            </Text>
          </View>
          <View>
            <Text style={styles.dateText}>
              {item.date}
            </Text>
          </View>
        </View>
        <View style={styles.rowContaineArrowIcon}>
          <Image style={styles.arrowIcon} source={require('../../img/ic_picker.png')} />
        </View>
      </View>
    </Touchable>
  )
    ;

  onRefresh = () => {
    const {
      getTransactionList,
    } = this.props;
    getTransactionList(1);
  };

  loadNext = () => {
    const {
      fetchTrades,
      lastLoadedPage,
      isFetch,
      isReachEnd,
      getTransactionList,
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

  getFlatListData = () => {
    const { transactions } = this.props;
    try {
      const { data } = transactions.toJS();
      return data;
    } catch (e) {
      return [];
    }
  }

  render() {
    const { intl } = this.props;
    const scroll = Animated.event([
      {
        nativeEvent: {
          contentOffset: {
            y: this.state.headerHeight,
          },
        },
      },
    ]);
    const translateToolbarY = this.state.headerHeight.interpolate({
      inputRange: [0, 20, 50],
      outputRange: [0, 0, -HEIGHT_HEADER_FOR_INTERPOLATE],
      extrapolate: 'clamp',
    });
    const stayHeader = this.state.headerHeight.interpolate({
      inputRange: [0, 20, 50],
      outputRange: [0, 0, HEIGHT_HEADER_FOR_INTERPOLATE],
      extrapolate: 'clamp',
    });
    const flatListData = this.getFlatListData();
    return withCommonStatusBar(
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.container}>
          <HeaderBar
            rightIcon={<Image source={require('../../img/close.png')} />}
            title={intl.formatMessage({ id: 'app.wallet.transactions.title', defaultMessage: 'Transactions' }).toUpperCase()}
            onPress={() => this.props.navigation.goBack()}
          />
          <View style={styles.topButtonsContainer}>
            <TopButton
              title={intl.formatMessage({ id: 'app.wallet.transactions.title.incoming', defaultMessage: 'Incoming' })}
              onPress={() => console.warn('sdf')}
              selected
            />

            <TopButton
              title={intl.formatMessage({ id: 'app.wallet.transactions.title.outbox', defaultMessage: 'Outbox' })}
              onPress={() => console.warn('sdf')}
              selected={false}
            />
          </View>
        </View>
        <View style={styles.body}>
          <AbsoluteContainer>
            {this.props.session.transactions.pending && flatListData.length === 0
              ? (<ActivityIndicator style={styles.activityIndicator} size="large" />)
              : (
                <FlatList
                  style={styles.flatListContainer}
                  onScroll={scroll}
                  data={flatListData}
                  refreshControl={(
                    <RefreshControl
                      refreshing={this.props.session.transactions.pending}
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
                    this.props.session.transactions.pending && <ActivityIndicator size="large" />
                  }
                  // onEndReached={this.loadNext}
                  onEndReachedThreshold={0.3}
                />
              )}
          </AbsoluteContainer>
        </View>
      </SafeAreaView>,
    );
  }
}

export default injectIntl(Transactions);
