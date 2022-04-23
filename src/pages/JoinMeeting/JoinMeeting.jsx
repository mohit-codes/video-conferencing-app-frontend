import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, InputField, NavBar } from '../../components';
import { useHomeStyles } from '../Home';
import { useJoinMeetingStyles } from './JoinMeeting.styles';

export const JoinMeeting = () => {
  const { background, box } = useHomeStyles();
  const { heading } = useJoinMeetingStyles();
  const navigate = useNavigate();
  const [link, setLink] = useState('');
  const [error, setError] = useState(null);

  const joinMeetHandler = () => {
    setError(null);
    if (link.trim().length === 9) {
      navigate(`/meet/${link}`);
    } else {
      setError('Invalid Meeting Code');
    }
  };

  return (
    <div>
      <NavBar />
      <div className={background}>
        <div className={box}>
          <p className={heading}>Join Meeting</p>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <InputField
            name='link'
            placeholder='Enter Meeting Code'
            value={link}
            changeCallback={({ target }) => setLink(target.value)}
            type='text'
            width='21.125rem'
          />
          <Button width='21.125rem' clickCallback={joinMeetHandler}>
            Request to Join
          </Button>
        </div>
      </div>
    </div>
  );
};
