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
});

const mapStateToProps = state => ({
  user: state.session.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
