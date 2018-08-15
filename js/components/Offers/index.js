import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
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
const { width, height } = Dimensions.get('window');

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
    alignItems: 'flex-start',
    overflow: 'hidden',
  },
  valueContainer: {
    flex: 1,
    height: 46,
    justifyContent: 'center',
    alignItems: 'flex-end',
    overflow: 'hidden',
    paddingRight: 4,
  },
  itemLimits: {
    flex: 1,
    height: 46,
    justifyContent: 'center',
    alignItems: 'flex-start',
    overflow: 'hidden',
  },
  itemText: {
    color: '#000000',
    fontSize: 14,
    fontFamily: fonts.bold.regular,
    textAlign: 'center',
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
    height: 112,
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
    marginEnd: 17,
    marginStart: 17,
    marginTop: 16,
    paddingBottom: 3,
    marginBottom: 3,
    fontSize: 16,
    fontFamily: fonts.bold.regular,
    borderBottomColor: '#D5D5D5',
    borderBottomWidth: 1,
  },
});

const FILTER_SELL = 'sell';
const FILTER_BUY = 'buy';
const isAndroid = Platform.OS === 'android';
class Offers extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      heightTitleContainer: new Animated.Value(112),
      titleOpacity: new Animated.Value(1),
      btcCostContainerOpacity: new Animated.Value(1),
      translateTitleY: new Animated.Value(0),
      showTitle: 'flex',
      animating: new Animated.Value(0),
    };
  }

  async componentDidMount() {
    const {
      fetchCurrencies,
      fetchPaymentMethods,
      fetchCountries,
      updateFilter,
    } = this.props;
    fetchCurrencies();
    fetchPaymentMethods();
    fetchCountries();
    updateFilter({});
    const selectedCurrency = await AsyncStorage.getItem('selectedCurrency');
    const selectedCountry = await AsyncStorage.getItem('selectedCountryCode');
    this.onCurrencyCodeChange(selectedCurrency);
    this.onCountryCodeChange(selectedCountry);
  }

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
    } = this.props;
    updateFilter(filter);
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
    return (
      <View style={styles.header}>
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
                selectedValue={filter.currencyCode}
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
          <View style={styles.valueContainer}>
            <Text>
              {''}
            </Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.itemHeadLabel}>
              {intl.formatMessage({ id: 'app.offers.label.limits', defaultMessage: 'Limits' }).toUpperCase()}
            </Text>
          </View>
          <View style={styles.valueContainer}>
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
      </View>
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
            <Text style={styles.itemName}>
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
          <View style={styles.valueContainer}>
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

  handleScroll = (event) => {
    //СДЕЛАТЬ КОНСТАНТЫ!!!!!
    //console.warn(event.nativeEvent.contentOffset.y);
    if (event.nativeEvent.contentOffset.y < -60) {
      this.refreshAnimation();
    } else if (event.nativeEvent.contentOffset.y >= 50) {
      this.pullDownAnimation();
    } else if (-40 < event.nativeEvent.contentOffset.y < 10) {
      this.pullUpAnimation();
    }
  }

  pullUpAnimation = () => {
    if (this.state.animating) {
      return;
    }
    const {
      heightTitleContainer,
      titleOpacity,
      btcCostContainerOpacity,
      showTitle,
    } = this.state;
    Animated.sequence([
      Animated.parallel([
        Animated.timing(heightTitleContainer, {
          toValue: 112,
          duration: 200,
        }),
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 200,
        }),
      ]),
    ]).start(() => this.setState({ showTitle: 'flex' }));
  }

  pullDownAnimation = () => {
    if (this.state.animating) {
      return;
    }
    const {
      heightTitleContainer,
      titleOpacity,
      btcCostContainerOpacity,
      showTitle,
    } = this.state;
    Animated.sequence([
      Animated.parallel([
        Animated.timing(heightTitleContainer, {
          toValue: 56,
          duration: 200,
        }),
        Animated.timing(titleOpacity, {
          toValue: 0,
          duration: 200,
        }),
      ]),
    ]).start(() => this.setState({ showTitle: 'none' }));
  }

  refreshAnimation = () => {
    const { translateTitleY, titleOpacity, animating } = this.state;
    Animated.sequence([
      Animated.timing(animating, {
        toValue: 1,
      }),
      Animated.parallel([
        Animated.timing(translateTitleY, {
          toValue: 35,
          duration: 800,
        }),
        Animated.timing(titleOpacity, {
          toValue: 0,
          duration: 600,
        }),
      ]),
      Animated.timing(translateTitleY, {
        toValue: 0,
      }),
      Animated.timing(titleOpacity, {
        delay: 1000,
        toValue: 1,
        duration: 600,
      }),
      Animated.timing(animating, {
        toValue: 0,
      }),
    ]).start();
  }

  render() {
    const {
      intl,
      orders,
      filter,
    } = this.props;
    const header = filter.type === FILTER_SELL
      ? intl.formatMessage({ id: 'app.offers.operation.buyTitle', defaultMessage: 'Buy offers' }).toUpperCase()
      : intl.formatMessage({ id: 'app.offers.operation.sellTitle', defaultMessage: 'Sell offers' }).toUpperCase();
    return (
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.container}>
          <Animated.View
            style={[styles.iosContainer, { height: this.state.heightTitleContainer }]}
          >
            <Animated.View
              style={
                [
                  styles.titleContainer,
                  {
                    display: this.state.showTitle,
                    opacity: this.state.titleOpacity,
                    transform: [{
                      translateY: this.state.translateTitleY,
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
                +0.12%
              </Text>
            </View>
          </Animated.View>
          <Text style={[styles.text]}>
            {header}
          </Text>
          {
            this.isFetching()
              ? <ActivityIndicator size="large" style={{ margin: 16 }} />
              : (
                <FlatList
                  //bounces={false}
                  onScroll={this.handleScroll}
                  //onScroll={onScrollEvent}
                  data={orders.list}
                  /*refreshControl={(
                    <RefreshControl
                      refreshing={orders.pending}
                      onRefresh={this.onRefresh}
                    />
                  )}*/
                  renderItem={this.renderItem}
                  keyExtractor={i => String(i.id)}
                  ListHeaderComponent={this.renderHeader}
                //refreshing={orders.pending}
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
};

export default injectIntl(Offers);
