import { connect } from 'react-redux';
import SelectCountries from '../../components/Settings/components/SelectCountries';

const mapDispatchToProps = dispatch => ({
});

const mapStateToProps = state => {
    return {
        countries: state.countries.list,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectCountries);
