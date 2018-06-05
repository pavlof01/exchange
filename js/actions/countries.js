import { COUNTRIES } from '../actions'
import Api from '../services/Api'

export function fetch(dispatch) {
  Api.get('/countries')
    .then(response => dispatch(fetchSucceed(response.data.countries)))
    .catch(response => dispatch(fetchFailure('Ошибка /countries')));

  return { type: COUNTRIES.FETCH_COUNTRIES_STARTED }
}

function fetchSucceed(countries) {
  return { type: COUNTRIES.FETCH_COUNTRIES_SUCCEED, countries: countries }
}

function fetchFailure(error) {
  return { type: COUNTRIES.FETCH_COUNTRIES_FAILURE, error: error }
}

export function getPhoneCodes(dispatch) {
    Api.get('/phone_codes')
      .then(({ data: { phone_codes }}) => dispatch({ type: COUNTRIES.FETCH_PHONE_CODES_SUCCEED, data: phone_codes }))
      .catch(error => dispatch({ type: COUNTRIES.FETCH_PHONE_CODES_FAILURE, error }));

    return { type: COUNTRIES.FETCH_PHONE_CODES_STARTED }
}