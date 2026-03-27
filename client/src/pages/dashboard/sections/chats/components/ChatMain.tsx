import { useContext } from 'react';
import DashboardContext from '../../../../../context/DashboardContext';

export default function ChatMain() {
  const dashContext = useContext(DashboardContext);

  return (
    <main className='flex-1 relative'>
      {dashContext?.currentChat?.messages.length ? (
        <ul className='flex flex-col w-full p-4 space-y-2'>
          {dashContext.currentChat.messages.map((message) => (
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
