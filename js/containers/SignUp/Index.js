import {connect} from 'react-redux'
import SignUp from '../../components/SignUp/Index'
import {signUp} from '../../actions/signUp';
import {fetchDictionary} from '../../actions/i18n';
import {loginRequest} from '../../actions/authActions';

const mapDispatchToProps = dispatch => ({
    fetchDictionary: () => dispatch(fetchDictionary(dispatch)),
    signUp: (params) => {
        dispatch(signUp(params))
    },
    loginRequest: () => {
        dispatch(loginRequest())
    }
});

const mapStateToProps = (state) => ({
    isFetching: state.signUp.form.isFetching,
    formState: state.signUp.form.state,
    formError: state.signUp.form.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)