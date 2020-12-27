import { IRepository } from '@src/utils/interfaces/IRepository';
import * as models from '@src/models';

export class LogRepository extends IRepository {
  constructor() {
    super(models, models.Log);
  }

  async find(filter = {}) {
    return this.Model.find(filter).sort({ createdAt: -1 });
  }
}
