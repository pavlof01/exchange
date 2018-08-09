export function keysToSnakeCase(object = {}) {
  const newObject = {};

  Object.keys(object).forEach((key) => {
    const newKey = toSnakeCase(key);
    newObject[newKey] = object[key];
  });

  return newObject;
}

export function toSnakeCase(string = '') {
  return string.replace(/([a-z][A-Z])/g, g => `${g[0]}_${g[1].toLowerCase()}`);
}

export function keysToCamelCase(object = {}) {
  const newObject = {};

  objEach(object, (key, value) => {
    // typeof([]) === 'object'. Real object has no length
    if (value !== null && typeof (value) === 'object' && !value.hasOwnProperty('length')) {
      value = keysToCamelCase(value);
    }
    // key have no digits. Example: day_1_start, day_1_end. It is hard to back to snake case.
    newObject[/^[a-z_]+$/.test(key) ? toCamelCase(key) : key] = value;
  });

  return newObject;
}

export function toCamelCase(string = '') {
  return string.replace(/_([a-z])/g, g => g[1].toUpperCase());
}

export function objLength(obj) {
  return Object.keys(obj).length;
}

export function objMap(obj, callback) {
  obj = obj || {};
  return Object.keys(obj).map((key, i) => callback(key, obj[key], i));
}

export function objEach(obj, callback) {
  obj = obj || {};
  Object.keys(obj).forEach(key => callback(key, obj[key]));
}

// https://www.toptal.com/designers/htmlarrows/currency/
export function currencyCodeToSymbol(code) {
  return {
    USD: '\u0024',
    EUR: '\u20AC',
    RUB: '\u20BD',
    CNY: '\u5143',
    GBP: '\u00A3',
    JPY: '\u00A5',
  }[code] || code;
}

/**
 * сделка только создана.
 * @constant {string} TRADE_STATUS_NEW
 */
export const TRADE_STATUS_NEW = 'new';
/**
 * покупатель нажал "оплатить".
 * @constant {string} TRADE_STATUS_PAID_CONFIRMED
 */
export const TRADE_STATUS_PAID_CONFIRMED = 'paid_confirmed';
/**
 * продавец отпустил крипту, сделка успешно завершена.
 * @constant {string} TRADE_STATUS_COMPLETED_BY_SELLER
 */
export const TRADE_STATUS_COMPLETED_BY_SELLER = 'completed_by_seller';
/**
 * была спорная ситуация, крипту отпустил админ.
 * @constant {string} TRADE_STATUS_COMPLETED_BY_ADMIN
 */
export const TRADE_STATUS_COMPLETED_BY_ADMIN = 'completed_by_admin';
/**
 * сделка отменена.
 * @constant {string} TRADE_STATUS_CANCELLED
 */
export const TRADE_STATUS_CANCELLED = 'cancelled';
/**
 * покупатель нажал "отменить" сделку.
 * @constant {string} TRADE_STATUS_CANCELLED_BY_BUYER
 */
export const TRADE_STATUS_CANCELLED_BY_BUYER = 'cancelled_by_buyer';
/**
 * была спорная ситуация, крипту отпустил админ.
 * @constant {string} TRADE_STATUS_CANCELLED_BY_ADMIN
 */
export const TRADE_STATUS_CANCELLED_BY_ADMIN = 'cancelled_by_admin';
/**
 * спорная ситуация, покупатель нажал "я оплатил", но `продавец не отпускает крипту.
 * @constant {string} TRADE_STATUS_EXPIRED_AND_PAID
 */
export const TRADE_STATUS_EXPIRED_AND_PAID = 'expired_and_paid';
/**
 * покупатель не оплатил, время вышло.
 * @constant {string} TRADE_STATUS_EXPIRED
 */
export const TRADE_STATUS_EXPIRED = 'expired';

/**
 * Определяет завершенность сделки по статусу.
 * @param {string} status - статус сделки.
 * @return {boolean} - true, если сделка завершена.
 */
export function isTradeDone(status) {
  switch (status) {
    case TRADE_STATUS_NEW:
    case TRADE_STATUS_PAID_CONFIRMED:
      return false;
    case TRADE_STATUS_COMPLETED_BY_SELLER:
    case TRADE_STATUS_COMPLETED_BY_ADMIN:
    case TRADE_STATUS_CANCELLED:
    case TRADE_STATUS_CANCELLED_BY_BUYER:
    case TRADE_STATUS_CANCELLED_BY_ADMIN:
    case TRADE_STATUS_EXPIRED_AND_PAID:
    case TRADE_STATUS_EXPIRED:
      return true;
    default:
      return false;
  }
}

/**
 * Определяет успешность сделки по статусу.
 * @param {string} status - статус сделки.
 * @return {boolean} - true, если сделка успешно завершена.
 */
export function isTradeComplete(status) {
  switch (status) {
    case TRADE_STATUS_COMPLETED_BY_SELLER:
    case TRADE_STATUS_COMPLETED_BY_ADMIN:
      return true;
    default:
      return false;
  }
}

/**
 * Возвращает заголовок транзакции по статусу сделки.
 * @param {object} intl - .
 * @param {string} status - статус сделки.
 * @param {string} paymentMethodCode - название способа оплаты.
 * @return {string} - заголовок транзакции.
 */
export function getTradeTitle(intl, status, paymentMethodCode) {
  switch (status) {
    case TRADE_STATUS_NEW:
    case TRADE_STATUS_PAID_CONFIRMED:
      return `${intl.formatMessage({ id: 'app.newTrade.title', defaultMessage: 'Transfer via' })} ${paymentMethodCode}`;
    case TRADE_STATUS_COMPLETED_BY_SELLER:
    case TRADE_STATUS_COMPLETED_BY_ADMIN:
      return intl.formatMessage({ id: 'app.trade.status.complete', defaultMessage: 'Transaction complete' });
    case TRADE_STATUS_CANCELLED:
    case TRADE_STATUS_CANCELLED_BY_BUYER:
    case TRADE_STATUS_CANCELLED_BY_ADMIN:
      return intl.formatMessage({ id: 'app.trade.status.cancelled', defaultMessage: 'Transaction cancelled' });
    case TRADE_STATUS_EXPIRED_AND_PAID:
    case TRADE_STATUS_EXPIRED:
      return intl.formatMessage({ id: 'app.trade.status.cancelled', defaultMessage: 'Transaction expired' });
    default:
      return '';
  }
}

export const tradeTypeBuy = 'buy';
export const tradeTypeSell = 'sell';

export function tradeType(trade, userId) {
  return trade.ad.type === 'Ad::Sell'
    ? trade.ad.user.id === userId ? 'sell' : 'buy'
    : trade.ad.user.id === userId ? 'buy' : 'sell';
}

export function tradePartner(trade, userId) {
  return trade.contractor.id === userId
    ? trade.ad.user
    : trade.contractor;
}

export function sortGetNext(currentField, nextField) {
  switch ((currentField || '').indexOf(nextField)) {
    case 0: return `-${nextField}`;
    case 1: return nextField;
    default: return nextField;
  }
}

export function sortGetState(currentField, nextField, asc, desc, off) {
  switch ((currentField || '').indexOf(nextField)) {
    case 0: return asc;
    case 1: return desc;
    default: return off;
  }
}
