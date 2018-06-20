import { connect } from 'react-redux'
import Home from '../../components/Home/Index'
import {logout} from "../../actions/login";

const mapDispatchToProps = dispatch => ({
    logout: () => {dispatch(logout())}
});

const mapStateToProps = (state) => ({
    user: state.login.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(Home)