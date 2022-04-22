/* eslint-disable consistent-return */
export const toSentenceCase = (s) => s[0].toUpperCase() + s.slice(1);

export const parseNum = (val) => {
  const parsed = parseInt(val, 10);
  return isNaN(parsed) ? 0 : parsed;
};

export const copyToClipBoard = (text) => navigator.clipboard.writeText(text);

export const getMeetingType = (type) => {
  switch (type) {
    case 'Open to All':
      return 0;
    case 'Restricted':
      return 1;
    case 'Organization':
      return 2;
    default:
      break;
  }
};
