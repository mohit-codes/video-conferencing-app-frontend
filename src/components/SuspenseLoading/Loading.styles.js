import { createUseStyles } from 'react-jss';

export const useLoadingStyles = createUseStyles(() => ({
  container: {
    alignItems: 'center',
    backgroundBlendMode: 'saturation',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    justifyContent: 'center',
    width: '100vw'
  },
  text: {
    fontSize: '1rem',
    fontWeight: '500',
    letterSpacing: '0.2rem',
    marginTop: '0.5rem'
  }
}));
