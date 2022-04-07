import { IoEllipsisVertical } from 'react-icons/io5';
import { FaRegUserCircle } from 'react-icons/fa';
import { useParticipantsStyles } from './Participants.styles';

export const Participants = () => {
  const data = [
    {
      email: 'ronny@gmail.com',
      id: 1234,
      name: 'ronny'
    },
    {
      email: 'mohit@gmail.com',
      id: 2,
      name: 'mohit'
    },
    {
      email: 'ashu@gmail.com',
      id: 3,
      name: 'ashu'
    },
    {
      email: 'swapnil@gmail.com',
      id: 4,
      name: 'swapnil'
    },
    { email: 'abc@gmail.com', id: 20, name: 'Mohit' },
    { email: 'abc@gmail.com', id: 21, name: 'Mohit' },
    { email: 'abc@gmail.com', id: 22, name: 'Mohit' },
    { email: 'abc@gmail.com', id: 23, name: 'Mohit' },
    { email: 'abc@gmail.com', id: 24, name: 'Mohit' },
    { email: 'abc@gmail.com', id: 25, name: 'Mohit' },
    { email: 'abc@gmail.com', id: 26, name: 'Mohit' },
    { email: 'abc@gmail.com', id: 27, name: 'Mohit' },
    { email: 'abc@gmail.com', id: 28, name: 'Mohit' },
    { email: 'abc@gmail.com', id: 29, name: 'Mohit' },
    { email: 'abc@gmail.com', id: 30, name: 'Mohit' },
    { email: 'abc@gmail.com', id: 31, name: 'Mohit' },
    { email: 'abc@gmail.com', id: 32, name: 'Mohit' },
    { email: 'abc@gmail.com', id: 33, name: 'Mohit' },
    { email: 'abc@gmail.com', id: 34, name: 'Mohit' },
    { email: 'abc@gmail.com', id: 35, name: 'Mohit' },
    { email: 'abc@gmail.com', id: 36, name: 'Mohit' },
    { email: 'abc@gmail.com', id: 37, name: 'Mohit' },
    { email: 'abc@gmail.com', id: 38, name: 'Mohit' },
    { email: 'abc@gmail.com', id: 39, name: 'Mohit' }
  ];

  const classes = useParticipantsStyles();
  return (
    <div className={classes.outer}>
      <p>{`Participants (${data.length})`}</p>
      <div className={classes.inner}>
        {data.map((participant) => (
          <div key={participant.id} className={classes.participant}>
            <FaRegUserCircle size='20' />
            <span className={classes.userName}>{participant.name}</span>
            <IoEllipsisVertical size='20' className={classes.ellipsis} />
          </div>
        ))}
      </div>
    </div>
  );
};
