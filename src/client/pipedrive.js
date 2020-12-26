import * as HTTPUtil from '@src/utils/request';
import config from 'config';
import {
  PipedriveRequestError,
  PipedriveResponseError,
} from './error/PipedriveError';

const pipedriveConfig = config.get('App.resources.pipedrive');

const requisitioner = Symbol('requisitioner');
const amount = Symbol('amount');
const interval = Symbol('interval');
const field_key = Symbol('field_key');
const totals_convert_currency = Symbol('totals_convert_currency');
export class Pipedrive {
  constructor(request = new HTTPUtil.Request()) {
    this[requisitioner] = request;
    this[amount] = 1;
    this[interval] = 'day';
    this[field_key] = 'won_time';
    this[totals_convert_currency] = 'BRL';
  }

  async fetchDeals(date) {
    try {
      const { data } = await this[requisitioner].get(
        `${pipedriveConfig.get(
          'url'
        )}/deals/timeline?start_date=${date}&interval=${
          this[interval]
        }&amount=${this[amount]}&field_key=${
          this[field_key]
        }&totals_convert_currency=${
          this[totals_convert_currency]
        }&api_token=${pipedriveConfig.get('token')}`
      );

      return data;
    } catch (error) {
      if (HTTPUtil.Request.isRequestError(error)) {
        throw new PipedriveResponseError(
          `Error: ${error.response.data.error} Code: ${error.response.status}`,
          error.response.status
        );
      }
      throw new PipedriveRequestError(error.message);
    }
  }
}
