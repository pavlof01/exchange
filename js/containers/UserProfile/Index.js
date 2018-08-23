
import { connect } from 'react-redux';
import Profile from '../../components/Profile';
import { openFeedback } from '../../actions/navigation';

const mapDispatchToProps = dispatch => ({
  openFeedback: userName => dispatch(openFeedback(userName)),
});

const mapStateToProps = state => ({
  currentUser: state.session.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
