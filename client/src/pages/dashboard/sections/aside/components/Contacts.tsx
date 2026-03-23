import { useNavigate } from 'react-router';
import { useContext } from 'react';
import DashboardContext from '../../../../../context/DashboardContext';
import lastOnline from '../../../../../utils/lastOnline';
import { io } from 'socket.io-client';
import URL from '../../../../../constants/constants';
import { useEffect } from 'react';
import getChat from '../../../../../services/api/getChat';

const socket = io(URL.BASE_URL);

export default function Contacts() {
  const dashboard = useContext(DashboardContext);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on('receive_message', (data) => {
      console.log(data.msg);
    });
  }, []);

  if (dashboard?.contactError) {
    navigate('/');
  }

  return (
    <div>
      {dashboard?.contactLoading ? (
        <h1>LOADING</h1>
      ) : (
        <ul className='flex flex-col'>
          {dashboard?.contactsProfile && dashboard?.contactsProfile.length ? (
            dashboard?.contactsProfile?.map((contact) => (
              <li key={contact.id} className='flex justify-between'>
                <button
                  onClick={() => getChat(contact.id)}
                  className='p-2 cursor-pointer hover:bg-neutral-100 w-full hover:dark:bg-neutral-600 transition-colors'
                >
                  <p className='font-medium text-left'>{contact.username}</p>
                  <p className='text-xs text-left text-neutral-800 dark:text-neutral-300'>
                    {lastOnline(contact.lastOnline)}
                  </p>
                </button>
              </li>
            ))
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
