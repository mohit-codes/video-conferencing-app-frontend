import { createUseStyles } from 'react-jss';

export const useMeetingStyles = createUseStyles((props) => ({
  centerDiv: {
    '&:hover': { opacity: 1 },
    alignItems: 'center',
    bottom: 0,
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    fontSize: '2em',
    fontWeight: 600,
    justifyContent: 'center',
    left: 0,
    opacity: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    transition: 'all ease-in 0.2s',
    zIndex: 1
  },
  footer: {
    bottom: '0',
    position: 'fixed',
    width: '100%'
  },
  minh38: { minHeight: '38vh' },
  posRelative: { position: 'relative' },
  video: {
    borderRadius: '20px',
    width: '100%'
  },
  videoOff: {
    background: '#646363bd',
    borderRadius: '20px',
    color: 'black',
    margin: '5px',
    minHeight: '35vh',
    opacity: 1
  }
}));
