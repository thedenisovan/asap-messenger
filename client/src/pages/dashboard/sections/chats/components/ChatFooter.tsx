import { useState } from 'react';
import { useContext } from 'react';
import DashboardContext from '../../../../../context/DashboardContext';
import postNewMessage from '../../../../../services/api/postNewMessage';

export default function ChatFooter() {
  const [message, setMessage] = useState<string>('');
  const dashContext = useContext(DashboardContext);

  if (!dashContext?.socket) return null;

  return (
    <footer className='border-t fixed w-full -bottom-1 dark:bg-neutral-800 bg-white border-t-neutral-100 dark:border-t-neutral-800 p-5 '>
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
          className='lg:absolute lg:right-100'
          onClick={async () => {
            const newMsg = await postNewMessage(
              dashContext.userProfile!.id,
              dashContext.currentChat!.id,
              message,
            );
            dashContext.socket.emit('send_message', {
              roomName: dashContext?.currentChat?.id,
              newMsg,
            });
            console.log(
              'Sent message:',
              newMsg,
              'to room:',
              dashContext?.currentChat?.id,
            );
            setMessage('');

            dashContext.setMessages((prev) => [...prev, newMsg]);
          }}
          type='button'
        >
          Send
        </button>
      </form>
    </footer>
  );
}
