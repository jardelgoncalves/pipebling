import config from 'config';

export const formatDate = (date = new Date(), BR = false) => {
  const brData = date
    .toLocaleString('pt-BR', {
      timezone: config.get('App.resources.cron.timezone'),
    })
    .split(',')[0];

  const [dd, mm, yyyy] = brData.split('/');

  const addZero = (n) => (n <= 9 ? `0${n}` : n);

  return BR ? brData : [yyyy, addZero(mm), addZero(dd)].join('-');
};
