import { connect } from 'react-redux'
import Settings from '../../components/Settings/Index'
import {logout, updateUserMeta} from "../../actions/session";
import {openProfile} from "../../actions/navigation";

const mapDispatchToProps = dispatch => ({
    logout: () => {dispatch(logout())},
    openProfile: (profile) => dispatch(openProfile(profile)),
    updateUserMeta: params => dispatch(updateUserMeta(params,dispatch)),
});

const mapStateToProps = (state) => ({
    user: state.session.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings)