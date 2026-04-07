import type ProfileData from '../../../../../types/apiData';
import DarkIcon from '../../../../../components/common/DarkIcon';
import LightIcon from '../../../../../components/common/LightIcon';
import LoadingUser from '../../../../../components/common/LoadingUser';
import lastOnline from '../../../../../utils/lastOnline';
import { useContext } from 'react';
import DashboardContext from '../../../../../context/DashboardContext';
import type { Chat } from '../../../../../types/apiData';
import ChatDropdown from './ChatDropdown';

export default function ChatHeader({
  apiData,
  isLoading,
}: {
  apiData: ProfileData | Chat | null;
  isLoading: boolean;
}) {
  const dashContext = useContext(DashboardContext);
  // If this is direct chat avatar url will be in api data obj
  const isDirectChat = apiData && 'avatarUrl' in apiData;
  const isGroupChat = apiData && 'chatters' in apiData;

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
            {isDirectChat && apiData?.avatarUrl ? (
              ''
            ) : (
              <div className='bg-neutral-300 dark:bg-black p-3 rounded-full w-10 h-10 flex items-center justify-center'>
                <h3 className='font-bold  text-xl'>
                  {/* If direct chat display username else group name */}
                  {isDirectChat && apiData?.username
                    ? `${apiData?.username[0].toUpperCase()}`
                    : isGroupChat
                      ? `${apiData.chatName[0].toUpperCase()}`
                      : null}
                </h3>
              </div>
            )}
            <div className='flex flex-col'>
              <h2 className='font-bold'>
                {isDirectChat && apiData?.username
                  ? apiData.username
                  : isGroupChat
                    ? apiData.chatName
                    : null}
              </h2>
              <p className='text-neutral-600 dark:text-neutral-300 text-xs'>
                {/* If direct chat display users last online else how many members in group */}
                {isDirectChat && apiData?.lastOnline
                  ? lastOnline(apiData.lastOnline)
                  : isGroupChat
                    ? `Group members ${apiData.chatters.length}`
                    : null}
              </p>
            </div>
          </div>
          <button onClick={() => dashContext.setIsChatDropdownHidden(false)}>
            <LightIcon path='M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z' />
            <DarkIcon path='M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z' />
          </button>
          <ChatDropdown />
        </div>
      )}
    </header>
  );
}
