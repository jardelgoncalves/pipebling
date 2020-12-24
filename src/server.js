import './utils/moduleAlias';
import expressPinoLogger from 'express-pino-logger';
import { IServer } from './utils/IServer';
import * as database from './database';
import logger from './logger';

const setupGlobalMiddlewares = Symbol('setupGlobalMiddlewares');
const setupDatabase = Symbol('setupDatabase');
const setupControllers = Symbol('setupControllers');
export class Server extends IServer {
  constructor(port) {
    super();
    this.port = port;
  }

  async init() {
    this[setupGlobalMiddlewares]();
    this[setupControllers]();
    await this[setupDatabase]();
  }

  start() {
    this.app.listen(this.port, () => {
      logger.info(`Server listening of port: ${this.port}`);
    });
  }

  [setupGlobalMiddlewares]() {
    this.app.use(this.bodyParser());
    this.app.use(
      expressPinoLogger({
        logger,
      })
    );
  }

  [setupControllers]() {}

  async [setupDatabase]() {
    await database.connect();
  }

  async close() {
    await database.close();
  }
}
