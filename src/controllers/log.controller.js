import logger from '@src/logger';
import { errorResponse } from '@src/utils/response';

/**
 * @param {import('@src/services').ServiceManager} serviceManager service manager instance
 */
export const LogController = (serviceManager) => {
  const service = serviceManager.logService;
  return {
    async index(req, res) {
      try {
        const data = await service.getAll();
        res.status(200).json(data);
      } catch (error) {
        logger.error(error);
        return errorResponse(res, error);
      }
    },
  };
};
