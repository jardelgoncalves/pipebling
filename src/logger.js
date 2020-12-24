import pino from 'pino';
import config from 'config';

export default pino({
  level: config.get('App.logger.level'),
  enabled: config.get('App.logger.enabled'),
});
