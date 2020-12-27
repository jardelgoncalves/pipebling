export const formatDate = (date = new Date(), BR = false) => {
  const monthRef = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();
  const month = monthRef < 10 ? `0${monthRef}` : `${monthRef}`;
  const day = date.getUTCDate();

  return BR ? `${day}/${month}/${year}` : `${year}-${month}-${day}`;
};
