import { createUseStyles } from 'react-jss';

export const useNewMeetingStyles = createUseStyles(() => ({
  box: {
    alignItems: 'center',
    background: 'white',
    borderRadius: '0.9375rem',
    boxShadow: '0 0.25rem 0.9375rem 0.1875rem rgb(0 0 0 / 25%)',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    height: '25rem',
    left: '19.6875rem',
    padding: '1.5rem 0',
    top: '13.4375rem',
    width: '35rem'
  },

  btn: {
    marginTop: 'auto'
  },

  org: {
    alignItems: 'center',
    display: 'flex',
    margin: '0.5rem 0'
  },

  orgList: {
    height: '15rem',
    marginTop: '1rem',
    overflowY: 'auto',
    width: '60%'
  },

  radioInputs: {
    '&>div>label': {
      marginLeft: '0.3rem',
      marginRight: '3rem'
    },

    alignItems: 'center',
    display: 'flex'
  }
}));
