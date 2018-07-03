import { connect } from 'react-redux'
import Wallet from '../../components/Wallet/Index'

import { fetch as fetchRates } from '../../actions/exchangeRates'
import { fetch as fetchCurrencies } from '../../actions/currencies'
import {sendCryptoCurrency, updateEstimatedFee} from "../../actions/session";

const mapDispatchToProps = dispatch => ({
    updateRates: (params) => dispatch(fetchRates(dispatch, params)),
    updateCurrencies: () => dispatch(fetchCurrencies(dispatch)),
    updateUserWallet: () => dispatch(set(dispatch)),
    updateEstimatedFee: (params) => dispatch(updateEstimatedFee(params, dispatch)),
    sendCryptoCurrency: (params) => dispatch(sendCryptoCurrency(dispatch, params)),
});

const mapStateToProps = (state) => ({
    currencies: state.currencies.list,
    cryptoCurrencies: state.cryptoCurrencies.list,
    countries: state.countries.list,
    user: state.session.user,
    exchangeRates: state.exchangeRates
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet)