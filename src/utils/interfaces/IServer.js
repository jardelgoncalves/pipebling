import express from 'express';
import { NotImplementedException } from '../NotImplementedException';

const routerInstance = Symbol('routerInstance');
export class IServer {
  constructor(app = express) {
    this.app = app();
    this.bodyParser = express.json;
    this[routerInstance] = express.Router;
  }

  /**
   * @param {Array.<{prefix: String, router: Function}>} mapRoutes - project route array.
   * @param {import('@src/services').ServiceManager} serviceManager - Service Manager instance.
   */
  addRoutes(mapRoutes = [], serviceManager) {
    const routes = this[routerInstance]();

    mapRoutes.forEach((route) => {
      routes.use(
        route.prefix,
        route.router(this[routerInstance], serviceManager)
      );
    });
    this.app.use(routes);
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
