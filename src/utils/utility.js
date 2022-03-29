export const toSentenceCase = (s) => s[0].toUpperCase() + s.slice(1);

export const parseNum = (val) => {
  const parsed = parseInt(val, 10);
  return isNaN(parsed) ? 0 : parsed;
};

export const copyToClipBoard = (text) => navigator.clipboard.writeText(text);
