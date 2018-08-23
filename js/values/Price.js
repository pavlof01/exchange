export default class Price {
  static build(value) {
    return new Price(value);
  }

  constructor(value) {
    this.value = parseFloat(value);
  }

  // 234234.783443 -> 234234,78
  get viewFiat() {
    return this.value.toFixed(2).replace('.', ',');
  }

  // 0.89548934768994678 -> 0.89548935
  // 0.8954000000001 -> 0.8954
  get viewCrypto() {
    return parseFloat(this.value.toFixed(8));
  }

  // 1000000 -> 1 000 000
  get viewMain() {
    return Math.round(this.value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }
}
