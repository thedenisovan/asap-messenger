import { useContext } from 'react';
import type { GroupChat } from '../../../../../types/apiData';
import DashboardContext from '../../../../../context/DashboardContext';
import lastOnline from '../../../../../utils/lastOnline';
import LightIcon from '../../../../../components/common/LightIcon';
import DarkIcon from '../../../../../components/common/DarkIcon';

export default function GroupInfo({ groupChat }: { groupChat: GroupChat }) {
  const dashContext = useContext(DashboardContext);

  return (
    <dialog
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          dashContext?.setIsBlurred(false);
        }
      }}
      id='group-info-dialog'
      className='py-4 max-h-150 overflow-auto dark:text-white dark:bg-neutral-800 flex-col rounded-2xl w-[90%] max-w-140 border border-gray-400 dark:border-gray-600 absolute top-[50%] left-[50%] -translate-[50%]'
    >
      <header className='flex justify-between border-b border-b-neutral-300 dark:border-b-neutral-700 px-6 py-3'>
        <div>
          <h2 className='font-bold text-xl'>{groupChat.chatName}</h2>
          <p className='text-sm text-neutral-700 dark:text-neutral-300'>
            {groupChat.chatters.length} members
          </p>
        </div>
        <button
          onClick={() => dashContext?.setIsBlurred(false)}
          commandfor='group-info-dialog'
          command='close'
        >
          <LightIcon path='m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z' />
          <DarkIcon path='m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z' />
        </button>
      </header>
      <p className='px-5 pt-5 text-sm font-medium pb-3 text-neutral-700 dark:text-neutral-300'>
        PARTICIPANTS
      </p>
      <ul className='flex flex-col gap-3'>
        {groupChat.chatters.map((chatter) => {
          return (
            <li
              key={chatter.profile.id}
              className='flex px-4 w-full items-center gap-1'
            >
              <div className='dark:bg-neutral-900 bg-neutral-200 font-bold dark:text-white p-2 rounded-full w-10 h-10 flex items-center justify-center'>
                <p>{chatter.profile.username[0].toUpperCase()}</p>
              </div>
              <div>
                <div className='flex justify-between '>
                  {chatter.profileId === dashContext!.userProfile!.id ? (
                    <p>
                      {chatter.profile.username}{' '}
                      <span className='font-bold text-green-600 dark:text-green-300'>
                        (You)
                      </span>
                    </p>
                  ) : (
                    chatter.profile.username
                  )}
                  <p>
                    {groupChat.admin.find(
                      (adm) => adm.profileId === chatter.profileId,
                    ) && (
                      <span className='bg-green-300 text-black px-2 ml-2 font-bold rounded-md'>
                        Admin
                      </span>
                    )}
                  </p>
                </div>
                <p className='text-sm text-neutral-700 dark:text-neutral-300'>
                  {lastOnline(chatter.profile.lastOnline)}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </dialog>
  );
}
