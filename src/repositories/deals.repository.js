import { IRepository } from '@src/utils/interfaces/IRepository';
import * as models from '@src/models';

const upset = Symbol('upset');
export class DealsRepository extends IRepository {
  constructor() {
    super(models, models.Deals);
  }

  async persist(data) {
    return this[upset](data);
  }

  async [upset](data) {
    const exists = await this.Model.findOne({
      period: data.period,
    });

    const ids = data.deals.map((deal) => deal.id);

    const dataDefault = {
      deals_ids: ids,
      totals_by_currency: data.totals.values,
      totals_converted: {
        currency: data.totals_converted.currency,
        value: data.totals_converted.value,
        value_formatted: data.totals_converted.value_formatted,
      },
    };

    if (exists) {
      const idsNonExist = ids.filter((id) => exists.deals_ids.includes(id));
      if (Array.isArray(idsNonExist) && !!idsNonExist.length) {
        exists.set(dataDefault);
        await exists.save();
      }
      return exists;
    }
    const deals = new this.Model({
      ...{ ...dataDefault },
      period: data.period,
    });
    await deals.save();

    return deals;
  }
}
