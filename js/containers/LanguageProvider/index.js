import { connect } from 'react-redux';
import * as React from 'react';
import { Text, AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
import 'intl'; // intl полифил для работы react-intl в react-native.
import { IntlProvider } from 'react-intl';
import { setLocale as setLocaleAction } from '../../actions/i18n';

class LanguageProvider extends React.PureComponent {
  componentDidMount() {
    const { setLocale } = this.props;
    AsyncStorage.getItem('locale', (locale) => {
      setLocale(locale);
    });
  }

  render() {
    const {
      selectedLocale,
      children,
      messages,
    } = this.props;
    const locale = selectedLocale;
    return (
      <IntlProvider
        locale={locale}
        key={locale}
        messages={messages[locale]}
        textComponent={Text}
      >
        {React.Children.only(children)}
      </IntlProvider>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setLocale: locale => dispatch(setLocaleAction(locale)),
});

const mapStateToProps = state => ({
  selectedLocale: state.i18n.locale,
});

LanguageProvider.propTypes = {
  setLocale: PropTypes.func.isRequired,
  selectedLocale: PropTypes.string,
  children: PropTypes.element.isRequired,
  messages: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default connect(mapStateToProps, mapDispatchToProps)(LanguageProvider);
