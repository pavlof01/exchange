import { connect } from 'react-redux';
import SelectCountries from '../../components/Settings/components/SelectCountries';
import { update as updateFilter } from '../../actions/ordersFilter';

const mapDispatchToProps = dispatch => ({
  updateFilter: values => dispatch(updateFilter(values)),
});

const mapStateToProps = state => ({
  countries: state.countries.list,
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectCountries);
