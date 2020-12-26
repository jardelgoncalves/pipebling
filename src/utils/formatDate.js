export const formatDate = (date = new Date()) => {
  const monthRef = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();
  const month = monthRef < 10 ? `0${monthRef}` : `${monthRef}`;
  const day = date.getUTCDate();

  return `${year}-${month}-${day}`;
};
