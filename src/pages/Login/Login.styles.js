import { createUseStyles } from 'react-jss';
import ImgSrc from '../../assets/background.png';

export const useLoginStyles = createUseStyles(() => ({
  background: {
    backgroundImage: `url(${ImgSrc})`,
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    width: '100%'
  },

  heading: {
    backgroundColor: 'white',
    fontSize: '2.5rem',
    textAlign: 'center'
  },

  line: {
    background: 'rgb(0 0 0 / 25%)',
    height: '0.1rem',
    margin: '1.5rem 0 1rem',
    width: '20rem'
  },

  loginBox: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: '0.7rem',
    boxShadow: '0 4px 15px 3px rgb(0 0 0 / 25%)',
    display: 'flex',
    flexDirection: 'column',
    height: '25rem',
    padding: '0.5rem',
    textAlign: 'left',
    width: '24rem'
  },

  orSeparator: {
    margin: '0.5rem 0'
  },

  subHeading: {
    fontSize: '1rem',
    fontWeight: 'bold',
    marginTop: '1rem',
    textAlign: 'center'
  }
}));
