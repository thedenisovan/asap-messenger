import { useState } from 'react';
import { useContext } from 'react';
import DashboardContext from '../../../../../context/DashboardContext';
import postNewMessage from '../../../../../services/api/postNewMessage';
import DarkIcon from '../../../../../components/common/DarkIcon';
import LightIcon from '../../../../../components/common/LightIcon';

export default function ChatFooter() {
  const [message, setMessage] = useState<string>('');
  const dashContext = useContext(DashboardContext);

  if (!dashContext?.socket) return null;

  return (
    <footer className='border-t dark:bg-neutral-900 h-20 px-10 md:px-20 bg-gray-50 border-t-neutral-100 dark:border-t-neutral-800 p-5 '>
      <form
        className=' flex justify-between gap-2'
        onSubmit={(e) => e.preventDefault()}
      >
        <button
          className={`cursor-pointer hover:bg-gray-200 dark:hover:bg-neutral-700 rounded-full w-10 h-10 flex justify-center items-center transition-colors`}
          type='button'
        >
          <LightIcon path='M720-330q0 104-73 177T470-80q-104 0-177-73t-73-177v-370q0-75 52.5-127.5T400-880q75 0 127.5 52.5T580-700v350q0 46-32 78t-78 32q-46 0-78-32t-32-78v-370h80v370q0 13 8.5 21.5T470-320q13 0 21.5-8.5T500-350v-350q-1-42-29.5-71T400-800q-42 0-71 29t-29 71v370q-1 71 49 120.5T470-160q70 0 119-49.5T640-330v-390h80v390Z' />
          <DarkIcon path='M720-330q0 104-73 177T470-80q-104 0-177-73t-73-177v-370q0-75 52.5-127.5T400-880q75 0 127.5 52.5T580-700v350q0 46-32 78t-78 32q-46 0-78-32t-32-78v-370h80v370q0 13 8.5 21.5T470-320q13 0 21.5-8.5T500-350v-350q-1-42-29.5-71T400-800q-42 0-71 29t-29 71v370q-1 71 49 120.5T470-160q70 0 119-49.5T640-330v-390h80v390Z' />
        </button>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type='text'
          name='message'
          id='message'
          placeholder='Message...'
          className='flex-1 p-2! bg-gray-100 border border-gray-200! dark:border-gray-900! dark:bg-neutral-800!'
        />
        <button
          className='cursor-pointer hover:bg-gray-200 dark:hover:bg-neutral-700 rounded-full w-10 h-10 flex justify-center items-center transition-colors'
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
          <DarkIcon path='M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z' />
          <LightIcon path='M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z' />
        </button>
      </form>
    </footer>
  );
}
