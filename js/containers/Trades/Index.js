import { connect } from 'react-redux';
import Trades from '../../components/Trades/Index';
import { fetch } from '../../actions/currentTrade';
import { openTrade } from '../../actions/navigation';

const mapDispatchToProps = dispatch => ({
  openTrade: (id) => {
    dispatch(fetch(dispatch, id));
    dispatch(openTrade(id));
  },
});

const mapStateToProps = state => ({
  user: state.session.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(Trades);
