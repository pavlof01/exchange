import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { MenuOption } from 'react-native-popup-menu';
import TopButton from '../../style/TopButton';
import Separator from '../../style/Separator';
import { cryptoIcons, fonts } from '../../style/resourceHelpers';
import Touchable from '../../style/Touchable';
import { currencyCodeToSymbol } from '../../helpers';
import Price from '../../values/Price';
import PickerModal from '../../style/PickerModal';
import HeaderBar from '../../style/HeaderBar';
import CardPicker from '../../style/CardPicker';

const styles = StyleSheet.create({
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
    paddingLeft: 8,
    paddingRight: 8,
  },
  selectorsBox: {
    paddingStart: 17,
    paddingEnd: 17,
    flex: 1,
  },
  convertRow: {
    flex: 1,
    flexDirection: 'row',
  },
  convertColumn: {
    flex: 1,
    flexDirection: 'column',
  },
  convertCenter: {
    width: 60,
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerLabel: {
    marginTop: 16,
    marginBottom: 6,
    fontSize: 10,
    fontFamily: fonts.medium.regular,
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
  pickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  pickerIcon: {
    height: 24,
    width: 24,
  },
  cardText: {
    fontSize: 24,
    color: '#333333',
    margin: 8,
    fontWeight: 'bold',
  },
  currencyCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#c3c3c3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  currencySubcircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  currencySymbol: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#c3c3c3',
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  title: {
    color: '#9b9b9b',
    fontSize: 14,
    fontFamily: fonts.bold.regular,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    height: 46,
    marginLeft: 8,
    marginRight: 8,
  },
  alternateBackground: {
    backgroundColor: '#EEEEEE',
  },
  statusCol: {
    width: 18,
    height: 46,
    justifyContent: 'center',
  },
  itemCol: {
    flex: 1,
    height: 46,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  itemLimits: {
    flex: 1.4,
    height: 46,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  itemText: {
    color: '#000000',
    fontSize: 10,
    fontFamily: fonts.bold.regular,
  },
  itemTextLite: {
    color: '#9b9b9b',
    fontSize: 10,
    fontFamily: fonts.medium.regular,
  },
  itemName: {
    color: '#9b9b9b',
    fontSize: 12,
    fontFamily: fonts.bold.regular,
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
    marginLeft: 6,
  },
  onlineStatus: {
    backgroundColor: '#14d459',
  },
  offlineStatus: {
    backgroundColor: 'red',
  },
});

const FILTER_SELL = 'sell';
const FILTER_BUY = 'buy';

class Offers extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
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

  static itemWithIcon(label, icon) {
    return (
      <View style={styles.pickerRow}>
        { icon }
        <Text style={styles.cardText}>
          { label }
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
            selectedColor="green"
          />
          <Separator
            vertical
            padding={8}
          />
          <TopButton
            title={intl.formatMessage({ id: 'app.offers.operation.sell', defaultMessage: 'Sell' }).toUpperCase()}
            selected={filter.type === FILTER_BUY}
            onPress={this.showOffersToBuy}
            selectedColor="red"
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
              >
                {
                  cryptoCurrencies.map(
                    currency => (
                      <MenuOption key={currency.code} value={currency.code}>
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
              >
                {
                  currencies.map(
                    currency => (
                      <MenuOption key={currency.code} value={currency.code}>
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
          <View style={styles.itemCol}>
            <Text>
              {''}
            </Text>
          </View>
          <View style={styles.itemLimits}>
            <Text style={styles.itemHeadLabel}>
              {intl.formatMessage({ id: 'app.offers.label.limits', defaultMessage: 'Limits' }).toUpperCase()}
            </Text>
          </View>
          <View style={styles.itemCol}>
            <Text>
              {''}
            </Text>
          </View>
          <View style={styles.itemCol}>
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
    const alt = index % 2 === 1;
    const bankName = ad.payment_method_banks.map(bank => bank.name);
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
          <View style={styles.itemCol}>
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
          <View style={styles.itemCol}>
            <Text style={styles.itemTextLite}>
              {bankName}
            </Text>
          </View>
          <View style={styles.itemCol}>
            <Text style={styles.itemText}>
              {currencyCodeToSymbol(ad.currency_code)}
              {Price.build(ad.price).viewMain}
            </Text>
          </View>
        </View>
      </Touchable>
    );
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
    return (
      <View style={styles.container}>
        <HeaderBar title={header} />
        <FlatList
          data={orders.list}
          renderItem={this.renderItem}
          keyExtractor={i => String(i.id)}
          ListHeaderComponent={this.renderHeader}
          refreshing={orders.pending}
        />
      </View>
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
