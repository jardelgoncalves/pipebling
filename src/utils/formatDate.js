import config from 'config';

export const formatDate = (date = new Date(), BR = false) => {
  const data = date
    .toLocaleString('pt-BR', {
      timezone: config.get('App.resources.cron.timezone'),
    })
    .split(',')[0];

  const [mm, dd, yyyy] = data.split('/');

  const addZero = (n) => (Number(n) <= 9 ? `0${n}` : n);

  return BR
    ? [addZero(dd), addZero(mm), yyyy].join('/')
    : [yyyy, addZero(mm), addZero(dd)].join('-');
};
