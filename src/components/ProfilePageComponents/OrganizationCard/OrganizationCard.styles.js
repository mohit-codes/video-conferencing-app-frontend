import { createUseStyles } from 'react-jss';

export const useOrgStyles = createUseStyles((theme) => ({
  card: {
    '& button': {
      backgroundColor: 'transparent',
      border: 'none',
      outline: 'none',
      padding: '0'
    },
    backgroundColor: 'white',
    borderRadius: '0.7rem',
    boxShadow: '0 4px 15px 3px rgb(0 0 0 / 25%)',
    display: 'flex',
    flexDirection: 'column',
    height: '18.5625rem',
    marginLeft: '2rem',
    padding: '1.5rem',
    textAlign: 'left',
    width: '20.0625rem'
  },
  member: {
    // '& > button > svg': {
    //   color: 'red !important'
    // },
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
