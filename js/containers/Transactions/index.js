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
});

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
