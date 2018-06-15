import {connect} from 'react-redux'
import Login from '../../components/Login/Index'
import {login} from '../../actions/login';
import {fetchDictionary} from '../../actions/i18n';
import {signUpRequest} from '../../actions/signUp';
import {recoverPasswordRequest} from '../../actions/recoverPassword';

const mapDispatchToProps = dispatch => ({
    fetchDictionary: () => dispatch(fetchDictionary(dispatch)),
    login: (params) => {
        dispatch(login(params))
    },
    signUpRequest: () => {
        dispatch(signUpRequest())
    },
    recoverPasswordRequest: (params) => {
        dispatch(recoverPasswordRequest(params))
    }
});

const mapStateToProps = (state) => ({
    isFetching: state.login.form.isFetching,
    formError: state.login.form.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login)