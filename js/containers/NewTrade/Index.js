import { connect } from 'react-redux'
import NewTrade from '../../components/NewTrade'
import {fetchFromTrade} from "../../actions/currentTrade";
import {openTrade} from "../../actions/navigation";

const mapDispatchToProps = dispatch => ({
    openTrade: (trade) => {
        dispatch(fetchFromTrade(dispatch, trade));
        dispatch(openTrade(trade.id));
    }
});

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTrade)