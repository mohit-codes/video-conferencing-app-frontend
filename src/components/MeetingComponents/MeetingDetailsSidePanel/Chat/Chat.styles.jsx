import { createUseStyles } from 'react-jss';

export const useChatStyles = createUseStyles({
  content: { fontSize: '1rem' },

  inner: {
    height: '30rem',
    overflowY: 'auto',
    padding: '0 1rem'
  },

  inputBox: {
    borderTop: '2px solid lightGray',
    display: 'flex',
    padding: '1rem'
  },

  message: {
    marginBottom: '1.5rem'
  },

  sendButton: {
    backgroundColor: 'white',
    border: 'none',
    outline: 'none'
  },

  sentMessageInput: {
    backgroundColor: 'white',
    border: 'none',
    borderBottom: '2px solid gray',
    outline: 'none',
    padding: '0.2rem',
    width: '100%'
  },

  timeStamp: {
    fontSize: '0.875rem',
    fontWeight: '400',
    marginLeft: '0.6rem'
  },

  userName: {
    fontSize: '1rem',
    fontWeight: '600'
  }
});
