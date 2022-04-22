import { createUseStyles } from 'react-jss';

export const useModalStyles = createUseStyles({
  justifyEnd: {
    justifyContent: 'end'
  },
  modalWindow: {
    '& > div': {
      margin: (props) => (props.isOpen ? '10% auto' : '20px auto'),
      // maxWidth: (props) => props.maxWidth,
      position: 'relative',
      transition: '0.25s all ease-in'
      // width: '60%'
    },

    alignItems: 'start',
    background: 'rgb(0 0 0 / 20%)',
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    left: 0,
    opacity: (props) => (props.isOpen ? 1 : 0),
    pointerEvents: (props) => (props.isOpen ? 'auto' : 'none'),
    position: 'fixed',
    right: 0,
    top: 0,
    transition: '0.15s all ease-in',
    zIndex: 99999
  }
});
