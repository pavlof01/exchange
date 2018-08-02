import { connect } from 'react-redux';
import * as React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import 'intl'; // intl полифил для работы react-intl в react-native.
import { IntlProvider } from 'react-intl';

class LanguageProvider extends React.PureComponent {
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

const mapDispatchToProps = () => ({
});

const mapStateToProps = state => ({
  selectedLocale: state.i18n.locale,
});

LanguageProvider.propTypes = {
  selectedLocale: PropTypes.string,
  children: PropTypes.element.isRequired,
  messages: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default connect(mapStateToProps, mapDispatchToProps)(LanguageProvider);
