import { createUseStyles } from 'react-jss';

export const useOrgStyles = createUseStyles((theme) => ({
  card: {
    '& button': {
      backgroundColor: 'transparent',
      border: 'none',
      outline: 'none',
      padding: '0'
    },

    height: '18rem',
    padding: '1.5rem'
  },

  member: {
    display: 'flex',
    fontSize: '.875rem',
    fontWeight: '500',
    justifyContent: 'space-between',
    margin: '.625rem 0'
  },

  members: {
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto'
  },
  title: {
    display: 'flex',
    fontSize: '1.125rem',
    fontWeight: '500',
    justifyContent: 'space-between',
    marginBottom: '.5rem'
  }
}));
