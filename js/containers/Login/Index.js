import {connect} from 'react-redux'
import Login from '../../components/Login/Index'
import * as authActions from '../../actions/authActions';
import {bindActionCreators} from 'redux';
import {login} from '../../actions/authActions';
import {fetchDictionary} from '../../actions/i18n';

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({...authActions}, dispatch),
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