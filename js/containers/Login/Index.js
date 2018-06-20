import {connect} from 'react-redux'
import Login from '../../components/Login/Index'
import {login} from '../../actions/authActions';
import {fetchDictionary} from '../../actions/i18n';

const mapDispatchToProps = dispatch => ({
    fetchDictionary: () => dispatch(fetchDictionary(dispatch)),
    login: (params) => {
        dispatch(login(params))
    }
});

const mapStateToProps = (state) => ({
    isFetching: state.auth.form.isFetching,
    formState: state.auth.form.state,
    formError: state.auth.form.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login)