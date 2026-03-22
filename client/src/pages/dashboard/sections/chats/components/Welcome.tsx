import { useContext } from 'react';
import DashboardContext from '../../../../../context/DashboardContext';

export default function Welcome() {
  const dashContext = useContext(DashboardContext);

  return (
    <div className='absolute flex flex-col gap-3 items-center text-center top-[30%] right-[50%] translate-[50%]'>
      <div className='bg-neutral-200 dark:bg-neutral-700 border-neutral-300 border dark:border-neutral-500 p-4 rounded-full'>
        <div className='text-6xl'>&#128075;</div>
      </div>
      <h2 className='text-2xl font-bold'>Welcome to .asap Messenger</h2>
      <p className='max-w-100 text-neutral-700 dark:text-neutral-300'>
        Select a chat to start messaging or add a new contact using their email
        address.
      </p>
      <button
        onClick={() => dashContext!.setIsBlurred(true)}
        command='show-modal'
        commandfor='new-contact-dialog'
        className='dark:bg-white bg-black text-white hover:bg-neutral-700 dark:text-black py-2 px-4 rounded-3xl font-medium! transition-colors dark:hover:bg-neutral-200 text-lg!'
      >
        Add Contact
      </button>
    </div>
  );
}
