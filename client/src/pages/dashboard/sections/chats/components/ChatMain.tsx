// /* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import DashboardContext from '../../../../../context/DashboardContext';
import type { Message } from '../../../../../types/apiData';

export default function ChatMain() {
  const dashContext = useContext(DashboardContext);

  useEffect(() => {
    if (!dashContext?.socket) return;

    const handler = (newMsg: Message) => {
      dashContext.setMessages((prev) => [...prev, newMsg]);
    };

    // When receive message fire handler
    dashContext.socket.on('receive_message', handler);

    // After remove it so it isn't stacking
    return () => {
      dashContext.socket.off('receive_message', handler);
    };
  }, [dashContext]);

  return (
    <main className='flex-1 h-96 relative'>
      {dashContext?.messages?.length ? (
        <ul className='flex flex-col overflow-y-auto h-full overflow-x-hidden w-full p-4 space-y-2'>
          {dashContext.messages.map((message) => (
            <li
              key={message.id}
              className={`flex ${
                message.userId === dashContext.userProfile!.id
                  ? 'justify-end'
                  : 'justify-start'
              }`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  message.userId === dashContext.userProfile!.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-black'
                }`}
              >
                {message.message}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className='absolute top-[50%] text-center left-[50%] -translate-[50%] dark:text-neutral-300'>
          No messages in current chat
        </p>
      )}
    </main>
  );
}
