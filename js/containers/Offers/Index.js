import { connect } from 'react-redux';
import keyBy from 'lodash/keyBy';
import Offers from '../../components/Offers';
import { update as updateFilter } from '../../actions/ordersFilter';
import { fetch as fetchCurrencies } from '../../actions/currencies';
import { fetch as fetchPaymentMethods } from '../../actions/paymentMethods';
import { fetch as fetchCountries } from '../../actions/countries';
import { fetch as fetchExchangeRates } from '../../actions/exchangeRates';
import { fetch as fetchCryptValue } from '../../actions/cryprtValue';
import { newTrade } from '../../actions/navigation';

const mapDispatchToProps = dispatch => ({
  updateFilter: values => dispatch(updateFilter(values)),
  fetchCurrencies: params => dispatch(fetchCurrencies(dispatch, params)),
  fetchExchangeRates: (cryptoCurrency, fiatCurrency) => dispatch(
    fetchExchangeRates(cryptoCurrency, fiatCurrency),
  ),
  fetchPaymentMethods: () => dispatch(fetchPaymentMethods(dispatch)),
  fetchCountries: () => dispatch(fetchCountries(dispatch)),
  updateCryptValue: params => dispatch(fetchCryptValue(dispatch, params)),
  newTrade: ad => dispatch(newTrade(ad)),
});

const mapStateToProps = (state) => {
  const countryMap = keyBy(state.countries.list, o => o.code);
  countryMap.ANY = 'Не выбрано';
  return {
    filter: state.ordersFilter,
    currencies: state.currencies.list,
    cryptValue: state.cryptValue,
    exchangeRates: state.exchangeRates,
    cryptoCurrencies: state.cryptoCurrencies.list,
    paymentMethods: state.paymentMethods.list,
    countries: state.countries.list,
    countryMap,
    orders: state.orders,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Offers);
