import type ProfileData from '../../../../../types/apiData';
import DarkIcon from '../../../../../components/common/DarkIcon';
import LightIcon from '../../../../../components/common/LightIcon';
import LoadingUser from '../../../../../components/common/LoadingUser';
import lastOnline from '../../../../../utils/lastOnline';
import { useContext } from 'react';
import DashboardContext from '../../../../../context/DashboardContext';

export default function ChatHeader({
  apiData,
  isLoading,
}: {
  apiData: ProfileData | null;
  isLoading: boolean;
}) {
  const dashContext = useContext(DashboardContext);

  return (
    <header className='p-4 border-bw-full rounded-b-md w-full flex bg-white border-b-neutral-200 dark:bg-neutral-800 dark:border-b-neutral-800'>
      {isLoading ? (
        <LoadingUser />
      ) : (
        <div className='flex items-center gap-2'>
          <button
            onClick={() => dashContext?.setIsChatOpen(false)}
            className='md:hidden'
          >
            <DarkIcon path='m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z' />
            <LightIcon path='m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z' />
          </button>
          {apiData?.avatarUrl ? (
            ''
          ) : (
            <div className='bg-neutral-300 dark:bg-black p-3 rounded-full w-10 h-10 flex items-center justify-center'>
              <h3 className='font-bold  text-xl'>
                {apiData?.username[0].toUpperCase()}
              </h3>
            </div>
          )}
          <div className='flex flex-col'>
            <h2 className='font-bold'>{apiData?.username}</h2>
            <p className='text-neutral-600 dark:text-neutral-300 text-xs'>
              {apiData?.lastOnline
                ? lastOnline(apiData.lastOnline)
                : 'Last online recently'}
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
