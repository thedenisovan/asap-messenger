import { useContext, useEffect, useRef, useMemo } from 'react';
import DashboardContext from '../../../../../context/DashboardContext';
import type { Message } from '../../../../../types/apiData';
import GroupInfo from './GroupInfo';

export default function ChatMain() {
  const dashContext = useContext(DashboardContext);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Color palette for authors
  const colors = useMemo(
    () => [
      'hsl(210, 75%, 55%)', // blue
      'hsl(45, 80%, 60%)', // yellow
      'hsl(330, 65%, 52%)', // pink
      'hsl(120, 70%, 58%)', // green
      'hsl(15, 85%, 50%)', // red
    ],
    [],
  );

  // Map profileId to color
  function getAuthorColor(profileId: string) {
    let hash = 0;
    for (const char of profileId) {
      hash = char.charCodeAt(0) + hash * 31;
    }
    return colors[Math.abs(hash) % colors.length];
  }

  useEffect(() => {
    if (!dashContext?.socket) return;

    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });

    const handler = (newMsg: Message) => {
      dashContext.setMessages((prev) => [...prev, newMsg]);
    };

    dashContext.socket.on('receive_message', handler);

    dashContext.socket.on('chat_deleted', () => {
      dashContext.setMessages([]);
    });

    return () => {
      dashContext.socket.off('receive_message', handler);
    };
  }, [dashContext]);

  return (
    <main className='flex-1 relative'>
      {dashContext?.messages?.length ? (
        <ul className='flex flex-col max-h-[calc(100vh-152px)] h-full overflow-x-hidden w-full p-4 space-y-2'>
          {dashContext.messages.map((message) => {
            const chatters =
              dashContext.currentChat &&
              'chatters' in dashContext.currentChat &&
              dashContext.currentChat.chatters;

            let messageAuthor;
            if (chatters) {
              messageAuthor = chatters.find(
                (chatter) => chatter.profileId === message.userId,
              );
            }

            const authorColor = messageAuthor
              ? getAuthorColor(String(messageAuthor.profileId))
              : 'black';

            return (
              <li
                key={message.id}
                className={`flex ${
                  message.userId === dashContext.userProfile!.id
                    ? 'justify-end'
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
                  {messageAuthor && (
                    <p style={{ color: authorColor }} className='font-bold'>
                      {messageAuthor.profile.username}
                    </p>
                  )}
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
            );
          })}
          <div ref={chatEndRef} />
        </ul>
      ) : (
        <p className='absolute top-[50%] text-center left-[50%] -translate-[50%] dark:text-neutral-300'>
          No messages in current chat
        </p>
      )}

      {dashContext?.currentChat && 'chatters' in dashContext.currentChat && (
        <GroupInfo groupChat={dashContext!.currentChat} />
      )}
    </main>
  );
}

function displayMessageTime(text: string) {
  const today = new Date();
  const dateOfMessage = new Date(text);

  if (
    today.getDate() === dateOfMessage.getDate() &&
    today.getMonth() === dateOfMessage.getMonth() &&
    today.getFullYear() === dateOfMessage.getFullYear()
  ) {
    return dateOfMessage.toTimeString().slice(0, 5); // HH:MM
  } else if (today.getFullYear() === dateOfMessage.getFullYear()) {
    return dateOfMessage.toDateString().slice(4, 10); // Mon DD
  } else {
    return dateOfMessage.toDateString(); // full date
  }
}
