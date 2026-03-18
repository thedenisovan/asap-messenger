import { useEffect } from 'react';
import useFetchData from '../../../../../hooks/useFetchData';
import { useNavigate } from 'react-router';
import { useContext } from 'react';
import DashboardContext from '../../../../../context/DashboardContext';
import type ProfileData from '../../../../../types/apiData';
import lastOnline from '../../../../../utils/lastOnline';

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
    <div className='p-3'>
      {isLoading ? (
        <h1>LOADING</h1>
      ) : (
        <ul className='flex flex-col gap-2'>
          {dashboard?.contactsProfile.length
            ? dashboard?.contactsProfile?.map((contact) => (
                <li key={contact.id} className='flex justify-between'>
                  <div>
                    <p className='font-medium'>{contact.username}</p>
                    <p className='text-xs text-neutral-800 dark:text-neutral-300'>
                      {lastOnline(contact.lastOnline)}
                    </p>
                  </div>
                </li>
              ))
            : 'No contacts'}
        </ul>
      )}
    </div>
  );
}
