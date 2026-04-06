import { useState, useContext } from 'react';
import DarkIcon from '../../components/common/DarkIcon';
import LightIcon from '../../components/common/LightIcon';
import DashboardContext from '../../context/DashboardContext';
import newGroupChat from '../../services/api/newGroupChat.client';

export default function NewGroupChatForm() {
  const [groupName, setGroupName] = useState<string>('');
  const [groupMembers, setGroupMembers] = useState<number[]>([]);
  const dashContext = useContext(DashboardContext);

  const clearDialog = () => {
    setGroupMembers([]);
    setGroupName('');
    dashContext?.setIsBlurred(false);
  };

  return (
    <dialog
      id='new-group-dialog'
      className='dark:text-white  dark:bg-neutral-800 gap-4 rounded-2xl w-[90%] max-w-140 border border-gray-400 dark:border-gray-600 absolute top-[50%] left-[50%] -translate-[50%]'
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          clearDialog();
        }
      }}
    >
      <header className='flex  justify-between px-6 py-3'>
        <div className='flex items-center gap-2'>
          <LightIcon
            width='20'
            path='M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM247-527q-47-47-47-113t47-113q47-47 113-47t113 47q47 47 47 113t-47 113q-47 47-113 47t-113-47Zm466 0q-47 47-113 47-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113q0 66-47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm296.5-343.5Q440-607 440-640t-23.5-56.5Q393-720 360-720t-56.5 23.5Q280-673 280-640t23.5 56.5Q327-560 360-560t56.5-23.5ZM360-240Zm0-400Z'
          />
          <DarkIcon
            width='20'
            path='M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM247-527q-47-47-47-113t47-113q47-47 113-47t113 47q47 47 47 113t-47 113q-47 47-113 47t-113-47Zm466 0q-47 47-113 47-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113q0 66-47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm296.5-343.5Q440-607 440-640t-23.5-56.5Q393-720 360-720t-56.5 23.5Q280-673 280-640t23.5 56.5Q327-560 360-560t56.5-23.5ZM360-240Zm0-400Z'
          />
          <h2 className='text-lg'>Create New Group</h2>
        </div>
        <button
          command='close'
          commandfor='new-group-dialog'
          onClick={() => clearDialog()}
        >
          <LightIcon path='m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z' />
          <DarkIcon path='m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z' />
        </button>
      </header>
      <form className='px-6 py-3' onSubmit={(e) => e.preventDefault()}>
        <div className='flex flex-col gap-1'>
          <label htmlFor='group-name'>Group Name</label>
          <input
            type='text'
            name='groupName'
            id='group-name'
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder='e.g Family, Work Team, Friends'
          />
        </div>
        <div className='border max-h-100 overflow-auto mt-5 mb-5 rounded-2xl border-neutral-300 dark:border-neutral-700'>
          {dashContext?.contactsProfile?.map((contact, idx) => (
            <div
              key={contact.id}
              className={`p-4 flex w-full ${dashContext.contactsProfile?.length && idx !== dashContext.contactsProfile?.length - 1 ? 'border-b border-b-neutral-300' : ''}`}
            >
              <label
                className='flex flex-1 items-center gap-2'
                htmlFor={`contact-${contact.id}`}
              >
                <div className='dark:bg-neutral-700 bg-neutral-200 flex justify-center items-center w-10 h-10 p-2 rounded-full'>
                  {contact.username[0]}
                </div>
                <div className='flex flex-col'>
                  <div className='font-medium text-lg'>{contact.username}</div>
                  <div className='text-neutral-700 text-sm dark:text-neutral-300'>
                    {contact.email}
                  </div>
                </div>
              </label>
              <input
                type='checkbox'
                className='w-4'
                name={`${contact.id}`}
                // If groupMembers state array includes contact id it is checked
                checked={groupMembers.includes(contact.id)}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.checked) {
                    setGroupMembers((val) => [...val, contact.id]);
                  } else {
                    setGroupMembers(
                      groupMembers.filter(
                        (memberId) => memberId !== contact.id,
                      ),
                    );
                  }
                }}
                id={`contact-${contact.id}`}
              />
            </div>
          ))}
        </div>

        <div className='grid grid-cols-2 mb-4 gap-4'>
          <button
            className='hover:bg-black/60 dark:text-white transition-color duration-100 hover:cursor-pointer p-1 rounded-lg dark:bg-white/10 bg-black dark:border-gray-600 text-white border-gray-400 border  '
            type='button'
            command='close'
            commandfor='new-group-dialog'
            onClick={() => {
              clearDialog();
            }}
          >
            Cancel
          </button>
          <button
            type='button'
            command='close'
            onClick={async () => {
              if (dashContext?.userProfile) {
                const newChat = await newGroupChat(
                  groupMembers,
                  groupName,
                  dashContext?.userProfile.id,
                );
                clearDialog();
                dashContext.setGroupChat((prev) => [...prev, newChat]);
              }
            }}
            commandfor='new-group-dialog'
            className='hover:bg-black/10 disabled:cursor-not-allowed dark:hover:bg-white/90 transition-color duration-100 hover:cursor-pointer p-1 rounded-lg dark:bg-white dark:text-black bg-gray-100 border-gray-300 border'
          >
            Create Group
          </button>
        </div>
      </form>
    </dialog>
  );
}
