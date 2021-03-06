import { connect } from 'react-redux';
import Settings from '../../components/Settings/Index';
import { logout, updateUserMeta } from '../../actions/session';
import {
  openProfile,
  openAds,
  openIdentityDocs,
  openPhoneVerify,
  openIdInfo,
  openPincode,
  openSelectCountries,
  openSelectNativeCurrency,
  openSelectLanguage,
} from '../../actions/navigation';


const mapDispatchToProps = dispatch => ({
  logout: () => { dispatch(logout()); },
  openProfile: profile => dispatch(openProfile(profile)),
  updateUserMeta: params => dispatch(updateUserMeta(params, dispatch)),
  openAds: () => dispatch(openAds()),
  openIdentityDocs: () => dispatch(openIdentityDocs()),
  openPhoneVerify: () => dispatch(openPhoneVerify()),
  openIdInfo: () => dispatch(openIdInfo()),
  openPincode: () => dispatch(openPincode()),
  openSelectCountries: () => dispatch(openSelectCountries()),
  openSelectNativeCurrency: () => dispatch(openSelectNativeCurrency()),
  openSelectLanguage: () => dispatch(openSelectLanguage()),
});

const mapStateToProps = state => ({
  user: state.session.user,
  selectedLocale: state.i18n.locale,
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
