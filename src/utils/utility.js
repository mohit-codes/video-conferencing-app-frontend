export const BASE_URL = '';

export const toSentenceCase = (s) => s[0].toUpperCase() + s.slice(1);
export const parseNum = (val) => {
  const parsed = parseInt(val, 10);
  return isNaN(parsed) ? 0 : parsed;
};
