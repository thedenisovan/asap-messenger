import { useEffect } from 'react';
import useFetchData from '../../../../../hooks/useFetchData';
import { useNavigate } from 'react-router';
import { useContext } from 'react';
import DashboardContext from '../../../../../context/DashboardContext';
import type ProfileData from '../../../../../types/apiData';

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
        <ul>
          {dashboard?.contactsProfile.length
            ? dashboard?.contactsProfile?.map((contact) => (
                <li key={contact.id} className='flex justify-between'>
                  <div>
                    <p className='font-medium'>{contact.username}</p>
                    <p className='text-xs text-neutral-800'>
                      {!contact.isOnline ||
                      new Date(Date()).getTime() -
                        new Date(contact.lastOnline).getTime() >
                        120000
                        ? 'offline'
                        : 'online'}
                    </p>
                  </div>
                  <p className='text-xs text-neutral-800'>
                    {/* {contact.lastOnline
                      .split('T')[1]
                      .split('.')[0]
                      .split(':')[0] +
                      ':' +
                      contact.lastOnline
                        .split('T')[1]
                        .split('.')[0]
                        .split(':')[1]} */}
                  </p>
                </li>
              ))
            : 'No contacts'}
        </ul>
      )}
    </div>
  );
}
