import { CronJob } from 'cron';
import config from 'config';
import { ServiceManager } from '@src/services';
import * as repositories from '@src/repositories';
import logger from '@src/logger';

const serviceManager = new ServiceManager(repositories);

const { dealsService } = serviceManager;
const cronConfig = config.get('App.resources.cron');

const cron = new CronJob(
  cronConfig.get('pattern'),
  () => {
    try {
      (async () => {
        logger.info('starting deals update at the end of the day');
        await dealsService.proccessingDealsOfToday();
        logger.info('Finish deals update');
      })();
    } catch (error) {
      logger.error(
        `Error updating deals at the end of the day ${JSON.stringify(error)}`
      );
    }
  },
  null,
  true,
  cronConfig.get('timezone')
);

export { cron };
