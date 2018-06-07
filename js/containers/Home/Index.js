import { connect } from 'react-redux'
import Home from '../../components/Home/Index'
import {logout} from "../../actions/authActions";

const mapDispatchToProps = dispatch => ({
    logout: () => {dispatch(logout())}
});

const mapStateToProps = (state) => ({
    user: state.auth.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(Home)