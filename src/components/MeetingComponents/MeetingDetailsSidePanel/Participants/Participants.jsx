import { IoEllipsisVertical } from 'react-icons/io5';
import { FaRegUserCircle } from 'react-icons/fa';
import { useParticipantsStyles } from './Participants.styles';
import { useMeet } from '../../../../contexts';

export const Participants = () => {
  const { participants } = useMeet();

  const classes = useParticipantsStyles();
  console.log(participants);
  return (
    <div className={classes.outer}>
      <p>{`Participants (${participants.length})`}</p>
      <div className={classes.inner}>
        {participants.map((participant) => (
          <div key={participant.userID} className={classes.participant}>
            {participant?.imageUrl ? (
              <img src={participant.imageUrl} alt='avatar' className={classes.avatar} />
            ) : (
              <FaRegUserCircle size='20' />
            )}
            <span className={classes.userName}>{participant.name}</span>
            <IoEllipsisVertical size='20' className={classes.ellipsis} />
          </div>
        ))}
      </div>
    </div>
  );
};
