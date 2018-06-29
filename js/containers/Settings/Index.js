import { connect } from 'react-redux'
import Settings from '../../components/Settings/Index'
import {logout} from "../../actions/session";

const mapDispatchToProps = dispatch => ({
    logout: () => {dispatch(logout())}
});

const mapStateToProps = (state) => ({
    user: state.session.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings)