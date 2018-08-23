import { connect } from 'react-redux';
import PincodeAutorization from '../../components/PincodeAutorization';
import { dynamicInitialRoute } from '../../actions/app';

const mapDispatchToProps = dispatch => ({
  initialRoute: () => dispatch(dynamicInitialRoute()),
});

export default connect(null, mapDispatchToProps)(PincodeAutorization);
