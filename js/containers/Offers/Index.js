import { connect } from 'react-redux';
import keyBy from 'lodash/keyBy';
import Offers from '../../components/Offers';
import { update as updateFilter } from '../../actions/ordersFilter';
import { fetch as fetchCurrencies } from '../../actions/currencies';
import { fetch as fetchPaymentMethods } from '../../actions/paymentMethods';
import { fetch as fetchCountries } from '../../actions/countries';
import { newTrade } from '../../actions/navigation';

const mapDispatchToProps = dispatch => ({
  updateFilter: values => dispatch(updateFilter(values)),
  fetchCurrencies: params => dispatch(fetchCurrencies(dispatch, params)),
  fetchPaymentMethods: () => dispatch(fetchPaymentMethods(dispatch)),
  fetchCountries: () => dispatch(fetchCountries(dispatch)),
  newTrade: ad => dispatch(newTrade(ad)),
});

const mapStateToProps = (state) => {
  const countryMap = keyBy(state.countries.list, o => o.code);
  countryMap.ANY = 'Не выбрано';
  return {
    filter: state.ordersFilter,
    currencies: state.currencies.list,
    cryptoCurrencies: state.cryptoCurrencies.list,
    paymentMethods: state.paymentMethods.list,
    countries: state.countries.list,
    countryMap,
    orders: state.orders,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Offers);
