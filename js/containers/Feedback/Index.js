
import { connect } from 'react-redux'
import Feedback from "../../components/Profile/Feedback";
import {getFeedbacks} from "../../actions/profile";

const mapDispatchToProps = dispatch => ({
    updateFeedbacks: params => dispatch(getFeedbacks(params, dispatch))
});

const mapStateToProps = ({profile: { feedbacks }}) => ({
    feedbacks,
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback)