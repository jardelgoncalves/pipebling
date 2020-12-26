/* eslint-disable max-classes-per-file */

import { Pipedrive } from '@src/client/pipedrive';
import logger from '@src/logger';
import { InternalError } from '@src/utils/error/InternalError';
import { formatDate } from '@src/utils/formatDate';
import { IService } from '../utils/interfaces/IService';

export class DealsProcessingInternalError extends InternalError {
  constructor(message, code) {
    super(`Unexpected error during the deals processing: ${message}`, code);
  }
}

export class DealsService extends IService {
  /**
   * @param {import('.').ServiceManager} serviceManager service manager instance
   */
  constructor(serviceManager, pipedrive = new Pipedrive()) {
    super(serviceManager);
    this.pipedrive = pipedrive;
    this.DealsRepository = new serviceManager.repositories.DealsRepository();
  }

  async proccessingDealsOfToday() {
    try {
      const period = formatDate(new Date('2020-12-24'));
      const response = await this.pipedrive.fetchDeals(period);

      const [deals] = response.data;

      const data = await this.DealsRepository.persist({ ...deals, period });
      return data;
    } catch (error) {
      logger.error(error);
      throw new DealsProcessingInternalError(error.message, error.code || 500);
    }
  }
}
