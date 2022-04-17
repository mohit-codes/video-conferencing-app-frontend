import { createUseStyles } from 'react-jss';

export const useParticipantsStyles = createUseStyles({
  avatar: {
    borderRadius: '100%',
    height: '2rem',
    width: '2rem'
  },

  ellipsis: {
    marginLeft: 'auto'
  },

  inner: {
    maxHeight: '32rem',
    overflowY: 'auto'
  },

  outer: {
    padding: '0 1rem'
  },

  participant: {
    alignItems: 'center',
    display: 'flex',
    margin: '1rem 0',
    width: '100%'
  },

  userName: {
    marginLeft: '0.6rem'
  }
});
