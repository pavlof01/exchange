import { connect } from 'react-redux';
import SelectNativeCurr from '../../components/Settings/components/SelectNativeCurr';
import { fetch as fetchCountries } from '../../actions/countries';

const mapDispatchToProps = dispatch => ({
});

const mapStateToProps = state => {
    return {
        currencies: state.currencies.list,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectNativeCurr);