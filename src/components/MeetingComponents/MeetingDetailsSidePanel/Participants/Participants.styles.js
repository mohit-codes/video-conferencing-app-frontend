import { createUseStyles } from 'react-jss';

export const useParticipantsStyles = createUseStyles((props) => ({
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
    margin: '0.6rem 0',
    width: '100%'
  },
  userName: {
    marginLeft: '0.6rem'
  }
}));
