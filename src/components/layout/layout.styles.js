import { createUseStyles } from 'react-jss';
import { parseNum } from '../../utils/utility';

const minWidth1200 = {
  '@media (min-width:1200px)': {
    'max-width': '1140px'
  }
};

const minWidth992 = {
  '@media (min-width: 992px)': {
    'max-width': '960px'
  }
};

const minWidth768 = {
  '@media (min-width: 768px)': {
    'max-width': '720px'
  }
};
const minWidth576 = {
  '@media (min-width: 576px)': {
    'max-width': '540px'
  }
};
const baseContainer = {
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingLeft: '1.5rem',
  paddingRight: '1.5rem',
  width: '100%'
};

const colCreater = (type, props) => {
  const style = {
    flex: props?.[type] === true ? '1 0' : '0 0 auto'
  };
  if (props?.[type] === 'auto') {
    style.width = 'auto';
  } else {
    const span = parseNum(props?.[type]);
    if (span !== 0) {
      style.width = `${(100 / 12) * span}%`;
    }
  }
  return style;
};

export const useLayoutStyles = createUseStyles((props) => ({
  '@media (min-width: 10px)': { colXS: colCreater('xs', props) },
  '@media (min-width: 576px)': { colSM: colCreater('sm', props) },
  '@media (min-width: 768px)': { colMD: colCreater('md', props) },
  '@media (min-width: 992px)': { colLG: colCreater('lg', props) },
  '@media (min-width: 1200px)': { colXL: colCreater('xl', props) },
  '@media (min-width: 1400px)': { colXXL: colCreater('xl', props) },
  col: { flex: '1 0' },
  colLG: {},
  colMD: {},
  colSM: {},
  colXL: {},
  colXS: {},
  colXXL: {},

  container: {
    extend: [baseContainer, minWidth576, minWidth768, minWidth992, minWidth1200]
  },

  containerFluid: {
    extend: [baseContainer]
  },

  containerLG: {
    extend: [baseContainer, minWidth992, minWidth1200]
  },

  containerMD: {
    extend: [baseContainer, minWidth768, minWidth992, minWidth1200]
  },

  containerSM: {
    extend: [baseContainer, minWidth576, minWidth768, minWidth992, minWidth1200]
  },

  containerXL: {
    extend: [baseContainer, minWidth1200]
  },

  row: {
    '& > *': {
      flexShrink: 0,
      marginTop: '0',
      maxWidth: '100%',
      paddingLeft: '0.5rem',
      paddingRight: '0.5rem',
      width: '100%'
    },

    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: '-0.5rem',
    marginRight: '-0.5rem',
    marginTop: '0.5rem'
  }
}));
