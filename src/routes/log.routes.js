import { LogController } from '@src/controllers/log.controller';

/**
 * @param {import('express').Router} routerInstance - Router instance.
 * @param {import('@src/services').ServiceManager} serviceManager - Service Manager instance.
 */
export const logRouter = (routerInstance, serviceManager) => {
  const router = routerInstance();

  const logController = LogController(serviceManager);

  router.get('/', logController.index);

  return router;
};
