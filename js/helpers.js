export function keysToSnakeCase(object = {}){
  let newObject = {};

  Object.keys(object).forEach((key) => {
    let newKey = toSnakeCase(key);
    newObject[newKey] = object[key]
  });

  return newObject;
}

export function toSnakeCase(string = ''){
  return string.replace(/([a-z][A-Z])/g, function (g) { return g[0] + '_' + g[1].toLowerCase() });
}

export function keysToCamelCase(object = {}){
  let newObject = {};

  objEach(object, (key, value) => {
    // typeof([]) === 'object'. Real object has no length
    if (value !== null && typeof(value) === 'object' && !value.hasOwnProperty('length')) {
      value = keysToCamelCase(value)
    }
    // key have no digits. Example: day_1_start, day_1_end. It is hard to back to snake case.
    newObject[/^[a-z_]+$/.test(key) ? toCamelCase(key) : key] = value;
  });

  return newObject;
}

export function toCamelCase(string = ''){
  return string.replace(/_([a-z])/g, function (g) { return g[1].toUpperCase(); });
}

export function objLength(obj) {
  return Object.keys(obj).length;
}

export function objMap(obj, callback) {
  obj = obj || {};
  return Object.keys(obj).map((key, i) => callback(key, obj[key], i))
}

export function objEach(obj, callback) {
  obj = obj || {};
  Object.keys(obj).forEach(key => callback(key, obj[key]))
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

export const tradeTypeBuy = 'buy';
export const tradeTypeSell = 'sell';

export function tradeType(trade, userId) {
  return trade.ad.type === 'Ad::Sell' ?
    trade.ad.user.id === userId ? 'sell' : 'buy' :
    trade.ad.user.id === userId ? 'buy' : 'sell'
}

export function tradePartner(trade, userId) {
  return trade.contractor.id === userId ?
    trade.ad.user :
    trade.contractor;
}

export function sortGetNext(currentField, nextField) {
  switch((currentField || '').indexOf(nextField)) {
    case  0: return '-' + nextField;
    case  1: return nextField;
    default: return nextField;
  }
}

export function sortGetState(currentField, nextField, asc, desc, off) {
  switch((currentField || '').indexOf(nextField)) {
    case  0: return asc;
    case  1: return desc;
    default: return off;
  }
}