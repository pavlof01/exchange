import { connect } from 'react-redux';
import PincodeAutorization from '../../components/PincodeAutorization';
import { dynamicInitialRoute } from '../../actions/app'

const mapDispatchToProps = dispatch => ({
    initialRoute: () => dispatch(dynamicInitialRoute())
});

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(PincodeAutorization);
