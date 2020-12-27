import { DealsService } from './deals.service';
import { LogService } from './log.service';

export class ServiceManager {
  /**
   * @param {import('@src/repositories')} repositories All repositories
   */
  constructor(repositories) {
    this.repositories = repositories;
  }

  get dealsService() {
    return new DealsService(this);
  }

  get logService() {
    return new LogService(this);
  }
}
