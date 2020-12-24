import Axios from 'axios';

const requisitioner = Symbol('requisitioner');
export class Request {
  constructor(request = Axios) {
    this[requisitioner] = request;
  }

  async get(url, config = {}) {
    return this[requisitioner].get(url, config);
  }

  async post(url, data, config = {}) {
    return this[requisitioner].post(url, data, config);
  }
}
