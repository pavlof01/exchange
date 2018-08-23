import { connect } from 'react-redux';
import Login from '../../components/Login/Index';
import { fetchDictionary } from '../../actions/i18n';
import { signUpRequest } from '../../actions/signUp';
import { recoverPasswordRequest } from '../../actions/recoverPassword';
import { login } from '../../actions/session';

const mapDispatchToProps = dispatch => ({
  fetchDictionary: () => dispatch(fetchDictionary(dispatch)),
  login: (params) => {
    dispatch(login(params));
  },
  signUpRequest: () => {
    dispatch(signUpRequest());
  },
  recoverPasswordRequest: (params) => {
    dispatch(recoverPasswordRequest(params));
  },
});

const mapStateToProps = state => ({
  isFetching: state.session.pending,
  formError: state.session.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
