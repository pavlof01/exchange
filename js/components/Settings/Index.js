import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { injectIntl, intlShape } from 'react-intl';
import Touchable from '../../style/Touchable';
import HeaderBar from '../../style/HeaderBar';
import Title from './Title';
import SettingsItem from './SettingsItem';
import Switcher from './Switcher';
import { fonts } from '../../style/resourceHelpers';
import { getLocaleDisplayName } from '../../utils/i18n';

const isAndroid = Platform.OS === 'android';

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#2B2B82',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
  },
  headerContainer: {
    marginTop: isAndroid ? 28 : 0,
    marginBottom: isAndroid ? 24 : 30,
  },
  emailContainer: {
    paddingBottom: 20,
    paddingTop: 20,
    marginStart: 17,
    marginEnd: 17,
    borderBottomColor: '#D5D5D5',
    borderBottomWidth: 1,
  },
  email: {
    fontSize: 17,
    lineHeight: 17,
    color: '#14d459',
    fontFamily: fonts.regular.regular,
  },
  signOutContainer: {
    paddingBottom: 20,
    paddingTop: 20,
    paddingStart: 17,
    paddingEnd: 17,
  },
  signOutText: {
    color: '#d61b38',
    letterSpacing: 0.5,
    fontSize: 17,
    fontFamily: fonts.bold.regular,
  },
});

class Settings extends Component {
  state = {
    introduction: this.props.user.introduction,
    ad_sell_enabled: this.props.user.ad_buy_enabled,
    ad_buy_enabled: this.props.user.ad_sell_enabled,
    passcode: false,
    selectedCountry: undefined,
    selectedCurrency: undefined,
  };

  componentWillMount() {
    this.selectedCountry();
    this.selectedCurr();
    this.checkPasscode();
    // eslint-disable-next-line react/prop-types
    this.props.navigation.addListener(
      'willFocus',
      () => {
        this.checkPasscode();
        this.selectedCountry();
        this.selectedCurr();
      },
    );
  }

  /* eslint-disable react/prop-types, camelcase, max-len */

  componentWillReceiveProps({ user }) {
    const { user: { introduction, ad_buy_enabled, ad_sell_enabled } } = this.props;
    this.setState({
      ...(introduction !== user.introduction ? { introduction: user.introduction } : {}),
      ...(ad_buy_enabled !== user.ad_buy_enabled ? { ad_buy_enabled: user.ad_buy_enabled } : {}),
      ...(ad_sell_enabled !== user.ad_sell_enabled ? { ad_sell_enabled: user.ad_sell_enabled } : {}),
    });
  }

  onSubmitUserMeta = () => {
    const { user: { introduction, ad_buy_enabled, ad_sell_enabled } } = this.props;

    const meta = {
      ...(introduction !== this.state.introduction ? { introduction: this.state.introduction } : {}),
      ...(ad_buy_enabled !== this.state.ad_buy_enabled ? { ad_buy_enabled: this.state.ad_buy_enabled } : {}),
      ...(ad_sell_enabled !== this.state.ad_sell_enabled ? { ad_sell_enabled: this.state.ad_sell_enabled } : {}),
    };

    this.props.updateUserMeta(meta);

    // this.setState({pending:true});
  };
  /* eslint-enable react/prop-types */

  checkPasscode = async () => {
    const passcode = await AsyncStorage.getItem('pincode');
    if (passcode) {
      this.setState({ passcode: true });
    } else {
      this.setState({ passcode: false });
    }
  }

  selectedCountry = async () => {
    const selectedCountry = await AsyncStorage.getItem('selectedCountry');
    this.setState({ selectedCountry });
  }

  selectedCurr = async () => {
    const selectedCurrency = await AsyncStorage.getItem('selectedCurrency');
    this.setState({ selectedCurrency });
  }

  onLogoutPressed = () => this.props.logout();

  onIntroductionChanged = value => this.setState({ introduction: value });

  onAdBuyEnabledChanged = value => this.setState({ ad_buy_enabled: value });

  onAdSellEnabledChanged = value => this.setState({ ad_sell_enabled: value });

  render() {
    const {
      intl,
      user,
      openSelectCountries,
      openSelectNativeCurrency,
      openSelectLanguage,
      openPincode,
      selectedLocale,
    } = this.props;
    const {
      selectedCountry,
      selectedCurrency,
      passcode,
    } = this.state;
    const displaySelectedLanguage = getLocaleDisplayName(selectedLocale);
    return (
      <SafeAreaView style={styles.safeContainer}>
        <HeaderBar style={styles.headerContainer} title={intl.formatMessage({ id: 'app.settings.title', defaultMessage: 'Settings' }).toUpperCase()} />
        <View style={styles.mainContainer}>
          <ScrollView style={styles.scrollContainer}>
            <Title text={intl.formatMessage({ id: 'app.settings.title.profile', defaultMessage: 'Profile' }).toUpperCase()} />
            <View style={styles.emailContainer}>
              <Text style={styles.email}>
                {user.email}
              </Text>
            </View>
            <Title text={intl.formatMessage({ id: 'app.settings.title.account', defaultMessage: 'Account' }).toUpperCase()} />
            <SettingsItem
              onPress={openSelectCountries}
              text={selectedCountry || intl.formatMessage({ id: 'app.settings.title.selectCountry', defaultMessage: 'Select country' })}
            />
            <SettingsItem
              onPress={openSelectNativeCurrency}
              text={selectedCurrency || intl.formatMessage({ id: 'app.settings.title.selectCurrency', defaultMessage: 'Select currency' })}
            />
            <SettingsItem
              onPress={openSelectLanguage}
              text={displaySelectedLanguage || intl.formatMessage({ id: 'app.settings.title.selectLanguage', defaultMessage: 'Select language' })}
            />
            <Title text={intl.formatMessage({ id: 'app.settings.title.security', defaultMessage: 'Security' }).toUpperCase()} />
            <Switcher
              value={passcode}
              onValueChange={openPincode}
              text={intl.formatMessage({ id: 'app.settings.pincode', defaultMessage: 'Passcode' })}
            />
            <Title text={intl.formatMessage({ id: 'app.settings.title.verification', defaultMessage: 'Verification' }).toUpperCase()} />
            <SettingsItem
              onPress={() => { }}
              text={intl.formatMessage({ id: 'app.settings.title.idInfo', defaultMessage: 'ID info' })}
            />
            <SettingsItem
              onPress={() => { }}
              text={intl.formatMessage({ id: 'app.settings.title.phoneNumber', defaultMessage: 'Phone number' })}
            />
            <SettingsItem
              onPress={() => { }}
              text={intl.formatMessage({ id: 'app.settings.title.identityDocs', defaultMessage: 'Identity documents' })}
            />
            <Touchable onPress={this.onLogoutPressed}>
              <View style={styles.signOutContainer}>
                <Text style={styles.signOutText}>
                  {intl.formatMessage({ id: 'app.navigation.settings.Logout', defaultMessage: 'Sign out' }).toUpperCase()}
                </Text>
              </View>
            </Touchable>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

Settings.propTypes = {
  intl: intlShape.isRequired,
  user: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  logout: PropTypes.func,
  openSelectCountries: PropTypes.func.isRequired,
  openSelectNativeCurrency: PropTypes.func.isRequired,
  openSelectLanguage: PropTypes.func.isRequired,
  openPincode: PropTypes.func.isRequired,
  selectedLocale: PropTypes.string,
};

export default injectIntl(Settings);
