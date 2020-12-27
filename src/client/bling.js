import { Log } from '@src/models';
import { formatDate } from '@src/utils/formatDate';
import * as HTTPUtil from '@src/utils/request';
import config from 'config';
import { BlingRequestError, BlingResponseError } from './error/BlingError';

const blingConfig = config.get('App.resources.bling');

const requisitioner = Symbol('requisitioner');
const dealsToXml = Symbol('dealsToXml');
const templateBlingOrderXml = Symbol('templateBlingOrderXml');
const logError = Symbol('logError');
export class Bling {
  constructor(request = new HTTPUtil.Request()) {
    this[requisitioner] = request;
  }

  async createOrder(timeline, idExisting = []) {
    const deals = (timeline.deals || []).filter(
      (deal) => !idExisting.includes(deal.id)
    );

    if (!Array.isArray(deals) || !deals.length) return;

    const orders = await this[dealsToXml](deals, timeline.period);

    try {
      // I could remove await and let requests run in the background
      const results = await Promise.all(
        orders.map((order) =>
          this[requisitioner].post(
            `${blingConfig.get('url')}/pedido/json/`,
            this[requisitioner].transformQueryString({
              apikey: blingConfig.get('token'),
              xml: order,
            }),
            {
              headers: {
                'content-type': 'application/x-www-form-urlencoded',
              },
            }
          )
        )
      );

      this[logError](results, timeline.period);

      const idsWithError = results.reduce(
        (acc, response, index) =>
          response.data.retorno.erros ? [...acc, deals[index].id] : acc,
        []
      );

      return idsWithError;
    } catch (error) {
      if (HTTPUtil.Request.isRequestError(error)) {
        throw new BlingResponseError(
          `Error: ${error.response.data.error} Code: ${error.response.status}`,
          error.response.status
        );
      }

      throw new BlingRequestError(error.message);
    }
  }

  async [dealsToXml](deals = [], period) {
    const orders = deals.map((deal) =>
      this[templateBlingOrderXml]({ ...deal, period })
    );

    return orders;
  }

  /**
   *
   * @param {{id: Number, title: String, person_name: String, value: Number, period: String}} deal
   */
  [templateBlingOrderXml](deal) {
    const { id, title, period, person_name, value } = deal;

    return `
      <pedido>
        <cliente>
          <nome>${person_name}</nome>
        </cliente>
        <itens>
          <item>
            <codigo>${id}</codigo>
            <descricao>${title}</descricao>
            <un>Un</un>
            <qtde>1</qtde>
            <vlr_unit>${value}</vlr_unit>
          </item>
        </itens>
        <parcelas>
          <parcela>
            <data>${formatDate(new Date(period), true)}</data>
            <vlr>${value}</vlr>
          </parcela>
        </parcelas>
      </pedido>
    `;
  }

  async [logError](requests = [], period) {
    await Promise.all(
      requests.map((r) => {
        const log = new Log({
          period,
          context: 'create order in bling',
          details: r.data.retorno.erros,
        });
        return log.save();
      })
    );
  }
}
