import { connect } from 'react-redux';
import SelectCountries from '../../components/Settings/components/SelectCountries';

const mapDispatchToProps = () => ({
});

const mapStateToProps = state => ({
  countries: state.countries.list,
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectCountries);
