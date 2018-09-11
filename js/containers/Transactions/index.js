import { connect } from 'react-redux';
import Transactions from '../../components/Transactions';
import {
  getTransactionList,
  refreshTransactionList,
} from '../../actions/session';

const mapDispatchToProps = dispath => ({
  getTransactionList: props => dispath(getTransactionList(props, dispath)),
  refreshTransactionList: () => dispath(refreshTransactionList(dispath)),
});

const mapStateToProps = state => ({
  session: state.session,
  transactions: state.session.transactions,
  isRefreshing: state.transactions.get('isRefreshing'),
  isFetching: state.transactions.get('isFetching'),
  items: state.transactions.get('items').toJS(),
  error: state.transactions.get('error'),
  lastLoadedPage: state.transactions.get('lastLoadedPage'),
  isReachEnd: state.transactions.get('isReachEnd'),
});

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
