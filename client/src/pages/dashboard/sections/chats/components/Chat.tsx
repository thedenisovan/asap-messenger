import useFetchData from '../../../../../hooks/useFetchData';
import { useContext } from 'react';
import DashboardContext from '../../../../../context/DashboardContext';
import type ProfileData from '../../../../../types/apiData';
import { useNavigate } from 'react-router';
import extractChatterId from '../../../../../utils/extractChatterId';
import lastOnline from '../../../../../utils/lastOnline';
import LoadingUser from '../../../../../components/common/LoadingUser';

export default function Chat() {
  const navigate = useNavigate();
  const dashContext = useContext(DashboardContext);
  const { isLoading, serverError, apiData } = useFetchData<ProfileData>(
    `dashboard/${extractChatterId(dashContext!.currentChat!)}`,
  );

  if (serverError !== null) navigate('/');
  return (
    <section>
      <ChatHeader isLoading={isLoading} apiData={apiData}></ChatHeader>
    </section>
  );
}

function ChatHeader({
  apiData,
  isLoading,
}: {
  apiData: ProfileData | null;
  isLoading: boolean;
}) {
  return (
    <header className='p-4 border-b flex bg-white border-b-neutral-200 dark:bg-neutral-800 dark:border-b-neutral-800'>
      {isLoading ? (
        <LoadingUser />
      ) : (
        <div className='flex items-center gap-2'>
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
