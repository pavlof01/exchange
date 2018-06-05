import { connect } from 'react-redux'
import Home from '../../components/Home/Index'
import { fetch as fetchHome } from '../../actions/home'
import { fetch as fetchRates } from '../../actions/exchangeRates'
import { fetch as fetchCurrencies } from '../../actions/currencies'
import { update as updateFilter } from '../../actions/homeFilter'

const mapStateToProps = (state) => ({
  ...state.home,
  currencies: state.currencies.list,
  cryptoCurrencies: state.cryptoCurrencies.list,
  filter: state.homeFilter,
});

const mapDispatchToProps = dispatch => ({
  fetchHome: (params) => dispatch(fetchHome(dispatch, params)),
  fetchRates: (params) => dispatch(fetchRates(dispatch, params)),
  fetchCurrencies: () => dispatch(fetchCurrencies(dispatch)),
  updateFilter: (values) => dispatch(updateFilter(values)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home)