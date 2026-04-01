// /* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useRef } from 'react';
import DashboardContext from '../../../../../context/DashboardContext';
import type { Message } from '../../../../../types/apiData';

export default function ChatMain() {
  const dashContext = useContext(DashboardContext);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!dashContext?.socket) return;

    // Scroll in to view when new message is sent
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });

    const handler = (newMsg: Message) => {
      dashContext.setMessages((prev) => [...prev, newMsg]);
    };

    // When receive message fire handler
    dashContext.socket.on('receive_message', handler);

    dashContext.socket.on('chat_deleted', () => {
      dashContext.setMessages([]);
    });

    // After remove it so it isn't stacking
    return () => {
      dashContext.socket.off('receive_message', handler);
    };
  }, [dashContext]);

  return (
    <main className='flex-1'>
      {dashContext?.messages?.length ? (
        <ul className='flex flex-col max-h-[calc(100vh-152px)] h-full overflow-x-hidden w-full p-4 space-y-2'>
          {dashContext.messages.map((message) => (
            <li
              key={message.id}
              className={`flex ${
                message.userId === dashContext.userProfile!.id
                  ? 'justify-end '
                  : 'justify-start'
              }`}
            >
              <div
                className={`max-w-xs wrap-break-word px-4 py-2 rounded-lg ${
                  message.userId === dashContext.userProfile!.id
                    ? 'bg-blue-500 text-white rounded-tr-none'
                    : 'bg-gray-200 text-black rounded-tl-none'
                }`}
              >
                <p>{message.message}</p>
                <span
                  className={`flex justify-end text-[10px] ${
                    message.userId === dashContext.userProfile!.id
                      ? 'text-neutral-200'
                      : 'text-neutral-700'
                  }`}
                >
                  {displayMessageTime(message.dateCreated)}
                </span>
              </div>
            </li>
          ))}
          <div ref={chatEndRef} />
        </ul>
      ) : (
        <p className='absolute top-[50%] text-center left-[50%] -translate-[50%] dark:text-neutral-300'>
          No messages in current chat
        </p>
      )}
    </main>
  );
}

function displayMessageTime(text: string) {
  const today = new Date();

  const dateOfMessage = new Date(text);

  // If message sent today display its time
  if (
    today.getDate() === dateOfMessage.getDate() &&
    today.getMonth() === dateOfMessage.getMonth() &&
    today.getFullYear() === dateOfMessage.getFullYear()
  ) {
    return (
      dateOfMessage.toTimeString().split(' ')[0].split(':')[0] +
      ':' +
      dateOfMessage.toTimeString().split(' ')[0].split(':')[1]
    );
    // Else if message is this year display date of message
  } else if (
    today.getDate() !== dateOfMessage.getDate() &&
    (today.getMonth() === dateOfMessage.getMonth() ||
      today.getMonth() !== dateOfMessage.getMonth()) &&
    today.getFullYear() === dateOfMessage.getFullYear()
  ) {
    return (
      dateOfMessage.toDateString().split(' ')[1] +
      ' ' +
      dateOfMessage.toDateString().split(' ')[2]
    );
    // Else return full date with year
  } else {
    return dateOfMessage.toDateString();
  }
}
