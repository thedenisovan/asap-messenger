import type ProfileData from '../../../../../types/apiData';
import DarkIcon from '../../../../../components/common/DarkIcon';
import LightIcon from '../../../../../components/common/LightIcon';
import LoadingUser from '../../../../../components/common/LoadingUser';
import lastOnline from '../../../../../utils/lastOnline';
import { useContext } from 'react';
import DashboardContext from '../../../../../context/DashboardContext';
import clearChat from '../../../../../services/api/clearChat.client';

export default function ChatHeader({
  apiData,
  isLoading,
}: {
  apiData: ProfileData | null;
  isLoading: boolean;
}) {
  const dashContext = useContext(DashboardContext);

  if (!dashContext?.socket) return null;

  return (
    <header className='p-4 border-bw-full rounded-b-md w-full flex bg-white border-b-neutral-200 dark:bg-neutral-800 dark:border-b-neutral-800'>
      {isLoading ? (
        <LoadingUser />
      ) : (
        <div className='flex justify-between w-full'>
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
          <button
            onClick={() => {
              // Clear chat
              dashContext?.setMessages([]);
              dashContext.socket.emit('clear_chat', {
                roomName: dashContext?.currentChat?.id,
              });
              clearChat(dashContext!.currentChat!.id);
            }}
          >
            <LightIcon path='m656-120-56-56 84-84-84-84 56-56 84 84 84-84 56 56-83 84 83 84-56 56-84-83-84 83Zm-176 0q-138 0-240.5-91.5T122-440h82q14 104 92.5 172T480-200q11 0 20.5-.5T520-203v81q-10 1-19.5 1.5t-20.5.5ZM120-560v-240h80v94q51-64 124.5-99T480-840q150 0 255 105t105 255h-80q0-117-81.5-198.5T480-760q-69 0-129 32t-101 88h110v80H120Zm414 190-94-94v-216h80v184l56 56-42 70Z' />
            <DarkIcon path='m656-120-56-56 84-84-84-84 56-56 84 84 84-84 56 56-83 84 83 84-56 56-84-83-84 83Zm-176 0q-138 0-240.5-91.5T122-440h82q14 104 92.5 172T480-200q11 0 20.5-.5T520-203v81q-10 1-19.5 1.5t-20.5.5ZM120-560v-240h80v94q51-64 124.5-99T480-840q150 0 255 105t105 255h-80q0-117-81.5-198.5T480-760q-69 0-129 32t-101 88h110v80H120Zm414 190-94-94v-216h80v184l56 56-42 70Z' />
          </button>
        </div>
      )}
    </header>
  );
}
