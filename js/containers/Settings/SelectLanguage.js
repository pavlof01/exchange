import { connect } from 'react-redux';
import SelectLanguage from '../../components/Settings/components/SelectLanguage';
import { appLocales } from '../../utils/i18n';

const mapDispatchToProps = dispatch => ({
});

const mapStateToProps = state => ({
  locales: appLocales,
  selectedLocale: state.i18n.locale,
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectLanguage);
