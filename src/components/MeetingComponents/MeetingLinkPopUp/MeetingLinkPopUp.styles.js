import { createUseStyles } from 'react-jss';

export const usePopUpStyles = createUseStyles((props) => ({
  heading: {
    fontSize: '1.5rem',
    fontWeight: '600'
  },

  linkBox: {
    alignItems: 'center',
    background: '#EEE',
    border: '0.0625rem solid black',
    borderRadius: '0.25rem',
    display: 'flex',
    fontSize: '0.8rem',
    fontWeight: '500',
    height: '2.5rem',
    justifyContent: 'space-between',
    letterSpacing: '0.0625rem',
    margin: '0.5rem 0',
    width: '15.625rem'
  },

  popUp: {
    '&>p:nth-of-type(2)': {
      margin: '0.8rem 0'
    },

    background: 'white',
    borderRadius: '0.9375rem',
    boxShadow: '0 0.25rem 0.75rem 0.3125rem rgb(0 0 0 / 25%)',
    height: '16.8125rem',
    justifyContent: 'center',
    left: '3.5rem',
    padding: '1.5rem',
    position: 'absolute',
    top: '4rem',
    width: '18.3125rem'
  }
}));
