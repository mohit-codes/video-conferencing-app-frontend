import { createUseStyles } from 'react-jss';

export const useSignupStyles = createUseStyles((theme) => ({
  centerDiv: {
    display: 'grid',
    height: '100vh',
    placeItems: 'center',
    width: '100vw'
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0.5rem 1.5rem 1rem'
  },

  headRow: {
    '& h1': {
      margin: '0.5rem'
    },

    background: 'white'
  }
}));
