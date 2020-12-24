import express from 'express';
import { NotImplementedException } from './NotImplementedException';

export class IServer {
  constructor(app = express) {
    this.app = app();
    this.bodyParser = express.json;
  }

  async init() {
    throw new NotImplementedException();
  }

  async start() {
    throw new NotImplementedException();
  }

  async close() {
    throw new NotImplementedException();
  }

  getApp() {
    return this.app;
  }
}
