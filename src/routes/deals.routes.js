import { DealsController } from '@src/controllers/deals.controller';

/**
 * @param {import('express').Router} routerInstance - Router instance.
 * @param {import('@src/services').ServiceManager} serviceManager - Service Manager instance.
 */
export const dealsRouter = (routerInstance, serviceManager) => {
  const router = routerInstance();

  const dealsController = DealsController(serviceManager);

  router.get('/', dealsController.index);

  return router;
};
