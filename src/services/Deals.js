/* eslint-disable max-classes-per-file */

import { Pipedrive } from '@src/client/pipedrive';
import logger from '@src/logger';
import { InternalError } from '@src/utils/error/InternalError';
import { formatDate } from '@src/utils/formatDate';

export class DealsProcessingInternalError extends InternalError {
  constructor(message, code) {
    super(`Unexpected error during the deals processing: ${message}`, code);
  }
}

export class DealsService {
  constructor(pipedrive = new Pipedrive()) {
    this.pipedrive = pipedrive;
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
