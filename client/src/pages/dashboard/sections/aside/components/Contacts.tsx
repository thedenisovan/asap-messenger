import { useNavigate } from 'react-router';
import { useContext } from 'react';
import DashboardContext from '../../../../../context/DashboardContext';
import lastOnline from '../../../../../utils/lastOnline';
import DarkIcon from '../../../../../components/common/DarkIcon';
import LightIcon from '../../../../../components/common/LightIcon';
import getChat from '../../../../../services/api/getChat';
import { useEffect } from 'react';

export default function Contacts() {
  const dashboard = useContext(DashboardContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (dashboard?.currentChat && dashboard.socket) {
      dashboard.socket.emit('joinRoom', dashboard.currentChat.id);
    }
  }, [dashboard]);

  if (dashboard?.contactError) {
    navigate('/');
  }

  return (
    <div className='relative z-0 h-screen'>
      {dashboard?.contactLoading || !dashboard?.contactsProfile ? (
        <div className='w-fit flex absolute top-50 right-[50%] translate-x-[50%] animate-spin'>
          <LightIcon
            width='50'
            path='M325-111.5q-73-31.5-127.5-86t-86-127.5Q80-398 80-480.5t31.5-155q31.5-72.5 86-127t127.5-86Q398-880 480-880q17 0 28.5 11.5T520-840q0 17-11.5 28.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-17 11.5-28.5T840-520q17 0 28.5 11.5T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480.5-80Q398-80 325-111.5Z'
          />
          <DarkIcon
            width='50'
            path='M325-111.5q-73-31.5-127.5-86t-86-127.5Q80-398 80-480.5t31.5-155q31.5-72.5 86-127t127.5-86Q398-880 480-880q17 0 28.5 11.5T520-840q0 17-11.5 28.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-17 11.5-28.5T840-520q17 0 28.5 11.5T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480.5-80Q398-80 325-111.5Z'
          />
        </div>
      ) : (
        <ul className='flex flex-col'>
          {dashboard.contactsProfile.length ? (
            dashboard?.contactsProfile?.map((contact) => {
              return (
                <li key={contact.id} className='flex justify-between'>
                  <button
                    onClick={async () => {
                      // Saves current chat to state
                      const chat = await getChat(contact.id);
                      dashboard.setCurrentChat(chat);
                      dashboard.setIsChatOpen(true);
                      dashboard.setMessages(chat.messages);
                    }}
                    className='p-2 cursor-pointer hover:bg-neutral-100 w-full hover:dark:bg-neutral-600 transition-colors'
                  >
                    <p className='font-medium text-left'>{contact.username}</p>
                    <p className='text-xs text-left text-neutral-800 dark:text-neutral-300'>
                      {lastOnline(contact.lastOnline)}
                    </p>
                  </button>
                </li>
              );
            })
          ) : (
            <li className='py-10 text-center text-neutral-700 dark:text-neutral-300'>
              <p>No contacts yet.</p>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
