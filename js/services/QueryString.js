export default class QueryString {
  static generate(params) {
    return Object.keys(params).map((key) => {
      return key + '=' + encodeURIComponent(params[key]);
    }).join('&')
  }

  static parse(path) {
    let a = document.createElement('a');
    a.href = path;

    let search = a.search.substring(1);
    return search ?
      JSON.parse(
        '{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
        (key, value) => key === "" ? value : decodeURIComponent(value)
      ) : {}
  }
}
