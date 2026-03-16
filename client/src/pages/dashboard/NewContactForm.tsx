import { useContext, useState } from 'react';
import DarkIcon from '../../components/common/DarkIcon';
import LightIcon from '../../components/common/LightIcon';
import DashboardContext from '../../context/DashboardContext';
import addNewContact from '../../services/api/addNewContact';

export default function NewContactForm() {
  const [email, setEmail] = useState<string>('');
  const [dialogError, setDialogError] = useState<string>('');
  const dashboard = useContext(DashboardContext);

  const clearDialog = () => {
    dashboard?.setIsBlurred(false);
    setEmail('');
    setDialogError('');
  };

  return (
    <dialog
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          clearDialog();
        }
      }}
      id='new-contact-dialog'
      className='dark:text-white  dark:bg-neutral-800 gap-4 rounded-2xl w-[90%] max-w-140 border border-gray-400 dark:border-gray-600 absolute top-[50%] left-[50%] -translate-[50%]'
    >
      <header className='px-6 py-6 border-b border-gray-300 dark:border-gray-500 flex justify-between'>
        <div className='flex gap-1 items-center'>
          <LightIcon
            width='26px'
            path='M720-400v-120H600v-80h120v-120h80v120h120v80H800v120h-80ZM247-527q-47-47-47-113t47-113q47-47 113-47t113 47q47 47 47 113t-47 113q-47 47-113 47t-113-47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm296.5-343.5Q440-607 440-640t-23.5-56.5Q393-720 360-720t-56.5 23.5Q280-673 280-640t23.5 56.5Q327-560 360-560t56.5-23.5ZM360-640Zm0 400Z'
          />
          <DarkIcon
            width='26px'
            path='M720-400v-120H600v-80h120v-120h80v120h120v80H800v120h-80ZM247-527q-47-47-47-113t47-113q47-47 113-47t113 47q47 47 47 113t-47 113q-47 47-113 47t-113-47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm296.5-343.5Q440-607 440-640t-23.5-56.5Q393-720 360-720t-56.5 23.5Q280-673 280-640t23.5 56.5Q327-560 360-560t56.5-23.5ZM360-640Zm0 400Z'
          />
          <h2 className='text-gray-700 dark:text-white font-medium text-lg'>
            Add New Contact
          </h2>
        </div>
        <button
          className='hover:cursor-pointer'
          type='button'
          command='close'
          commandfor='new-contact-dialog'
          onClick={() => {
            clearDialog();
          }}
        >
          <DarkIcon path='m336-280-56-56 144-144-144-143 56-56 144 144 143-144 56 56-144 143 144 144-56 56-143-144-144 144Z' />
          <LightIcon path='m336-280-56-56 144-144-144-143 56-56 144 144 143-144 56 56-144 143 144 144-56 56-143-144-144 144Z' />
        </button>
      </header>
      <p className='px-6 pt-6 pb-3 text-sm text-gray-700 dark:text-gray-300'>
        Enter the unique email of person you want to find and add to your
        contact's.
      </p>
      <p className='px-6 pb-3 text-red-400 list-disc'>{dialogError}</p>
      <form
        className='flex px-6 flex-col gap-4'
        onSubmit={(e) => e.preventDefault()}
      >
        <div className='flex flex-col'>
          <label htmlFor='email'>Contacts Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='p-3! dark:bg-black/30!'
            type='email'
            name='email'
            id='email'
            placeholder='e.g johnDoe@odin.com'
          />
        </div>
        <div className='grid grid-cols-2 pt-2 pb-4 gap-4'>
          <button
            className='hover:bg-black/60 dark:text-white transition-color duration-100 hover:cursor-pointer p-1 rounded-lg dark:bg-white/10 bg-black dark:border-gray-600 text-white border-gray-400 border  '
            type='button'
            command='close'
            commandfor='new-contact-dialog'
            onClick={() => {
              clearDialog();
            }}
          >
            Cancel
          </button>
          <button
            type='button'
            onClick={async () => {
              const result = await addNewContact(email);
              const dialog = document.getElementById(
                'new-contact-dialog',
              ) as HTMLDialogElement | null;

              // if result is 403 or 404 show error message eg cant add your self
              // or user not found
              if (result === 403) {
                setDialogError('Cant add your self to contacts.');
              } else if (result === 404) {
                setDialogError('Cant find user with given email.');
              } else {
                // close module and update contacts state
                dashboard?.setContactsProfile((val) => [...val, result]);
                clearDialog();
                dialog?.close();
              }
              setEmail('');
            }}
            className='hover:bg-black/10 dark:hover:bg-white/90 transition-color duration-100 hover:cursor-pointer p-1 rounded-lg dark:bg-white dark:text-black bg-gray-100 border-gray-300 border'
          >
            Find & Add
          </button>
        </div>
      </form>
    </dialog>
  );
}
