import {connect} from 'react-redux'
import Login from '../../components/Login/Index'
import {login} from '../../actions/authActions';
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
    isFetching: state.auth.form.isFetching,
    formError: state.auth.form.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login)