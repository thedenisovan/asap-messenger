import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useContext } from 'react';
import { io } from 'socket.io-client';
import DashboardContext from '../../../../../context/DashboardContext';
import lastOnline from '../../../../../utils/lastOnline';
import useFetchData from '../../../../../hooks/useFetchData';
import URL from '../../../../../constants/constants';
import type ProfileData from '../../../../../types/apiData';

const socket = io(URL.BASE_URL);

export default function Contacts() {
  const { isLoading, serverError, apiData } = useFetchData<ProfileData[]>(
    `dashboard/${localStorage.getItem('uid')}/contacts`,
  );
  const dashboard = useContext(DashboardContext);
  const navigate = useNavigate();

  useEffect(() => {
    const updateContacts = async () => {
      if (apiData) dashboard?.setContactsProfile(apiData);
    };

    updateContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiData]);

  if (serverError) {
    navigate('/');
  }
  return (
    <div>
      {isLoading ? (
        <h1>LOADING</h1>
      ) : (
        <ul className='flex flex-col'>
          {dashboard?.contactsProfile.length
            ? dashboard?.contactsProfile?.map((contact) => (
                <li key={contact.id} className='flex justify-between'>
                  <button className='p-2 cursor-pointer hover:bg-neutral-100 w-full hover:dark:bg-neutral-600 transition-colors'>
                    <p className='font-medium text-left'>{contact.username}</p>
                    <p className='text-xs text-left text-neutral-800 dark:text-neutral-300'>
                      {lastOnline(contact.lastOnline)}
                    </p>
                  </button>
                </li>
              ))
            : 'No contacts'}
        </ul>
      )}
    </div>
  );
}
