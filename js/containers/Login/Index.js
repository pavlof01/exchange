import {connect} from 'react-redux'
import Login from '../../components/Login/Index'
import {login} from '../../actions/authActions';
import {fetchDictionary} from '../../actions/i18n';
import {signUpRequest} from '../../actions/signUp';

const mapDispatchToProps = dispatch => ({
    fetchDictionary: () => dispatch(fetchDictionary(dispatch)),
    login: (params) => {
        dispatch(login(params))
    },
    signUpRequest: () => {
        dispatch(signUpRequest())
    }
});

const mapStateToProps = (state) => ({
    isFetching: state.auth.form.isFetching,
    formState: state.auth.form.state,
    formError: state.auth.form.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login)