/* eslint-disable camelcase */
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
  Animated,
} from 'react-native';
import moment from 'moment';
import { SafeAreaView } from 'react-navigation';
import { injectIntl, intlShape } from 'react-intl';
import TopButton from '../../style/TopButton';
import { withCommonStatusBar } from '../../style/navigation';
import Touchable from '../../style/Touchable';
import TransactionItem from './transactionItem';

const { height } = Dimensions.get('window');

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const ACTIVITY_INDICATOR_HEIGHT = 60;

const HEADER_BACKGROUNG_MIN_HEIGHT = 0;
const HEADER_BACKGROUNG_MAX_HEIGHT = 100;

const SHADOW_OFFSET_MIN_MARGIN = 0;
const SHADOW_OFFSET_MAX_MARGIN = -45;

const FLAT_LIST_MIN_PADDING = 0;
const FLAT_LIST_MAX_PADDING = 55;

const ANIMATION_SCROLL_START = 0;
const ANIMATION_SCROLL_END = 100;

const styles = StyleSheet.create({
  containerWrapper: {
    flex: 1,
  },
  safeContainerHeader: {
    backgroundColor: '#2B2B82',
  },
  safeContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    height: 62,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerTitleStyle: {
    fontFamily: 'System',
    fontSize: 18,
    letterSpacing: 0.5,
    textAlign: 'center',
    flex: 1,
    color: '#fff',
    marginStart: 39,
  },
  closeButton: {
    width: 39,
    height: 39,
    paddingTop: 9,
    paddingBottom: 9,
    paddingEnd: 18,
  },
  tabAnimatedBackground: {
    backgroundColor: '#2B2B82',
    height: HEADER_BACKGROUNG_MAX_HEIGHT,
  },
  contentShadowAnimated: {
    position: 'relative',
    top: 0,
    bottom: 0,
    flexGrow: 1,
    marginTop: SHADOW_OFFSET_MAX_MARGIN,
    overflow: 'hidden',
  },
  contentShadow: {
    elevation: 3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3,
    shadowOpacity: 0.1,
    marginStart: 13,
    marginEnd: 13,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  flatListPositionWrapper: {
    marginTop: -FLAT_LIST_MAX_PADDING,
    marginStart: 0,
    marginEnd: 0,
    flexGrow: 1,
  },
  contentContainerStyle: {
    paddingTop: 0,
  },
  tabsContainer: {
    flexDirection: 'row',
    height: FLAT_LIST_MAX_PADDING,
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
});

class Transactions extends Component {
  constructor() {
    super();
    this.state = {
      headerHeight: new Animated.Value(0),
    };
    this.page = 1;

    this.scroll = Animated.event([
      {
        nativeEvent: {
          contentOffset: {
            y: this.state.headerHeight,
          },
        },
      },
    ]);
  }

  componentDidMount() {
    this.onRefresh();
  }

  renderItem = ({ item }) => <TransactionItem item={item} />;

  onRefresh = () => {
    const {
      refreshTransactionList,
    } = this.props;
    refreshTransactionList();
  };

  loadNext = () => {
    const {
      getTransactionList,
      lastLoadedPage,
      isReachEnd,
    } = this.props;
    if (!isReachEnd) {
      this.page = lastLoadedPage + 1;
      getTransactionList({ page: this.page });
    }
  };

  getFlatListData = () => {
    const { items } = this.props;
    return items;
  };

  isPending = () => {
    const { isFetching } = this.props;
    return isFetching;
  };

  render() {
    const { intl } = this.props;
    const heightHeader = this.state.headerHeight.interpolate({
      inputRange: [ANIMATION_SCROLL_START, ANIMATION_SCROLL_END],
      outputRange: [HEADER_BACKGROUNG_MAX_HEIGHT, HEADER_BACKGROUNG_MIN_HEIGHT],
      extrapolate: 'clamp',
    });
    const shadowOffset = this.state.headerHeight.interpolate({
      inputRange: [ANIMATION_SCROLL_START, ANIMATION_SCROLL_END],
      outputRange: [SHADOW_OFFSET_MAX_MARGIN, SHADOW_OFFSET_MIN_MARGIN],
      extrapolate: 'clamp',
    });
    const flatListPadding = this.state.headerHeight.interpolate({
      inputRange: [ANIMATION_SCROLL_START, ANIMATION_SCROLL_END],
      outputRange: [FLAT_LIST_MAX_PADDING, FLAT_LIST_MIN_PADDING],
      extrapolate: 'clamp',
    });
    const buttonsOpacity = this.state.headerHeight.interpolate({
      inputRange: [15, 50],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    const flatListData = this.getFlatListData();
    return withCommonStatusBar(
      <View style={styles.containerWrapper}>
        <SafeAreaView style={styles.safeContainerHeader}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitleStyle}>
              {intl.formatMessage({ id: 'app.wallet.transactions.title', defaultMessage: 'Transactions' }).toUpperCase()}
            </Text>
            <Touchable
              onPress={() => this.props.navigation.goBack()}
            >
              <View style={styles.closeButton}>
                <Image source={require('../../img/close.png')} />
              </View>
            </Touchable>
          </View>
        </SafeAreaView>
        <SafeAreaView style={styles.safeContainer}>
          <Animated.View style={[styles.tabAnimatedBackground, { height: heightHeader }]}>
            <Animated.View style={[styles.tabsContainer, { opacity: buttonsOpacity }]}>
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
            </Animated.View>
          </Animated.View>
          <Animated.View style={[styles.contentShadowAnimated, { marginTop: shadowOffset }]}>
            <View style={styles.contentShadow}>
              <Animated.View
                style={[styles.flatListPositionWrapper, { marginTop: -1 * flatListPadding }]}
              >
                {this.isPending() && flatListData.length === 0
                  ? (<ActivityIndicator style={styles.activityIndicator} size="large" />)
                  : (
                    <AnimatedFlatList
                      style={styles.flatListContainer}
                      contentContainerStyle={styles.contentContainerStyle}
                      onScroll={this.scroll}
                      data={this.getFlatListData()}
                      refreshControl={(
                        <RefreshControl
                          refreshing={this.props.isRefreshing}
                          onRefresh={this.onRefresh}
                        />
                      )}
                      renderItem={this.renderItem}
                      keyExtractor={(i, index) => index}
                      ListEmptyComponent={this.isPending() === false && flatListData.length === 0
                        ? (
                          <Text style={styles.centerMessage}>
                            {intl.formatMessage({ id: 'app.trades.loading', defaultMessage: 'loading' })}
                          </Text>
                        ) : (
                          <Text style={styles.centerMessage}>
                            {intl.formatMessage({ id: 'app.trades.noTrades', defaultMessage: 'no trades' })}
                          </Text>
                        )}
                      ListFooterComponent={
                        this.isPending() && <ActivityIndicator size="large" />
                      }
                      onEndReached={this.loadNext}
                      onEndReachedThreshold={0.3}
                    />
                  )}
              </Animated.View>
            </View>
          </Animated.View>
        </SafeAreaView>
      </View>,
    );
  }
}

Transactions.propTypes = {
  intl: intlShape.isRequired,
  navigation: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  getTransactionList: PropTypes.func,
  refreshTransactionList: PropTypes.func,
  session: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  transactions: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  isRefreshing: PropTypes.bool,
  isFetching: PropTypes.bool,
  items: PropTypes.any,
  error: PropTypes.any, // eslint-disable-line react/no-unused-prop-types
  lastLoadedPage: PropTypes.number,
  isReachEnd: PropTypes.bool,
};

export default injectIntl(Transactions);
