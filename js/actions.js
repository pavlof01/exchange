export const APP = {
  APP_READY: 'APP_READY',
  CHECK_PINCODE: 'CHECK PINCODE',
  DYNAMIC_INITIAL_ROUTE: 'DYNAMIC_INITIAL_ROUTE',
};

export const POSITION = {
  GET_POSITION_STARTED: 'GET_POSITION_STARTED',
  GET_POSITION_RESULT: 'GET_POSITION_RESULT',
};

export const CURRENCIES = {
  FETCH_CURRENCIES_STARTED: 'FETCH_CURRENCIES_STARTED',
  FETCH_CURRENCIES_FAILURE: 'FETCH_CURRENCIES_FAILURE',
  FETCH_CURRENCIES_SUCCEED: 'FETCH_CURRENCIES_SUCCEED',
  SET_SELECTED_CURRENCY: 'SET_SELECTED_CURRENCY',
};

export const PAYMENT_METHOD_BANKS = {
  FETCH_PAYMENT_METHOD_BANKS_STARTED: 'FETCH_PAYMENT_METHOD_BANKS_STARTED',
  FETCH_PAYMENT_METHOD_BANKS_FAILURE: 'FETCH_PAYMENT_METHOD_BANKS_FAILURE',
  FETCH_PAYMENT_METHOD_BANKS_SUCCEED: 'FETCH_PAYMENT_METHOD_BANKS_SUCCEED',
};

export const PAYMENT_METHODS = {
  FETCH_PAYMENT_METHODS_STARTED: 'FETCH_PAYMENT_METHODS_STARTED',
  FETCH_PAYMENT_METHODS_FAILURE: 'FETCH_PAYMENT_METHODS_FAILURE',
  FETCH_PAYMENT_METHODS_SUCCEED: 'FETCH_PAYMENT_METHODS_SUCCEED',
};

export const GROUPED_PAYMENT_METHODS = {
  FETCH_GROUPED_PAYMENT_METHODS_STARTED: 'FETCH_GROUPED_PAYMENT_METHODS_STARTED',
  FETCH_GROUPED_PAYMENT_METHODS_FAILURE: 'FETCH_GROUPED_PAYMENT_METHODS_FAILURE',
  FETCH_GROUPED_PAYMENT_METHODS_SUCCEED: 'FETCH_GROUPED_PAYMENT_METHODS_SUCCEED',
};

export const COUNTRIES = {
  FETCH_COUNTRIES_STARTED: 'FETCH_COUNTRIES_STARTED',
  FETCH_COUNTRIES_FAILURE: 'FETCH_COUNTRIES_FAILURE',
  FETCH_COUNTRIES_SUCCEED: 'FETCH_COUNTRIES_SUCCEED',

  FETCH_PHONE_CODES_STARTED: 'FETCH_PHONE_CODES_STARTED',
  FETCH_PHONE_CODES_SUCCEED: 'FETCH_PHONE_CODES_SUCCEED',
  FETCH_PHONE_CODES_FAILURE: 'FETCH_PHONE_CODES_FAILURE',
};

export const HOME_FILTER = {
  UPDATE_HOME_FILTER: 'UPDATE_HOME_FILTER',
};

export const ORDERS_FILTER = {
  UPDATE_ORDERS_FILTER: 'UPDATE_ORDERS_FILTER',
};

export const HOME = {
  FETCH_HOME_STARTED: 'FETCH_HOME_STARTED',
  FETCH_HOME_FAILURE: 'FETCH_HOME_FAILURE',
  FETCH_HOME_SUCCEED: 'FETCH_HOME_SUCCEED',
};

export const ORDERS = {
  FETCH_ORDERS_STARTED: 'FETCH_ORDERS_STARTED',
  FETCH_ORDERS_FAILURE: 'FETCH_ORDERS_FAILURE',
  FETCH_ORDERS_SUCCEED: 'FETCH_ORDERS_SUCCEED',
};

export const EXCHANGE_RATES = {
  FETCH_EXCHANGE_RATES_STARTED: 'FETCH_EXCHANGE_RATES_STARTED',
  FETCH_EXCHANGE_RATES_FAILURE: 'FETCH_EXCHANGE_RATES_FAILURE',
  FETCH_EXCHANGE_RATES_SUCCEED: 'FETCH_EXCHANGE_RATES_SUCCEED',
};

export const CRYPT_VALUE = {
  FETCH_CRYPT_VALUE_START: 'FETCH CRYPT VALUE START',
  FETCH_CRYPT_VALUE_SUCCEED: 'FETCH CRYPT VALUE SUCCEED',
  FETCH_CRYPT_VALUE_FAILURE: 'FETCH CRYPT VALUE FAILURE',
};

export const SESSION = {
  LOGIN: 'LOGIN',
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  FETCHING_USER: 'FETCHING_USER',
  FETCH_USER_FAILURE: 'FETCH_USER_FAILURE',
  SESSION_SET_USER: 'SESSION_SET_USER',
  SESSION_UPDATE_USER: 'SESSION_UPDATE_USER',
  LOGOUT: 'LOGOUT',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
  LOGOUT_ERROR: 'LOGOUT_ERROR',

  ATTACH_GOOGLE_AUTH_STARTED: 'ATTACH_GOOGLE_AUTH_STARTED',
  ATTACH_GOOGLE_AUTH_SUCCESS: 'ATTACH_GOOGLE_AUTH_SUCCESS',
  ATTACH_GOOGLE_AUTH_FAILURE: 'ATTACH_GOOGLE_AUTH_FAILURE',

  DETACH_GOOGLE_AUTH_STARTED: 'DETACH_GOOGLE_AUTH_STARTED',
  DETACH_GOOGLE_AUTH_SUCCESS: 'DETACH_GOOGLE_AUTH_SUCCESS',
  DETACH_GOOGLE_AUTH_FAILURE: 'DETACH_GOOGLE_AUTH_FAILURE',

  FETCH_LOGIN_HISTORY_STARTED: 'FETCH_LOGIN_HISTORY_STARTED',
  FETCH_LOGIN_HISTORY_SUCCESS: 'FETCH_LOGIN_HISTORY_SUCCESS',
  FETCH_LOGIN_HISTORY_FAILURE: 'FETCH_LOGIN_HISTORY_FAILURE',

  CHANGE_LOGIN_GUARD_SUCCESS: 'CHANGE_LOGIN_GUARD_SUCCESS',

  CLR_PHONE_NUMBER: 'CLR_PHONE_NUMBER',
  SET_PHONE_NUMBER_STARTED: 'SET_PHONE_NUMBER_STARTED',
  SET_PHONE_NUMBER_SUCCESS: 'SET_PHONE_NUMBER_SUCCESS',
  SET_PHONE_NUMBER_FAILURE: 'SET_PHONE_NUMBER_FAILURE',

  VERIFY_PHONE_NUMBER_STARTED: 'VERIFY_PHONE_NUMBER_STARTED',
  VERIFY_PHONE_NUMBER_SUCCESS: 'VERIFY_PHONE_NUMBER_SUCCESS',
  VERIFY_PHONE_NUMBER_FAILURE: 'VERIFY_PHONE_NUMBER_FAILURE',

  GET_PROFILE_STATUS_STARTED: 'GET_PROFILE_STATUS_STARTED',
  GET_PROFILE_STATUS_SUCCESS: 'GET_PROFILE_STATUS_SUCCESS',
  GET_PROFILE_STATUS_FAILURE: 'GET_PROFILE_STATUS_FAILURE',

  UPDATE_USER_META_STARTED: 'UPDATE_USER_META_STARTED',
  UPDATE_USER_META_SUCCESS: 'UPDATE_USER_META_SUCCESS',
  UPDATE_USER_META_FAILURE: 'UPDATE_USER_META_FAILURE',

  FETCH_TRANSACTIONS_STARTED: 'FETCH_TRANSACTIONS_STARTED',
  FETCH_TRANSACTIONS_SUCCEED: 'FETCH_TRANSACTIONS_SUCCEED',
  FETCH_TRANSACTIONS_FAILURE: 'FETCH_TRANSACTIONS_FAILURE',
  TOGGLE_TRANSACTION_DETAILS: 'TOGGLE_TRANSACTION_DETAILS',

  FETCH_TRANSACTION_TOKENS_STARTED: 'FETCH_TRANSACTION_TOKENS_STARTED',
  FETCH_TRANSACTION_TOKENS_SUCCEED: 'FETCH_TRANSACTION_TOKENS_SUCCEED',
  FETCH_TRANSACTION_TOKENS_FAILURE: 'FETCH_TRANSACTION_TOKENS_FAILURE',

  GENERATE_TRANSACTION_TOKEN_STARTED: 'GENERATE_TRANSACTION_TOKEN_STARTED',
  GENERATE_TRANSACTION_TOKEN_SUCCEED: 'GENERATE_TRANSACTION_TOKEN_SUCCEED',
  GENERATE_TRANSACTION_TOKEN_FAILURE: 'GENERATE_TRANSACTION_TOKEN_FAILURE',

  CURRENCY_SENDING_STARTED: 'CURRENCY_SENDING_STARTED',
  CURRENCY_SENDING_SUCCEED: 'CURRENCY_SENDING_SUCCEED',
  CURRENCY_SENDING_FAILURE: 'CURRENCY_SENDING_FAILURE',

  UPDATE_FEE_STARTED: 'UPDATE_FEE_STARTED',
  UPDATE_FEE_SUCCEED: 'UPDATE_FEE_SUCCEED',
  UPDATE_FEE_FAILURE: 'UPDATE_FEE_FAILURE',
};

export const PROFILE = {
  FETCH_FEEDBACK_STARTED: 'FETCH_FEEDBACK_STARTED',
  FETCH_FEEDBACK_SUCCEED: 'FETCH_FEEDBACK_SUCCEED',
  FETCH_FEEDBACK_FAILURE: 'FETCH_FEEDBACK_FAILURE',
};

export const I18N = {
  I18N_SET_LOCALE: 'I18N_SET_LOCALE',
  I18N_FETCH_DICTIONARY_STARTED: 'I18N_FETCH_DICTIONARY_STARTED',
  I18N_SET_DICTIONARY: 'I18N_SET_DICTIONARY',
};

export const CURRENT_TRADE = {
  CURRENT_TRADE_UPDATE: 'CURRENT_TRADE_UPDATE',
  CURRENT_TRADE_SET: 'CURRENT_TRADE_SET',
};

export const PARTNER_ACTIVITY = {
  PARTNER_ACTIVITY_UPDATE: 'PARTNER_ACTIVITY_UPDATE',
};

export const TRADES = {
  REFRESH_TRADES: 'REFRESH_TRADES',
  FETCH_TRADES_STARTED: 'FETCH_TRADES_STARTED',
  FETCH_TRADES_SUCCEED: 'FETCH_TRADES_SUCCEED',
  FETCH_TRADES_FAILURE: 'FETCH_TRADES_FAILURE',
};
