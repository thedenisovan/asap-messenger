import { io } from 'socket.io-client';
import URL from '../../../../../constants/constants';
import { useEffect, useState } from 'react';

const socket = io(URL.BASE_URL);

export default function ChatFooter() {
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const handler = (msg: string) => console.log(msg);

    // When receive message fire handler
    socket.on('receive_message', handler);

    // After remove it so it isn't stacking
    return () => {
      socket.off('receive_message', handler);
    };
  }, []);

  return (
    <footer className='border-t dark:border-t-neutral-800 p-5 '>
      <form onSubmit={(e) => e.preventDefault()}>
        <button type='button'>Add</button>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type='text'
          name='message'
          id='message'
          placeholder='Message'
        />
        <button
          onClick={() => {
            socket.emit('send_message', message);

            setMessage('');
          }}
          type='button'
        >
          Send
        </button>
      </form>
    </footer>
  );
}
