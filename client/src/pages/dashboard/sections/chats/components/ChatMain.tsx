import { useContext } from 'react';
import DashboardContext from '../../../../../context/DashboardContext';

export default function ChatMain() {
  const dashContext = useContext(DashboardContext);

  return (
    <main className='flex-1 relative'>
      {dashContext?.currentChat?.messages.length ? (
        ''
      ) : (
        <p className='absolute top-[50%] text-center left-[50%] -translate-[50%] dark:text-neutral-300'>
          No messages in current chat
        </p>
      )}
    </main>
  );
}
