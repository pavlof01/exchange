import {connect} from 'react-redux'
import RecoverPassword from '../../components/RecoverPassword/Index'
import {recover} from '../../actions/recoverPassword';
import {fetchDictionary} from '../../actions/i18n';
import {signUpRequest} from '../../actions/signUp';
import {loginRequest} from '../../actions/login';

const mapDispatchToProps = dispatch => ({
    fetchDictionary: () => dispatch(fetchDictionary(dispatch)),
    signUpRequest: () => {
        dispatch(signUpRequest())
    },
    recover: (params) => {
        dispatch(recover(params))
    },
    loginRequest: () => {
        dispatch(loginRequest())
    }
});

const mapStateToProps = (state) => ({
    isFetching: state.recoverPassword.form.isFetching,
    formError: state.recoverPassword.form.error,
    isSent: state.recoverPassword.form.isSent,
});

export default connect(mapStateToProps, mapDispatchToProps)(RecoverPassword)