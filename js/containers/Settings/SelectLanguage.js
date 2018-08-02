import { connect } from 'react-redux';
import SelectLanguage from '../../components/Settings/components/SelectLanguage';
import { appLocales } from '../../utils/i18n';
import { setLocale } from '../../actions/i18n';

const mapDispatchToProps = dispatch => ({
  setLocale: locale => dispatch(setLocale(locale)),
});

const mapStateToProps = state => ({
  locales: appLocales,
  selectedLocale: state.i18n.locale,
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectLanguage);
