export class IService {
  /**
   * @param {import('@src/services').ServiceManager} serviceManager service manager instance
   */
  constructor(serviceManager) {
    this.serviceManager = serviceManager;
  }
}
