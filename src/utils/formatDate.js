import config from 'config';

export const formatDate = (date = new Date(), BR = false) => {
  const data = date
    .toLocaleString('pt-BR', {
      timezone: config.get('App.resources.cron.timezone'),
    })
    .split(',')[0];

  return BR ? data : data.split('/').reverse().join('-');
};
