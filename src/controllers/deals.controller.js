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
        await service.proccessingDealsOfToday();
        const data = await service.DealsRepository.find({});
        res.status(200).json(data);
      } catch (error) {
        logger.error(error);
        return errorResponse(res, error);
      }
    },
  };
};
