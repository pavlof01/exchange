import * as React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import 'intl'; // intl полифил для работы react-intl в react-native.
import { IntlProvider } from 'react-intl';
import { getAvailableSystemLanguageCode } from '../../utils/i18n';

class LanguageProvider extends React.PureComponent {
  render() {
    const {
      children,
      messages,
    } = this.props;
    const locale = getAvailableSystemLanguageCode();
    // console.warn(`curren system language ${locale}`);
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

LanguageProvider.propTypes = {
  children: PropTypes.element.isRequired,
  messages: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default LanguageProvider;
