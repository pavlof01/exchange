import User from "../User";

export default class LoginUser extends User {
  get isLogged() {
    return true;
  }

  get currencyCode() {
    return this.currency_code
  }

  get countryCode() {
    return this.country_code
  }

  get placeId() {
    return this.place_id
  }
}
