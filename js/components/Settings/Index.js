import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
} from 'react-native';
import { injectIntl, intlShape } from 'react-intl';
import Touchable from '../../style/Touchable';
import HeaderBar from '../../style/HeaderBar';
import Title from './Title';
import SettingsItem from './SettingsItem';
import Switcher from './Switcher';
import { fonts } from '../../style/resourceHelpers';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
  },
  header: {
    color: '#222222',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 8,
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
  bold: {
    margin: 2,
    fontSize: 16,
    fontWeight: 'bold',
  },
  wideRowItem: {
    flex: 2,
  },
  row: {
    flexDirection: 'row',
    padding: 4,
    alignItems: 'center',
  },
  row2: {
    flexDirection: 'row',
    padding: 8,
  },
  info: {
    backgroundColor: 'white',
    margin: 8,
    padding: 8,
    borderRadius: 4,
  },
  infoText: {
    margin: 2,
    fontSize: 16,
  },
  warning: {
    color: '#8b572a',
    backgroundColor: '#fbf5eb',
    borderColor: '#f5a623',
    borderRadius: 4,
    borderWidth: 1,
    padding: 8,
    margin: 8,
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

const Header = props => (
  <Text style={styles.header}>
    {props.children}
  </Text>
);
const Bold = props => (
  <Text style={styles.bold}>
    {props.children}
  </Text>
);

class Settings extends Component {
  state = {
    pending: false,
    introduction: this.props.user.introduction,
    ad_sell_enabled: this.props.user.ad_buy_enabled,
    ad_buy_enabled: this.props.user.ad_sell_enabled,
    passcode: false,
    selectedCountry: undefined,
    selectedCurrency: undefined,
    selectedLanguage: undefined,
  };

  componentWillMount() {
    this.selectedCountry();
    this.selectedCurr();
    this.checkPasscode();
    this.selectedLang();
    this.props.navigation.addListener(
      'willFocus',
      () => {
        this.checkPasscode();
        this.selectedCountry();
        this.selectedCurr();
        this.selectedLang();
      },
    );
  }

  componentWillReceiveProps({ user }) {
    const { user: { introduction, ad_buy_enabled, ad_sell_enabled } } = this.props;
    this.setState({
      pending: false,
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

  checkPasscode = async () => {
    const passcode = await AsyncStorage.getItem('pincode');
    passcode
      ? this.setState({ passcode: true })
      : this.setState({ passcode: false });
  }

  selectedCountry = async () => {
    const selectedCountry = await AsyncStorage.getItem('selectedCountry');
    this.setState({ selectedCountry });
  }

  selectedCurr = async () => {
    const selectedCurrency = await AsyncStorage.getItem('selectedCurrency');
    this.setState({ selectedCurrency });
  }

  selectedLang = async () => {
    const selectedLanguage = await AsyncStorage.getItem('selectedLanguage');
    this.setState({ selectedLanguage });
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
    } = this.props;
    const {
      selectedCountry,
      selectedCurrency,
      selectedLanguage,
      passcode,
    } = this.state;
    return (
      <View style={styles.mainContainer}>
        <HeaderBar title={intl.formatMessage({ id: 'app.settings.title', defaultMessage: 'Settings' }).toUpperCase()} />
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
            text={selectedCountry || 'Select Country'}
          />
          <SettingsItem
            onPress={openSelectNativeCurrency}
            text={selectedCurrency || 'Select Currency'}
          />
          <SettingsItem
            onPress={openSelectLanguage}
            text={selectedLanguage || 'Select Language'}
          />
          <Title text={intl.formatMessage({ id: 'app.settings.title.security', defaultMessage: 'Security' }).toUpperCase()} />
          <Switcher
            value={passcode}
            onValueChange={openPincode}
            text="Passcode"
          />
          <Touchable onPress={this.onLogoutPressed}>
            <View style={styles.signOutContainer}>
              <Text style={styles.signOutText}>
                SIGN OUT
              </Text>
            </View>
          </Touchable>
        </ScrollView>
      </View>
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
};

export default injectIntl(Settings);
