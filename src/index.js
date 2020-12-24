import config from 'config';
import { Server } from './server';
import logger from './logger';

const EXIT_STATUS = Object.freeze({
  FAILURE: 1,
  SUCCESS: 0,
});

const NODE_EXIT_SIGNALS = Object.freeze(['SIGINT', 'SIGTERM', 'SIGQUIT']);

process.on('unhandledRejection', (reason, promise) => {
  logger.error(
    `App exiting due to an unhandled promise: ${promise} and reasons ${reason}`
  );
  throw reason;
});

process.on('uncaughtException', (error) => {
  logger.error(`App exiting due to an uncaught exception: ${error}`);
  process.exit(EXIT_STATUS.FAILURE);
});

(async () => {
  try {
    const server = new Server(process.env.PORT || config.get('App.port'));
    await server.init();
    server.start();
    NODE_EXIT_SIGNALS.map((signal) =>
      process.on(signal, async () => {
        try {
          await server.close();
          logger.info('App exited with success');
          process.exit(EXIT_STATUS.SUCCESS);
        } catch (error) {
          logger.error(`App exited with error: ${error}`);
          process.exit(EXIT_STATUS.FAILURE);
        }
      })
    );
  } catch (error) {
    logger.error(`App exited with error: ${error}`);
    process.exit(EXIT_STATUS.FAILURE);
  }
})();
