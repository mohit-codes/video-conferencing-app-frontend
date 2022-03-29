import { createUseStyles } from 'react-jss';

export const useNavBarStyles = createUseStyles((theme) => ({
  line: {
    background: 'rgb(0 0 0 / 25%)',
    height: '0.1rem',
    marginLeft: '0.2rem',
    width: '90%'
  },
  logo: {
    fontSize: '1.2rem',
    fontWeight: 'bold'
  },
  nav: {
    alignItems: 'center',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.25)',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.6rem 2rem',
    position: 'relative'
  },
  popUp: {
    '&>button': {
      backgroundColor: 'transparent',
      border: 'none',
      fontSize: '0.9rem',
      outline: 'none',
      padding: '0.3rem 0.4rem',
      textAlign: 'left',
      width: '100%'
    },
    border: '2px solid black',
    borderRadius: '0.5rem',
    bottom: '-5rem',
    padding: '0.3rem 0',
    position: 'absolute',
    right: '2rem',
    transition: '.3s all ease',
    width: '8rem'
  },
  popUpButton: {
    '&>p:nth-of-type(1)': {
      marginLeft: '0.5rem'
    },
    '&>svg:nth-of-type(1)': {
      marginLeft: 'auto'
    },
    alignItems: 'center',
    backgroundColor: 'transparent',
    border: '2px solid black',
    borderRadius: '0.5rem',
    display: 'flex',
    fontSize: '1rem',
    padding: '0.3rem 0.5rem',
    width: '8rem'
  },
  userAvatar: {
    borderRadius: '100%',
    width: '1.5rem'
  }
}));
