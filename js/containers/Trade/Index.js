import { connect } from 'react-redux'
import { fetch, update } from '../../actions/currentTrade'
import Trade from '../../components/Trade'
import {openTrade} from "../../actions/navigation";
import { default as updatePartnerActivity } from '../../actions/partnerActivity'

const mapDispatchToProps = dispatch => ({
    fetch: (id) => dispatch(fetch(dispatch, id)),
    update: (trade) => dispatch(update(trade)),
    updatePartnerActivity: (statuses) => dispatch(updatePartnerActivity(statuses)),
});

const mapStateToProps = (state) => ({
    user: state.session.user,
    trade: state.currentTrade.trade,
    partnerActivityStatuses: state.partnerActivity.statuses,
});

export default connect(mapStateToProps, mapDispatchToProps)(Trade)