import { useEffect, type Dispatch, type SetStateAction } from 'react';
import useFetchData from '../../../hooks/useFetchData';
import isOnlineUpdate from '../../../services/api/isOnlineUpdate';
import exports from '../../../utils/imports';
import ProfileDropdown from './ProfileDropdown';

export default function ProfileHeader({
  isHidden,
  setIsHidden,
}: {
  isHidden: boolean;
  setIsHidden: Dispatch<SetStateAction<boolean>>;
}) {
  const { isLoading, serverError, apiData } = useFetchData(
    `chatPage/${localStorage.getItem('uid')}`,
  );

  useEffect(() => {
    // Init is online update after user signs in ad uid
    // variable updates in local storage
    setTimeout(() => {
      isOnlineUpdate(true);
    }, 1000);

    // Update user last online time every 2mins
    const interval = setInterval(() => {
      isOnlineUpdate(true);
    }, 120000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header>
      <div
        style={{
          justifyContent: isLoading ? '' : 'space-between',
          gap: isLoading ? '1rem' : '',
        }}
        className={`flex p-5`}
      >
        {serverError !== null && <h1>ERROR</h1>}
        {isLoading && !apiData?.profile ? (
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
                <h1 className='text-lg font-bold'>
                  {apiData?.profile?.username}
                </h1>
                {/* User all ways sees his status as online */}
                <p className='text-gray-600 dark:text-gray-200'>online</p>
              </div>
            </div>
            <div
              onClick={() => {
                setIsHidden((val) => !val);
              }}
              className='flex items-center relative'
            >
              <img
                className='dark:hidden! block!'
                width={25}
                src={exports.moreBlack}
                alt='default profile image'
              />
              <img
                className='hidden! dark:block!'
                width={25}
                src={exports.moreWhite}
                alt='default profile image'
              />
              <ProfileDropdown isHidden={isHidden} />
            </div>
          </>
        )}
      </div>
    </header>
  );
}
