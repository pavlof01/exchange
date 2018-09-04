import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Dimensions,
  Animated,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { MenuOption } from 'react-native-popup-menu';
import TopButton from '../../style/TopButton';
import Separator from '../../style/Separator';
import { cryptoIcons, fonts } from '../../style/resourceHelpers';
import Touchable from '../../style/Touchable';
import { currencyCodeToSymbol } from '../../helpers';
import Price from '../../values/Price';
import PickerModal from '../../style/PickerModal';
import CardPicker from '../../style/CardPicker';

const SIDE_PADDING = 20;
const REFRESH_OFFSET_HEIGHT = 25;
const SAFE_REFRESH_VIEW_HEIGHT = 55;
const MAX_TOOLBAR_VIEW_HEIGHT = 100;
const MAX_TOOLBAR_HEIGHT = 112;
const { width, height } = Dimensions.get('window');
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#2B2B82',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flex: 1,
    flexDirection: 'column',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    marginStart: SIDE_PADDING,
    marginEnd: SIDE_PADDING,
  },
  selectorsBox: {
    flex: 1,
    marginStart: SIDE_PADDING,
    marginEnd: SIDE_PADDING,
  },
  convertRow: {
    flex: 1,
    flexDirection: 'row',
  },
  convertColumn: {
    flex: 4,
    flexDirection: 'column',
  },
  convertCenter: {
    flex: 1.7,
    paddingTop: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerLabel: {
    color: '#4a4a4a',
    marginTop: 16,
    fontSize: 10,
    fontFamily: fonts.medium.regular,
    letterSpacing: 1,
    marginBottom: 5,
  },
  pickerShadow: {
    elevation: 4,
    borderRadius: 4,
    backgroundColor: 'white',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3,
    shadowOpacity: 0.5,
    flexDirection: 'row',
  },
  picker: {
    flexDirection: 'row',
  },
  menuOptionPicker: {
    paddingBottom: 0,
    paddingLeft: 25,
    paddingRight: 25,
  },
  containerPicker: {
    margin: 0,
  },
  pickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  pickerIcon: {
    height: 17,
    width: 23,
  },
  cardText: {
    fontSize: 24,
    color: '#4a4a4a',
    margin: 8,
    fontWeight: 'bold',
  },
  currencyCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#9b9b9b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  currencySubcircle: {
    width: 16,
    height: 16,
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  currencySymbol: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: 'bold',
    color: '#9b9b9b',
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  title: {
    color: '#9b9b9b',
    fontSize: 16,
    fontFamily: fonts.bold.regular,
    letterSpacing: 0.5,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    height: 46,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
    marginStart: SIDE_PADDING,
    marginEnd: SIDE_PADDING,
  },
  alternateBackground: {
    backgroundColor: '#f9f9f9',
  },
  statusCol: {
    width: 18,
    height: 42,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 5,
  },
  nameContainer: {
    flex: 1,
    height: 46,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  valueContainer: {
    flex: 1,
    height: 46,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  bankNameContainer: {
    flex: 0.8,
    height: 46,
    overflow: 'hidden',
    paddingRight: 4,
    paddingLeft: 4,
  },
  itemLimits: {
    flex: 2,
    height: 46,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  itemText: {
    color: '#000000',
    fontSize: 14,
    fontFamily: fonts.bold.regular,
    textAlign: 'left',
  },
  itemTextLite: {
    color: '#868686',
    fontSize: 10,
    fontFamily: fonts.medium.regular,
  },
  itemName: {
    color: '#4a4a4a',
    fontSize: 14,
    fontFamily: fonts.bold.regular,
    letterSpacing: 0.4,
  },
  itemHeadLabel: {
    color: '#9b9b9b',
    fontSize: 12,
    fontFamily: fonts.bold.regular,
  },
  status: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'gray',
  },
  onlineStatus: {
    backgroundColor: '#14d459',
  },
  offlineStatus: {
    backgroundColor: 'red',
  },
  androidContainer: {
    backgroundColor: '#2B2B82',
    color: 'white',
    height: 112,
    fontWeight: 'bold',
    fontFamily: fonts.bold.regular,
    elevation: 8,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  },
  iosContainer: {
    backgroundColor: '#2B2B82',
    color: 'white',
    fontWeight: 'bold',
    fontFamily: fonts.bold.regular,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  titleText: {
    color: 'white',
    height: 56,
    fontSize: 16,
    lineHeight: 18,
    fontWeight: 'bold',
    fontFamily: fonts.bold.regular,
    paddingTop: 24,
    textAlign: 'center',
  },
  btcCostContainer: {
    width,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  btcCostText: {
    fontFamily: fonts.bold.regular,
    fontSize: 10,
    color: 'rgb(168,190,235)',
  },
  btcCost: {
    fontFamily: fonts.regular.regular,
    fontSize: 34,
    color: 'rgb(168,190,235)',
    textAlign: 'center',
  },
  btcChangePercent: {
    fontFamily: fonts.bold.regular,
    fontSize: 10,
    color: '#14d459',
  },
  text: {
    color: '#9b9b9b',
    marginTop: 20,
    marginBottom: 20,
    fontSize: 16,
    lineHeight: 16,
    fontFamily: fonts.bold.regular,
    marginLeft: 20,
  },
});

const FILTER_SELL = 'sell';
const FILTER_BUY = 'buy';

class Offers extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      translateHeaderY: new Animated.Value(0),
      animatedValue: new Animated.Value(0),
      animatedToolbarPosition: new Animated.Value(SAFE_REFRESH_VIEW_HEIGHT),
      exchangeRates: '',
    };

    this.downToolBarAnimation = null;
    this.upToolBarAnimation = null;
    this.refreshToolBarAnimation = null;
    this.animatedBack = null;

    this.scrollValue = 0;
    this.oldScrollPosition = 0;
  }

  async componentDidMount() {
    const {
      fetchCurrencies,
      fetchPaymentMethods,
      fetchCountries,
      updateFilter,
      fetchExchangeRates,
    } = this.props;
    fetchCurrencies();
    fetchPaymentMethods();
    fetchCountries();
    fetchExchangeRates();
    updateFilter({});
    const selectedCurrency = await AsyncStorage.getItem('selectedCurrency');
    const selectedCountry = await AsyncStorage.getItem('selectedCountryCode');
    this.onCurrencyCodeChange(selectedCurrency);
    this.onCountryCodeChange(selectedCountry);
    this.state.animatedValue.addListener(value => this.handleScroll(value));
    this.setState({ exchangeRates: this.props.exchangeRates.BTC_USD });
  }

  componentWillMount() {
    const { fetchExchangeRates } = this.props;
    fetchExchangeRates();
    this.setState({ exchangeRates: this.props.exchangeRates.BTC_USD });
  }

  scrollToTop = (animated) => {
    if (this.flatListRef) {
      this.downToolBar();
      this.flatListRef.getNode().scrollToOffset({ offset: SAFE_REFRESH_VIEW_HEIGHT, animated });
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.orders.pending !== this.props.orders.pending
      && !nextProps.orders.pending
      && this.scrollValue <= SAFE_REFRESH_VIEW_HEIGHT
    ) {
      this.scrollToTop(true);
    }
    if (nextProps.exchangeRates.BTC_USD !== this.props.exchangeRates.BTC_USD) {
      this.setState({ exchangeRates: nextProps.exchangeRates.BTC_USD });
    }
  }

  componentWillUnmount() {
    this.state.animatedValue.removeAllListeners();
  }

  handleScroll = (pullDownDistance) => {
    this.scrollValue = pullDownDistance.value;
    return true;
  };

  handleRelease = () => {
    if (this.scrollValue <= REFRESH_OFFSET_HEIGHT) {
      this.onRefresh();
    } else if (this.scrollValue <= SAFE_REFRESH_VIEW_HEIGHT
      && this.scrollValue > REFRESH_OFFSET_HEIGHT
    ) {
      this.scrollToTop(true);
    }
  };

  showOffersToSell = () => {
    const {
      updateFilter,
    } = this.props;
    updateFilter({ type: FILTER_SELL, sort: 'price' });
  };

  showOffersToBuy = () => {
    const {
      updateFilter,
    } = this.props;
    updateFilter({ type: FILTER_BUY, sort: '-price' });
  };

  openNewTrade = (ad) => {
    const {
      newTrade,
    } = this.props;
    newTrade(ad);
  };

  onFilterChangeFactory = name => (value) => {
    const {
      updateFilter,
    } = this.props;
    updateFilter({ [name]: value });
  };

  onPaymentMethodCodeChange = this.onFilterChangeFactory('paymentMethodCode');

  onCryptoCurrencyCodeChange = this.onFilterChangeFactory('cryptoCurrencyCode');

  onCurrencyCodeChange = this.onFilterChangeFactory('currencyCode');

  onCountryCodeChange = this.onFilterChangeFactory('countryCode');

  onRefresh = () => {
    const {
      filter,
      updateFilter,
      fetchExchangeRates,
    } = this.props;
    updateFilter(filter);
    fetchExchangeRates();
  };

  static itemWithIcon(label, icon) {
    return (
      <View style={styles.pickerRow}>
        {icon}
        <Text style={styles.cardText}>
          {label}
        </Text>
      </View>
    );
  }

  static cryptItem(code) {
    return Offers.itemWithIcon(code, <Image source={cryptoIcons[code]} style={styles.pickerIcon} resizeMode="contain" />);
  }

  static fiatItem(code) {
    return Offers.itemWithIcon(code,
      <View style={styles.currencyCircle}>
        <View style={styles.currencySubcircle}>
          <Text style={styles.currencySymbol}>
            {currencyCodeToSymbol(code)}
          </Text>
        </View>
      </View>);
  }

  isFetching = () => {
    const {
      filter,
      paymentMethods,
    } = this.props;
    return (filter.pending && (!paymentMethods || paymentMethods.length === 0));
  };

  renderHeader = () => {
    const {
      intl,
      filter,
      paymentMethods,
      cryptoCurrencies,
      currencies,
    } = this.props;
    const header = filter.type === FILTER_SELL
      ? intl.formatMessage({ id: 'app.offers.operation.buyTitle', defaultMessage: 'Buy offers' }).toUpperCase()
      : intl.formatMessage({ id: 'app.offers.operation.sellTitle', defaultMessage: 'Sell offers' }).toUpperCase();
    return (
      <Animated.View style={
        [
          styles.header,
          {
            transform: [{
              translateY: this.state.translateHeaderY,
            }],
          },
        ]}
      >
        <View>
          <Text style={[styles.text]}>
            {header}
          </Text>
        </View>
        <Separator padding={20} />
        <View style={styles.rowContainer}>
          <TopButton
            title={intl.formatMessage({ id: 'app.offers.operation.buy', defaultMessage: 'Buy' }).toUpperCase()}
            selected={filter.type === FILTER_SELL}
            onPress={this.showOffersToSell}
            selectedColor="#14d459"
          />
          <Separator
            vertical
            padding={8}
          />
          <TopButton
            title={intl.formatMessage({ id: 'app.offers.operation.sell', defaultMessage: 'Sell' }).toUpperCase()}
            selected={filter.type === FILTER_BUY}
            onPress={this.showOffersToBuy}
            selectedColor="#d61b38"
          />
        </View>
        <View style={styles.selectorsBox}>
          <Separator />
          <View style={styles.convertRow}>
            <View style={styles.convertColumn}>
              <Text style={styles.pickerLabel}>
                {
                  filter.type === FILTER_SELL
                    ? intl.formatMessage({ id: 'app.offers.pickerLabel.youSell', defaultMessage: 'You sell' }).toUpperCase()
                    : intl.formatMessage({ id: 'app.offers.pickerLabel.youBuy', defaultMessage: 'You buy' }).toUpperCase()
                }
              </Text>
              <CardPicker
                style={styles.picker}
                onValueChange={this.onCryptoCurrencyCodeChange}
                selectedValue={filter.cryptoCurrencyCode}
                mode="dropdown"
                renderButton={Offers.cryptItem}
                containerStyle={styles.containerPicker}
              >
                {
                  cryptoCurrencies.map(
                    currency => (
                      <MenuOption
                        style={styles.menuOptionPicker}
                        key={currency.code}
                        value={currency.code}
                      >
                        {Offers.cryptItem(currency.code)}
                      </MenuOption>
                    ),
                  )
                }
              </CardPicker>
            </View>
            <View style={styles.convertCenter}>
              <Image
                source={require('../../img/ic_swap.png')}
                style={[styles.pickerIcon]}
              />
            </View>
            <View style={styles.convertColumn}>
              <Text style={styles.pickerLabel}>
                {intl.formatMessage({ id: 'app.offers.pickerLabel.for', defaultMessage: 'For' }).toUpperCase()}
              </Text>
              <CardPicker
                style={styles.picker}
                onValueChange={this.onCurrencyCodeChange}
                selectedValue={filter.currencyCode || 'USD'}
                mode="dropdown"
                renderButton={Offers.fiatItem}
                containerStyle={styles.containerPicker}
              >
                {
                  currencies.map(
                    currency => (
                      <MenuOption
                        style={styles.menuOptionPicker}
                        key={currency.code}
                        value={currency.code}
                      >
                        {Offers.fiatItem(currency.code)}
                      </MenuOption>
                    ),
                  )
                }
              </CardPicker>
            </View>
          </View>
          <Text style={styles.pickerLabel}>
            {intl.formatMessage({ id: 'app.offers.pickerLabel.selectPaymentMethod', defaultMessage: 'Select payment method' }).toUpperCase()}
          </Text>
          <View style={styles.pickerShadow}>
            <PickerModal
              items={paymentMethods.map(method => ({ label: method.name, value: method.code }))}
              onValueChange={this.onPaymentMethodCodeChange}
              defaultValueLabel={intl.formatMessage({ id: 'app.offers.selector.paymentMethodAny', defaultMessage: 'Any' })}
              selectedValue={filter.paymentMethodCode}
              title={intl.formatMessage({ id: 'app.offers.pickerLabel.selectPaymentMethod', defaultMessage: 'Select payment method' }).toUpperCase()}
            />
          </View>
          <Separator style={{ marginTop: 20, marginBottom: 16 }} />
          <Text style={styles.title}>
            {intl.formatMessage({ id: 'app.offers.title.currentOffers', defaultMessage: 'Current offers' }).toUpperCase()}
          </Text>
        </View>
        <View style={styles.itemContainer}>
          <View style={styles.statusCol}>
            <Text>
              {''}
            </Text>
          </View>
          <View style={styles.nameContainer}>
            <Text>
              {''}
            </Text>
          </View>
          <View style={styles.itemLimits}>
            <Text style={styles.itemHeadLabel}>
              {intl.formatMessage({ id: 'app.offers.label.limits', defaultMessage: 'Limits' }).toUpperCase()}
            </Text>
          </View>
          <View style={styles.bankNameContainer}>
            <Text>
              {''}
            </Text>
          </View>
          <View style={styles.valueContainer}>
            <Text style={styles.itemHeadLabel}>
              {intl.formatMessage({ id: 'app.offers.label.value', defaultMessage: 'Value' }).toUpperCase()}
            </Text>
          </View>
        </View>
      </Animated.View>
    );
  };

  renderItem = ({ item, index }) => {
    const ad = item;
    const alt = index % 2 === 0;
    const bankName = ad.payment_method_banks.length > 0
      ? ad.payment_method_banks.map(bank => bank.name)
      : ad.payment_method.name;
    return (
      <Touchable
        onPress={() => this.openNewTrade(ad)}
      >
        <View style={[styles.itemContainer, alt ? styles.alternateBackground : null]}>
          <View style={styles.statusCol}>
            <View
              style={[
                styles.status,
                ad.user.online ? styles.onlineStatus : styles.offlineStatus,
              ]}
            />
          </View>
          <View style={styles.nameContainer}>
            <Text numberOfLines={1} style={styles.itemName}>
              {ad.user.user_name}
            </Text>
          </View>
          <View style={styles.itemLimits}>
            <Text style={styles.itemText}>
              {currencyCodeToSymbol(ad.currency_code)}
              {Price.build(ad.limit_min).viewMain}
              {' – '}
              {Price.build(ad.limit_max).viewMain}
            </Text>
          </View>
          <View style={styles.bankNameContainer}>
            <Text style={styles.itemTextLite}>
              {bankName}
            </Text>
          </View>
          <View style={styles.valueContainer}>
            <Text style={styles.itemText}>
              {currencyCodeToSymbol(ad.currency_code)}
              {Price.build(ad.price).viewMain}
            </Text>
          </View>
        </View>
      </Touchable>
    );
  };

  getBitcionChangeRatesdByTime = (hours, time = 'h') => {
    if (this.state.exchangeRates) {
      return `${this.state.exchangeRates[`change_${hours}${time}`].toFixed(2)}%`;
    }
    return '';
  };

  upToolBar = () => {
    if (!this.downToolBarAnimation) {
      this.downToolBarAnimation = Animated.timing(
        this.state.animatedToolbarPosition,
        {
          toValue: MAX_TOOLBAR_VIEW_HEIGHT,
          duration: 350,
        },
      );
    }
    this.downToolBarAnimation.start();
  };

  downToolBar = () => {
    if (!this.upToolBarAnimation) {
      this.upToolBarAnimation = Animated.timing(
        this.state.animatedToolbarPosition,
        {
          toValue: SAFE_REFRESH_VIEW_HEIGHT,
          duration: 350,
        },
      );
    }
    this.upToolBarAnimation.start();
  };

  refreshToolBar = () => {
    if (!this.refreshToolBarAnimation) {
      this.refreshToolBarAnimation = Animated.timing(
        this.state.animatedToolbarPosition,
        {
          toValue: 0,
          duration: 350,
        },
      );
    }
    this.refreshToolBarAnimation.start();
  };

  onScroll = (e) => {
    const { y } = e.nativeEvent.contentOffset;
    this.scrollValue = y;
    if (y > this.oldScrollPosition && y > SAFE_REFRESH_VIEW_HEIGHT) {
      this.upToolBar();
    } else if (y < this.oldScrollPosition
      && y > SAFE_REFRESH_VIEW_HEIGHT
      && y <= MAX_TOOLBAR_VIEW_HEIGHT) {
      this.downToolBar();
    } else if (y < this.oldScrollPosition
      && y <= SAFE_REFRESH_VIEW_HEIGHT) {
      this.refreshToolBar();
    }
    this.oldScrollPosition = y;
  };

  render() {
    const {
      intl,
      orders,
      filter,
    } = this.props;
    const header = filter.type === FILTER_SELL
      ? intl.formatMessage({ id: 'app.offers.operation.buyTitle', defaultMessage: 'Buy offers' }).toUpperCase()
      : intl.formatMessage({ id: 'app.offers.operation.sellTitle', defaultMessage: 'Sell offers' }).toUpperCase();
    const translateTitleY = this.state.animatedToolbarPosition.interpolate({
      inputRange: [0, SAFE_REFRESH_VIEW_HEIGHT, MAX_TOOLBAR_VIEW_HEIGHT],
      outputRange: [0, 0, -100],
      extrapolate: 'clamp',
    });
    const opacityTitle = this.state.animatedToolbarPosition.interpolate({
      inputRange: [0, SAFE_REFRESH_VIEW_HEIGHT, MAX_TOOLBAR_VIEW_HEIGHT],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    });
    const translateToolbarY = this.state.animatedToolbarPosition.interpolate({
      inputRange: [0, SAFE_REFRESH_VIEW_HEIGHT, MAX_TOOLBAR_VIEW_HEIGHT],
      outputRange: [0, 0, -50],
      extrapolate: 'clamp',
    });
    return (
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.container}>
          <Animated.View
            style={[styles.iosContainer, {
              position: 'absolute',
              zIndex: 2,
              transform: [{
                translateY: translateToolbarY,
              }],
            }]}
          >
            <Animated.View
              style={
                [
                  styles.titleContainer,
                  {
                    opacity: opacityTitle,
                    transform: [{
                      translateY: translateTitleY,
                    }],
                  },
                ]
              }
            >
              <Text style={styles.titleText}>
                {header}
              </Text>
            </Animated.View>
            <View style={styles.btcCostContainer}>
              <Text style={styles.btcCostText}>
                BTC COST
              </Text>
              <Text style={styles.btcCost}>
                483672
              </Text>
              <Text style={styles.btcChangePercent}>
                {this.getBitcionChangeRatesdByTime('4', 'h')}
              </Text>
            </View>
          </Animated.View>
          {
            this.isFetching()
              ? <ActivityIndicator size="large" style={{ margin: 16 }} />
              : (
                <AnimatedFlatList
                  bounces={false}
                  onScroll={this.onScroll}
                  data={orders.list}
                  renderItem={this.renderItem}
                  keyExtractor={i => String(i.id)}
                  ListHeaderComponent={this.renderHeader}
                  scrollEventThrottle={16}
                  style={{ flex: 1, zIndex: 1 }}
                  contentContainerStyle={{
                    paddingTop: 96,
                    minHeight: height + MAX_TOOLBAR_HEIGHT,
                  }}
                  refreshing={orders.pending}
                  onScrollEndDrag={this.handleRelease}
                  onMomentumScrollEnd={Platform.OS === 'ios' ? () => {} : this.handleRelease}
                  onResponderRelease={this.handleRelease}
                  ref={(ref) => {
                    this.flatListRef = ref;
                  }}
                />
              )
          }
        </View>

      </SafeAreaView>
    );
  }
}

Offers.propTypes = {
  intl: intlShape.isRequired,
  orders: PropTypes.shape({
    list: PropTypes.array,
    pending: PropTypes.bool,
  }),
  filter: PropTypes.shape({
    type: PropTypes.string,
    paymentMethodCode: PropTypes.string,
    cryptoCurrencyCode: PropTypes.string,
    currencyCode: PropTypes.string,
  }),
  fetchCurrencies: PropTypes.func.isRequired,
  fetchPaymentMethods: PropTypes.func.isRequired,
  fetchCountries: PropTypes.func.isRequired,
  updateFilter: PropTypes.func.isRequired,
  newTrade: PropTypes.func.isRequired,
  paymentMethods: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  cryptoCurrencies: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  currencies: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  exchangeRates: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  fetchExchangeRates: PropTypes.func,
};

export default injectIntl(Offers);
