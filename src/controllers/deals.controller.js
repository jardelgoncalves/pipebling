import logger from '@src/logger';
import { errorResponse } from '@src/utils/response';

/**
 * @param {import('@src/services').ServiceManager} serviceManager service manager instance
 */
export const DealsController = (serviceManager) => {
  const service = serviceManager.dealsService;
  return {
    async index(req, res) {
      try {
        const data = await service.proccessingDealsOfToday();
        res.json(data);
      } catch (error) {
        logger.error(error);
        return errorResponse(res, error);
      }
    },
  };
};
