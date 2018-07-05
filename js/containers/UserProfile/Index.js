
import { connect } from 'react-redux'
import Profile from '../../components/Profile'

const mapDispatchToProps = dispatch => ({
});

const mapStateToProps = (state) => ({
    currentUser: state.session.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile)