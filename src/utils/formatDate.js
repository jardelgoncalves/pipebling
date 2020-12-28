import config from 'config';

export const formatDate = (date = new Date(), BR = false) => {
  const brData = date
    .toLocaleString('pt-BR', {
      timezone: config.get('App.resources.cron.timezone'),
    })
    .split(',')[0];

  const [dd, mm, yyyy] = brData.split('/');

  return BR ? brData : [yyyy, mm, dd].join('-');
};
