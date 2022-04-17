import { createUseStyles } from 'react-jss';

export const useSidePanelStyles = createUseStyles((props) => ({
  blurTab: {
    backgroundColor: 'white',
    border: 'none',
    borderBottom: '3px solid lightGray',
    margin: '10px',
    outline: 'none',
    padding: '0.2rem',
    width: '100%'
  },

  focusedTab: {
    backgroundColor: 'white',
    border: 'none',
    borderBottom: '5px solid #0085FF',
    margin: '10px',
    outline: 'none',
    padding: '0.2rem',
    width: '100%'
  },

  heading: {
    alignItems: 'center',
    display: 'flex',
    fontSize: '1.125rem',
    fontWeight: '600',
    justifyContent: 'space-between',
    padding: '0.5rem 1rem'
  },

  outer: {
    background: 'white',
    borderRadius: '0.625rem',
    boxShadow: '0 0.25rem 1.0625rem 0.1875rem rgb(0 0 0 / 25%)',
    height: '41rem',
    padding: '0.5rem 0',
    position: 'absolute',
    right: '1rem',
    top: '0.625rem',
    width: '19.25rem',
    zIndex: '999'
  },

  tabs: {
    display: 'flex',
    marginTop: '0.6rem'
  }
}));
