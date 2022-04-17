import { createUseStyles } from 'react-jss';
import ImgSrc from '../../assets/background.png';

export const useHomeStyles = createUseStyles(() => ({
  background: {
    alignItems: 'center',
    backgroundImage: `url(${ImgSrc})`,
    display: 'flex',
    height: '90vh',
    justifyContent: 'center',
    width: '100%'
  },

  box: {
    '&>p': {
      fontSize: '1rem',
      fontWeight: 'bold'
    },

    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: '0.7rem',
    boxShadow: '0 4px 15px 3px rgb(0 0 0 / 25%)',
    display: 'flex',
    flexDirection: 'column',
    height: '15.75rem',
    justifyContent: 'space-evenly',
    padding: '0.5rem',
    textAlign: 'left',
    width: '24.75rem'
  }
}));
