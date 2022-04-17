import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button, NavBar } from '../../components';
import { useHomeStyles } from './Home.styles';
import { axiosRequest } from '../../utils/axiosInstance';

export const Home = () => {
  const classes = useHomeStyles();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const quality = 12;
  const joinMeet = () => {
    setLoading(true);
    axiosRequest({ method: 'GET', url: '/meet/create' }).then(({ response, error }) => {
      if (error) {
        console.log(error);
      } else {
        navigate(`/meet/${response.data.meetCode}`);
      }
    });
    setLoading(false);
  };

  return (
    <div>
      <NavBar />
      <div className={classes.background}>
        <div className={classes.box}>
          <Button width='21.125rem' disabled={loading} clickCallback={() => navigate('/new')}>
            New Meeting
          </Button>
          <p>Or</p>
          <Button width='21.125rem' clickCallback={() => navigate('/join')}>
            Join Meeting
          </Button>
        </div>
      </div>
    </div>
  );
};
