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

const { height } = Dimensions.get('window');
const isAndroid = Platform.OS === 'android';

const MARGIN_FROM_TOP_TO_MAIN_CONTAINER = 56;
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
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: '#243682',
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
    return withCommonStatusBar(
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.container}>
          <HeaderBar
            rightIcon={<Image source={require('../../img/close.png')} />}
            title="TRADES"
            onPress={() => this.props.navigation.goBack()}
          />
          <View style={styles.rowContainer}>
            <TopButton
              title={intl.formatMessage({ id: 'app.wallet.title.transfer', defaultMessage: 'Transfer' })}
              onPress={this.onTransferSelected}
              selected={this.state.selectedAction === 'transfer'}
            />

            <TopButton
              title={intl.formatMessage({ id: 'app.wallet.title.receive', defaultMessage: 'Receive' })}
              onPress={this.onReceiveSelected}
              selected={this.state.selectedAction === 'receive'}
            />
          </View>
        </View>
        <View style={styles.body}>
          <AbsoluteContainer>
            {/*isFetch && trades.length === 0
              ? (<ActivityIndicator style={styles.activityIndicator} size="large" />)
              : (
                <FlatList
                  style={styles.flatListContainer}
                  onScroll={scroll}
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
              )*/}
          </AbsoluteContainer>
        </View>
      </SafeAreaView>,
    );
  }
}

export default injectIntl(Transactions);
