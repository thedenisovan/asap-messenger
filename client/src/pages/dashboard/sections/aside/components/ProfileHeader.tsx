import { useEffect } from 'react';
import useFetchData from '../../../../../hooks/useFetchData';
import isOnlineUpdate from '../../../../../services/api/isOnlineUpdate';
import exports from '../../../../../utils/imports';
import ProfileDropdown from './ProfileDropdown';
import DarkIcon from '../../../../../components/common/DarkIcon';
import LightIcon from '../../../../../components/common/LightIcon';
import { useNavigate } from 'react-router';
import { useContext } from 'react';
import DashboardContext from '../../../../../context/DashboardContext';
import type ProfileData from '../../../../../types/apiData';
import URL from '../../../../../constants/constants';

export default function ProfileHeader() {
  const navigate = useNavigate();
  const { isLoading, serverError, apiData } = useFetchData<ProfileData>(
    `dashboard/${localStorage.getItem('uid')}`,
  );

  const dashContext = useContext(DashboardContext);

  useEffect(() => {
    // Init is online update after user signs in, uid
    // variable updates in local storage
    setTimeout(async () => {
      await isOnlineUpdate(true);
    }, 1000);

    // Update user last online time every 3 mins by sending request
    const updateIsOnline = setInterval(async () => {
      await isOnlineUpdate(true);

      // Fetch contacts array
      const response = await fetch(
        `${URL.BASE_URL}dashboard/${localStorage.getItem('uid')}/contacts`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        },
      );

      const result = await response.json();

      // Update contacts state to rerender they'r last online status
      dashContext?.setContactsProfile(result);
    }, 180000);

    return () => clearInterval(updateIsOnline);
  }, [dashContext]);

  if (serverError !== null) {
    navigate('/');
  }

  return (
    <header className='border-b dark:border-b-gray-700 border-b-gray-300'>
      <div
        style={{
          justifyContent: isLoading ? '' : 'space-between',
          gap: isLoading ? '1rem' : '',
        }}
        className={`flex p-3`}
      >
        {/* If data from fetch request is still loading display skeleton loader */}
        {isLoading ? (
          <>
            <div className='animate-pulse transition-none duration-900 rounded-full bg-black/70 dark:bg-white/20 h-13 w-13'></div>
            <div className='flex flex-col animate-pulse duration-900'>
              <p className='h-5 rounded-2xl w-50 mb-2  bg-black/70 dark:bg-white/20'></p>
              <p className='h-5 rounded-2xl w-70  bg-black/70 dark:bg-white/20'></p>
            </div>
          </>
        ) : (
          <>
            <div className='flex gap-2 items-center'>
              <div className='bg-black dark:bg-white w-fit p-2 rounded-full'>
                <img
                  className='dark:hidden! block!'
                  width={25}
                  src={exports.whiteUser}
                  alt='default profile image'
                />
                <img
                  className='hidden! dark:block!'
                  width={25}
                  src={exports.blackUser}
                  alt='default profile image'
                />
              </div>
              <div>
                <h1 className='text-md font-bold'>{apiData?.username}</h1>
                {/* User all ways sees his status as online */}
                <p className='text-gray-600 dark:text-gray-200'>online</p>
              </div>
            </div>
            <div
              onClick={() => {
                dashContext!.setIsHidden((val) => !val);
              }}
              className='flex items-center relative'
            >
              <DarkIcon path='M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z' />
              <LightIcon path='M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z' />
              <ProfileDropdown />
            </div>
          </>
        )}
      </div>
    </header>
  );
}
