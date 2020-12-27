/* eslint-disable max-classes-per-file */

import { Bling } from '@src/client/bling';
import { Pipedrive } from '@src/client/pipedrive';
import logger from '@src/logger';
import { InternalError } from '@src/utils/error/InternalError';
import { formatDate } from '@src/utils/formatDate';
import { IService } from '@src/utils/interfaces/IService';

export class DealsProcessingInternalError extends InternalError {
  constructor(message, code) {
    super(`Unexpected error during the deals processing: ${message}`, code);
  }
}

export class DealsService extends IService {
  /**
   * @param {import('.').ServiceManager} serviceManager service manager instance
   */
  constructor(
    serviceManager,
    pipedrive = new Pipedrive(),
    bling = new Bling()
  ) {
    super(serviceManager);
    this.pipedrive = pipedrive;
    this.bling = bling;
    this.DealsRepository = new serviceManager.repositories.DealsRepository();
  }

  async proccessingDealsOfToday() {
    try {
      const period = formatDate(new Date());
      const response = await this.pipedrive.fetchDeals(period);
      const exists = await this.DealsRepository.findOne({ period });
      const ids = exists ? exists.deals_ids.map((id) => id) : [];

      const [timeline] = response.data;

      const ignoreIds = await this.bling.createOrder(
        { ...timeline, period },
        ids
      );
      const data = await this.DealsRepository.persist(
        { ...timeline, period },
        ignoreIds
      );

      return data;
    } catch (error) {
      logger.error(error);
      throw new DealsProcessingInternalError(error.message, error.code || 500);
    }
  }
}
