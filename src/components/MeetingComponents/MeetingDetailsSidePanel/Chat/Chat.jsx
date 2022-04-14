import { useState } from 'react';
import { BiSend } from 'react-icons/bi';
import { nanoid } from 'nanoid';
import { useMeet } from '../../../../contexts';
import { useChatStyles } from './Chat.styles';

export const Chat = () => {
  const { messages, sendMessage } = useMeet();
  const [message, setMessage] = useState('');

  const send = () => {
    sendMessage(message);
    setMessage('');
  };
  const classes = useChatStyles();

  return (
    <div>
      <div className={classes.inner}>
        {messages.map((msg) => (
          <div key={nanoid(10)} className={classes.message}>
            <p className={classes.userName}>
              {msg.userData.name}
              <span className={classes.timeStamp}>{msg?.timeStamp}</span>
            </p>
            <p className={classes.content}>{msg.message}</p>
          </div>
        ))}
      </div>
      <div className={classes.inputBox}>
        <input
          type='text'
          placeholder='Type Message here'
          className={classes.sentMessageInput}
          onChange={({ target }) => setMessage(target.value)}
          value={message}
        />
        <button aria-label='send message' className={classes.sendButton} onClick={send}>
          <BiSend size='24' />
        </button>
      </div>
    </div>
  );
};
