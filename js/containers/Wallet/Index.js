import { connect } from 'react-redux';
import Wallet from '../../components/Wallet/Index';

import { fetch as fetchRates } from '../../actions/exchangeRates';
import { fetch as fetchCurrencies } from '../../actions/currencies';
import {
  sendCryptoCurrency,
  updateEstimatedFee,
  getTransactionTokensList,
  generateTransactionToken,
} from '../../actions/session';

const mapDispatchToProps = dispatch => ({
  updateRates: params => dispatch(fetchRates(dispatch, params)),
  updateCurrencies: () => dispatch(fetchCurrencies(dispatch)),
  updateUserWallet: () => dispatch(set(dispatch)),
  updateEstimatedFee: params => dispatch(updateEstimatedFee(params, dispatch)),
  sendCryptoCurrency: params => dispatch(sendCryptoCurrency(dispatch, params)),
  getTransactionTokens: params => dispatch(getTransactionTokensList(params, dispatch)),
  generateTransactionToken: params => dispatch(generateTransactionToken(params, dispatch)),
});

const mapStateToProps = state => ({
  currencies: state.currencies.list,
  cryptoCurrencies: state.cryptoCurrencies.list,
  countries: state.countries.list,
  user: state.session.toJS().user,
  exchangeRates: state.exchangeRates,
  withdrawal: state.session.toJS().withdrawal,
  transactionTokens: state.session.toJS().transaction_tokens,
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
