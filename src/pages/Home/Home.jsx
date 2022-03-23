import { useNavigate } from 'react-router-dom';
import { Button, NavBar } from '../../components';
import { useHomeStyles } from './Home.styles';

export const Home = () => {
  const classes = useHomeStyles();
  const navigate = useNavigate();
  return (
    <div>
      <NavBar />
      <div className={classes.background}>
        <div className={classes.box}>
          <Button width='21.125rem'>New Meeting</Button>
          <p>Or</p>
          <Button width='21.125rem' clickCallback={() => navigate('/join')}>
            Join Meeting
          </Button>
        </div>
      </div>
    </div>
  );
};
