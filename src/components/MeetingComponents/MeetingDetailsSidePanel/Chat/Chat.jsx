import { BiSend } from 'react-icons/bi';
import { useChatStyles } from './Chat.styles';

export const Chat = () => {
  const data = [
    {
      ParticipantName: 'killua-san',
      id: 1,
      message: 'message..',
      timeStamp: '11:00 am'
    },
    { ParticipantName: 'killua-san0', id: 1, message: 'message - 0', timeStamp: '0 am' },

    { ParticipantName: 'killua-san1', id: 2, message: 'message - 1', timeStamp: '1 am' },
    { ParticipantName: 'killua-san2', id: 3, message: 'message - 2', timeStamp: '2 am' },
    { ParticipantName: 'killua-san3', id: 4, message: 'message - 3', timeStamp: '3 am' },
    { ParticipantName: 'killua-san4', id: 5, message: 'message - 4', timeStamp: '4 am' },
    { ParticipantName: 'killua-san5', id: 6, message: 'message - 5', timeStamp: '5 am' },
    { ParticipantName: 'killua-san6', id: 7, message: 'message - 6', timeStamp: '6 am' },
    { ParticipantName: 'killua-san7', id: 8, message: 'message - 7', timeStamp: '7 am' },
    { ParticipantName: 'killua-san8', id: 9, message: 'message - 8', timeStamp: '8 am' },
    { ParticipantName: 'killua-san9', id: 10, message: 'message - 9', timeStamp: '9 am' },
    { ParticipantName: 'killua-san10', id: 11, message: 'message - 10', timeStamp: '10 am' },
    { ParticipantName: 'killua-san11', id: 12, message: 'message - 11', timeStamp: '11 am' },
    { ParticipantName: 'killua-san12', id: 13, message: 'message - 12', timeStamp: '12 am' },
    { ParticipantName: 'toka13', id: 14, message: 'message - 13', timeStamp: '13 am' },
    { ParticipantName: 'toka14', id: 15, message: 'message - 14', timeStamp: '14 am' },
    { ParticipantName: 'toka15', id: 16, message: 'message - 15', timeStamp: '15 am' },
    { ParticipantName: 'toka16', id: 17, message: 'message - 16', timeStamp: '16 am' },
    { ParticipantName: 'toka17', id: 18, message: 'message - 17', timeStamp: '17 am' },
    { ParticipantName: 'toka18', id: 19, message: 'message - 18', timeStamp: '18 am' },
    { ParticipantName: 'toka19', id: 20, message: 'message - 19', timeStamp: '19 am' }
  ];

  const classes = useChatStyles();
  return (
    <div>
      <div className={classes.inner}>
        {data.map((msg) => (
          <div key={msg.id} className={classes.message}>
            <p className={classes.userName}>
              {msg.ParticipantName}
              <span className={classes.timeStamp}>{msg.timeStamp}</span>
            </p>
            <p className={classes.content}>{msg.message}</p>
          </div>
        ))}
      </div>
      <div className={classes.inputBox}>
        <input type='text' placeholder='Type Message here' className={classes.sentMessageInput} />
        <button aria-label='send message' className={classes.sendButton}>
          <BiSend size='24' />
        </button>
      </div>
    </div>
  );
};
