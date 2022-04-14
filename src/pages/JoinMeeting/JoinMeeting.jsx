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

  return (
    <div>
      <NavBar />
      <div className={background}>
        <div className={box}>
          <p className={heading}>Join Meeting</p>
          <InputField
            name='link'
            placeholder='Enter Link or Meeting Code'
            value={link}
            changeCallback={({ target }) => setLink(target.value)}
            type='text'
            width='21.125rem'
          />
          <Button width='21.125rem' clickCallback={() => navigate(`/meet/${link}`)}>
            Request to Join
          </Button>
        </div>
      </div>
    </div>
  );
};
