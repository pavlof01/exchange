import { connect } from 'react-redux';
import SelectNativeCurr from '../../components/Settings/components/SelectNativeCurr';
import { fetch as fetchCountries } from '../../actions/countries';

const mapDispatchToProps = dispatch => ({
    //fetchCountries: () => dispatch(fetchCountries(dispatch)),
});

const mapStateToProps = state => {
    return {
        //countries: state.countries.list,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectNativeCurr);