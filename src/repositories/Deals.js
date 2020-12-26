import { IRepository } from '@src/utils/IRepository';
import * as models from '@src/models';

export class DealsRepository extends IRepository {
  constructor() {
    super(models, models.Deals);
  }
}
