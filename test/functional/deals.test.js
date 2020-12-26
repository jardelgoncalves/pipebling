import nock from 'nock';
import { describe, it, expect, beforeEach } from '@jest/globals';
import { Deals } from '@src/models';
import apiPipedrive3DealsFixtures from '@test/fixtures/api_pipedrive_3_deals';
import apiPipedrive3DealsNormalizeFixtures from '@test/fixtures/pipedrive_normalized_3_deals';
import { formatDate } from '@src/utils/formatDate';

describe('Functional test to /deals', () => {
  beforeEach(async () => {
    Deals.deleteMany({});
  });

  it('should return the data containing the total amount earned today', async () => {
    const today = formatDate(new Date());

    nock('https://api.pipedrive.com:443', {
      encodedQueryParams: true,
    })
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get('/v1/deals/timeline')
      .query({
        start_date: today,
        interval: 'day',
        amount: '1',
        field_key: 'won_time',
        totals_convert_currency: 'BRL',
        api_token: 'fake-token',
      })
      .reply(200, apiPipedrive3DealsFixtures);

    const { status, body } = await global.testRequest.get('/deals');
    expect(status).toBe(200);
    expect(body).toEqual(
      expect.objectContaining({
        ...apiPipedrive3DealsNormalizeFixtures,
        id: expect.any(String),
        period: today,
      })
    );
  });
});
