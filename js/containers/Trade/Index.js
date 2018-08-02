import { connect } from 'react-redux';
import { fetch, update } from '../../actions/currentTrade';
import Trade from '../../components/Trade';
import updatePartnerActivity from '../../actions/partnerActivity';
import { openProfile } from '../../actions/navigation';

const mapDispatchToProps = dispatch => ({
  fetch: id => dispatch(fetch(dispatch, id)),
  update: trade => dispatch(update(trade)),
  updatePartnerActivity: statuses => dispatch(updatePartnerActivity(statuses)),
  openProfile: profile => dispatch(openProfile(profile)),
});

const mapStateToProps = state => ({
  user: state.session.user,
  trade: state.currentTrade.trade,
  partnerActivityStatuses: state.partnerActivity.statuses,
});

export default connect(mapStateToProps, mapDispatchToProps)(Trade);
