import Axios from 'axios';
import qs from 'qs';

const requisitioner = Symbol('requisitioner');
const queryString = Symbol('queryString');
export class Request {
  constructor(request = Axios, querystring = qs) {
    this[requisitioner] = request;
    this[queryString] = querystring;
  }

  async get(url, config = {}) {
    return this[requisitioner].get(url, config);
  }

  async post(url, data, config = {}) {
    return this[requisitioner].post(url, data, config);
  }

  transformQueryString(data = {}) {
    return this[queryString].stringify(data);
  }

  static isRequestError(error) {
    return !!(error.response && error.response.status);
  }
}
