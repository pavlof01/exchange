import { connect } from 'react-redux'
import NewTrade from '../../components/NewTrade'
import {openTrade} from "../../actions/navigation";

const mapDispatchToProps = dispatch => ({
    openTrade: (id) => dispatch(openTrade(id))
});

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTrade)