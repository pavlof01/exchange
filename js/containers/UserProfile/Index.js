
import { connect } from 'react-redux'
import Profile from '../../components/Profile'
import {openFeedback} from "../../actions/navigation";

const mapDispatchToProps = dispatch => ({
    openFeedback: (user_name) => dispatch(openFeedback(user_name)),
});

const mapStateToProps = (state) => ({
    currentUser: state.session.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile)