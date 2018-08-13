import { AsyncStorage } from 'react-native';
import { POSITION } from '../actions';
import Api from '../services/Api';
import User from '../models/User';

export default function (user, dispatch) {
  getByGeo(user, dispatch);

  return { type: POSITION.GET_POSITION_STARTED };
}

function getByIp(user, dispatch) {
  if (!user.countryCode) {
    Api.get('/locations/ip_geocode')
      .then(response => dispatch(getSucceed({
        countryCode: response.data.location.country.code,
        currencyCode: response.data.location.country.currency_code,
        placeId: response.data.location.place_id,
      })))
      .catch(response => dispatch(getFailure()));
  }
}

function getByGeo(user, dispatch) {
  if (user.placeId) {
    getByIp(user, dispatch);
  } else if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        Api.post('/locations/geocode', coords)
          .then(response => dispatch(getSucceed({
            countryCode: response.data.location.country.code,
            currencyCode: response.data.location.country.currency_code,
            placeId: response.data.location.place_id,
          }))).catch(() => getByIp(user, dispatch));
      },
      () => {
        getByIp(user, dispatch);
      },
    );
  } else {
    getByIp(user, dispatch);
  }
}

async function getSucceed(location) {
  const selectedCurrency = await AsyncStorage.getItem('selectedCurrency');
  const selectedCountry = await AsyncStorage.getItem('selectedCountryCode');
  if (selectedCountry && selectedCurrency) {
    return { type: POSITION.GET_POSITION_RESULT, location };
  }
  User.setCountryCode(location.countryCode);
  User.setCurrencyCode(location.currencyCode);
  User.setPlaceId(location.placeId);
  return { type: POSITION.GET_POSITION_RESULT, location };
}

function getFailure() {
  User.setCountryCode('US');
  User.setCurrencyCode('USD');
  User.setPlaceId(null);

  return {
    type: POSITION.GET_POSITION_RESULT,
    location: {
      countryCode: 'US',
      currencyCode: 'USD',
      placeId: null,
    },
  };
}
