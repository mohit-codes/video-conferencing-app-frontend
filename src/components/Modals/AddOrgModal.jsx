import { FaWindowClose } from 'react-icons/fa';
import { useEffect } from 'react';
import { Card, Container, Row } from '../Layout';
import { useAuth } from '../../contexts/authContext';
import { useModalStyles } from './modal.styles';
import { globalTheme } from '../../theme';

export const AddOrgModal = ({ isOpen, close, children, maxWidth }) => {
  const {
    state: { user }
  } = useAuth();
  const classes = useModalStyles({ isOpen, maxWidth });
  const onEscape = (event) => {
    if (event.key === 'Escape') {
      close();
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', onEscape, false);
    return () => {
      document.removeEventListener('keydown', onEscape, false);
    };
  }, []);
  return (
    <div id='openModal' className={classes.modalWindow} onClick={close}>
      <Card
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Container>{children}</Container>
      </Card>
    </div>
  );
};
