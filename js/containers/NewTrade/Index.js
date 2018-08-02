import { connect } from 'react-redux';
import NewTrade from '../../components/NewTrade';
import { fetchFromTrade } from '../../actions/currentTrade';
import { openProfile, openTrade } from '../../actions/navigation';

const mapDispatchToProps = dispatch => ({
  openTrade: (trade) => {
    dispatch(fetchFromTrade(dispatch, trade));
    dispatch(openTrade(trade.id));
  },
  openProfile: profile => dispatch(openProfile(profile)),
});

const mapStateToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTrade);
