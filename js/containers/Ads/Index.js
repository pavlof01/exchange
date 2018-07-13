import { connect } from 'react-redux'
import Ads from '../../components/Ads'
import {openAds} from "../../actions/navigation";

const mapDispatchToProps = dispatch => ({
    openAds: () => dispatch(openAds())
});

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Ads)