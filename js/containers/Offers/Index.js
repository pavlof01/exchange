import { connect } from 'react-redux'
import Offers from '../../components/Offers/Index'
import { update as updateFilter } from '../../actions/ordersFilter'
import { fetch as fetchCurrencies } from '../../actions/currencies'
import { fetch as fetchPaymentMethods } from '../../actions/paymentMethods'
import { fetch as fetchCountries } from '../../actions/countries'
import {newTrade} from "../../actions/navigation";

const mapDispatchToProps = dispatch => ({
    updateFilter: (values) => dispatch(updateFilter(values)),
    fetchCurrencies: (params) => dispatch(fetchCurrencies(dispatch, params)),
    fetchPaymentMethods: () => dispatch(fetchPaymentMethods(dispatch)),
    fetchCountries: () => dispatch(fetchCountries(dispatch)),
    newTrade: (ad) => dispatch(newTrade(ad)),
});

const mapStateToProps = (state) => ({
    filter: state.ordersFilter,
    currencies: state.currencies.list,
    cryptoCurrencies: state.cryptoCurrencies.list,
    paymentMethods: state.paymentMethods.list,
    countries: state.countries.list,
    orders: state.orders,
});

export default connect(mapStateToProps, mapDispatchToProps)(Offers)