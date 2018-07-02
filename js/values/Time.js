export default class Time {
  constructor(dateString) {
    this.date = new Date(dateString);

    this.day = ("0" + this.date.getDate()).slice(-2);
    this.month = ("0" + (this.date.getMonth() + 1)).slice(-2);
    this.year = this.date.getFullYear();

    this.hours = ("0" + this.date.getHours()).slice(-2);
    this.minutes = ("0" + this.date.getMinutes()).slice(-2);
  }

  get estimatedTime() {
    let diffMin = (new Date() - this.date) / 60 / 1000;

    if (diffMin > 30 * 24 * 60) {
      let monthsFloat = diffMin / 30 / 24 / 60
      let daysFloat = monthsFloat % 1 * 30

      return `${parseInt(monthsFloat)} месяцев ${Math.round(daysFloat)} дней назад`
    } else if (diffMin > 24 * 60) {
      return `${Math.round(diffMin / 24 / 60)} дней назад`
    } else if (diffMin > 60) {
      return `${Math.round(diffMin / 60)} часов назад`
    } else {
      return `${Math.round(diffMin)} минут назад`
    }
  }
}
