import { connect } from 'react-redux';
import SelectNativeCurr from '../../components/Settings/components/SelectNativeCurr';
import { update as updateFilter } from '../../actions/ordersFilter';

const mapDispatchToProps = dispatch => ({
  updateFilter: values => dispatch(updateFilter(values)),
});

const mapStateToProps = state => {
  return {
    currencies: state.currencies.list,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectNativeCurr);