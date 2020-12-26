import './utils/moduleAlias';
import expressPinoLogger from 'express-pino-logger';
import { IServer } from './utils/interfaces/IServer';
import * as database from './database';
import logger from './logger';
import { dealsRouter } from './routes/deals.routes';
import { ServiceManager } from './services';
import * as repositories from './repositories';

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

  [setupControllers]() {
    const serviceManager = new ServiceManager(repositories);
    this.addRoutes(
      [
        {
          prefix: '/deals',
          router: dealsRouter,
        },
      ],
      serviceManager
    );
  }

  async [setupDatabase]() {
    await database.connect();
  }

  async close() {
    await database.close();
  }
}
