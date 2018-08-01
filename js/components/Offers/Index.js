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
import TopButton from '../../style/TopButton';
import Separator from '../../style/Separator';
import { cryptoIcons, fonts } from '../../style/resourceHelpers';
import Touchable from '../../style/Touchable';
import { currencyCodeToSymbol } from '../../helpers';
import Price from '../../values/Price';

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
    width: 30,
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
    fontSize: 10,
    fontFamily: fonts.bold.regular,
  },
  itemHeadLabel: {
    color: '#9b9b9b',
    fontSize: 12,
    fontFamily: fonts.bold.regular,
  },
});

class Offers extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  showOffersToSell = () => {
    const {
      updateFilter,
    } = this.props;
    updateFilter({ type: 'sell', sort: 'price' });
  };

  showOffersToBuy = () => {
    const {
      updateFilter,
    } = this.props;
    updateFilter({ type: 'buy', sort: '-price' });
  };

  openNewTrade = (ad) => {
    const {
      newTrade,
    } = this.props;
    newTrade(ad);
  };

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

  static CryptItem(code) {
    return Offers.itemWithIcon(code, <Image source={cryptoIcons[code]} style={styles.pickerIcon} resizeMode="contain" />);
  }

  renderHeader = () => {
    const {
      intl,
      filter,
    } = this.props;
    return (
      <View style={styles.header}>
        <View style={styles.rowContainer}>
          <TopButton
            title={intl.formatMessage({ id: 'app.offers.operation.buy', defaultMessage: 'Buy' }).toUpperCase()}
            selected={filter.type === 'sell'}
            onPress={this.showOffersToSell}
            selectedColor="green"
          />
          <Separator
            vertical
            padding={8}
          />
          <TopButton
            title={intl.formatMessage({ id: 'app.offers.operation.sell', defaultMessage: 'Sell' }).toUpperCase()}
            selected={filter.type === 'buy'}
            onPress={this.showOffersToBuy}
            selectedColor="red"
          />
        </View>
        <View style={styles.selectorsBox}>
          <Separator />
          <View style={styles.convertRow}>
            <View style={styles.convertColumn}>
              <Text style={styles.pickerLabel}>
                {intl.formatMessage({ id: 'app.offers.pickerLabel.youSell', defaultMessage: 'You sell' }).toUpperCase()}
              </Text>
              <View style={styles.pickerShadow}>
                <Text>picker</Text>
              </View>
            </View>
            <View style={styles.convertCenter}>
              <Image
                source={require('../../img/ic_swap.png')}
                style={[styles.pickerIcon, {margin: 16, marginTop: 32}]}
              />
            </View>
            <View style={styles.convertColumn}>
              <Text style={styles.pickerLabel}>
                {intl.formatMessage({ id: 'app.offers.pickerLabel.for', defaultMessage: 'For' }).toUpperCase()}
              </Text>
              <View style={styles.pickerShadow}>
                <Text>picker</Text>
              </View>
            </View>
          </View>
          <Text style={styles.pickerLabel}>
            {intl.formatMessage({ id: 'app.offers.pickerLabel.selectPaymentMethod', defaultMessage: 'Select payment method' }).toUpperCase()}
          </Text>
          <View style={styles.pickerShadow}>
            <Text>picker</Text>
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
    return (
      <Touchable
        onPress={() => this.openNewTrade(ad)}
      >
        <View style={[styles.itemContainer, alt ? styles.alternateBackground : null]}>
          <View style={styles.statusCol}>
            { null }
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
              {'test'}
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
      orders,
    } = this.props;
    return (
      <View style={styles.container}>
        {/*{ this.renderHeader() }*/}
        <FlatList
          data={orders.list}
          renderItem={this.renderItem}
          keyExtractor={i => String(i.id)}
          ListHeaderComponent={this.renderHeader}
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
  }),
  updateFilter: PropTypes.func.isRequired,
  newTrade: PropTypes.func.isRequired,
};

export default injectIntl(Offers);
