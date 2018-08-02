import { connect } from 'react-redux';
import Trades from '../../components/Trades/Index';
import { fetch } from '../../actions/currentTrade';
import {
  refreshTrades,
  fetchTrades,
} from '../../actions/trades';
import { openTrade } from '../../actions/navigation';

const mapDispatchToProps = dispatch => ({
  openTrade: (id) => {
    dispatch(fetch(dispatch, id));
    dispatch(openTrade(id));
  },
  refreshTrades: (filterParams) => {
    dispatch(refreshTrades(filterParams));
  },
  fetchTrades: (filterParams) => {
    dispatch(fetchTrades(filterParams));
  },
});

const mapStateToProps = state => ({
  user: state.session.user,
  trades: state.trades.get('items').toJS(),
  lastLoadedPage: state.trades.get('lastLoadedPage'),
});

export default connect(mapStateToProps, mapDispatchToProps)(Trades);
