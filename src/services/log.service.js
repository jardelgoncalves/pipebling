/* eslint-disable max-classes-per-file */

import logger from '@src/logger';
import { InternalError } from '@src/utils/error/InternalError';
import { IService } from '@src/utils/interfaces/IService';

export class LogInternalError extends InternalError {
  constructor(message) {
    super(`Unexpected error during get all logs: ${message}`);
  }
}

export class LogService extends IService {
  /**
   * @param {import('.').ServiceManager} serviceManager service manager instance
   */
  constructor(serviceManager) {
    super(serviceManager);

    this.LogRepository = new serviceManager.repositories.LogRepository();
  }

  async getAll() {
    try {
      const logs = await this.LogRepository.find({});
      return logs;
    } catch (error) {
      logger.error(error);
      throw new LogInternalError(error.message);
    }
  }
}
