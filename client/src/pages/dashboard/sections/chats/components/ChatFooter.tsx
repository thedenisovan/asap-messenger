import { useEffect, useState } from 'react';
import { useContext } from 'react';
import DashboardContext from '../../../../../context/DashboardContext';
import postNewMessage from '../../../../../services/api/postNewMessage';

export default function ChatFooter() {
  const [message, setMessage] = useState<string>('');
  const dashContext = useContext(DashboardContext);

  useEffect(() => {
    if (!dashContext?.socket) return;

    const handler = (msg: string) => console.log('Received message:', msg);

    // When receive message fire handler
    dashContext.socket.on('receive_message', handler);

    // After remove it so it isn't stacking
    return () => {
      dashContext.socket.off('receive_message', handler);
    };
  }, [dashContext?.socket]);

  if (!dashContext?.socket) return null;

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
          placeholder='Message...'
        />
        <button
          onClick={async () => {
            await postNewMessage(
              dashContext.userProfile!.id,
              dashContext.currentChat!.id,
              message,
            );
            dashContext.socket.emit('send_message', {
              roomName: dashContext?.currentChat?.id,
              message,
            });
            console.log(
              'Sent message:',
              message,
              'to room:',
              dashContext?.currentChat?.id,
            );
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
