import I18n from './I18n';

export default class Validator {
  static emailRegexp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

  constructor(options) {
    this.options = options;
  }

  validate = (value) => {
    let errors = [];

    if (this.options.presence && !value) {
      errors.push(I18n.t('can_not_be_blank'))
    } else if (this.options.email && !this.constructor.emailRegexp.test(value)) {
      errors.push('Не правильный формат')
    } else if (this.options.length) {
      if (this.options.length.min && (value || '').length < this.options.length.min) {
        errors.push('Должно быть не короче ' + this.options.length.min)
      }

      if (this.options.length.max && (value || '').length > this.options.length.max) {
        errors.push('Должно быть не длиннее ' + this.options.length.max)
      }
    } else if (this.options.numeric) {
      let floatValue = parseFloat(value) || 0.0;
      if (this.options.numeric.greaterThan !== undefined && floatValue <= this.options.numeric.greaterThan) {
        errors.push('Должно быть больше ' + this.options.numeric.greaterThan)
      }
    }

    if (errors.length) {
      return errors.join(',')
    }
  };
}
