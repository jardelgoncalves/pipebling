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
    this.dealsRepository = serviceManager.repositories.DealsRepository;
  }

  async proccessingDealsOfToday() {
    try {
      const startDate = formatDate(new Date('2020-12-24'));
      const data = await this.pipedrive.fetchDeals(startDate);

      return data;
    } catch (error) {
      logger.error(error);
      throw new DealsProcessingInternalError(error.message, error.code || 500);
    }
  }
}