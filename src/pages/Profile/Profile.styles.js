import { createUseStyles } from 'react-jss';

export const useProfileStyles = createUseStyles((theme) => ({
  accountInfo: {
    '&>div:nth-of-type(1)': {
      height: '7.5rem',
      textAlign: 'center',
      width: '7.875rem'
    },
    display: 'flex',
    justifyContent: 'space-between',
    width: '25rem'
  },
  heading: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    padding: '1.5rem 0'
  },
  infoText: {
    fontSize: '1.125rem',
    fontWeight: '600'
  },
  outerContainer: {
    padding: '0 6.25rem'
  }
}));
