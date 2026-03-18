import DarkIcon from '../../components/common/DarkIcon';
import LightIcon from '../../components/common/LightIcon';
import DashboardContext from '../../context/DashboardContext';
import { useContext, useEffect, useState } from 'react';

export default function ProfileSettings() {
  const dashboard = useContext(DashboardContext);
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  // Checks if user has made changes to his password or username if has
  // display pass confirmation input
  const [hasMadeChanges, setHasMadeChanges] = useState<boolean>(false);

  useEffect(() => {
    const updateProfileData = () => {
      if (dashboard?.apiData) {
        setUsername(dashboard?.apiData?.username);
        setEmail(dashboard?.apiData?.email);
      }
    };

    updateProfileData();
  }, [dashboard]);

  return (
    <dialog
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          dashboard?.setIsBlurred(false);
        }
      }}
      id='profile-settings-modal'
      className='dark:text-white  dark:bg-neutral-800 gap-4 rounded-xl w-[90%] max-w-140 border border-gray-400 dark:border-gray-600 absolute top-[50%] left-[50%] -translate-[50%]'
    >
      <header className='flex justify-between p-6 border-b border-b-neutral-300 dark:border-b-olive-700'>
        <h2 className='text-xl text-neutral-600 dark:text-neutral-200 font-medium'>
          Edit Profile
        </h2>
        <button
          className='hover:cursor-pointer'
          command='close'
          commandfor='profile-settings-modal'
          onClick={() => {
            dashboard?.setIsBlurred(false);
          }}
        >
          <DarkIcon path='m336-280-56-56 144-144-144-143 56-56 144 144 143-144 56 56-144 143 144 144-56 56-143-144-144 144Z' />
          <LightIcon path='m336-280-56-56 144-144-144-143 56-56 144 144 143-144 56 56-144 143 144 144-56 56-143-144-144 144Z' />
        </button>
      </header>
      {/* Avatar image */}
      <section className='flex flex-col justify-center items-center gap-2 my-7 '>
        <div className='flex justify-center items-center bg-neutral-300 dark:bg-neutral-900 w-30 h-30 rounded-full'>
          {/* <img src="" alt="" /> */}
          AVATAR
        </div>
        <p className='text-sm text-neutral-700 dark:text-neutral-300'>
          Click to change avatar photo
        </p>
      </section>
      <form className='m-6 px-4 py-6 rounded-xl border border-neutral-300 dark:border-neutral-700'>
        <div className='flex flex-col gap-2'>
          <label htmlFor='email' className='font-bold!'>
            Your Email{' '}
            <span className='text-sm font-normal text-neutral-700 dark:text-neutral-300'>
              (you can be found by this email. - can't be changed!)
            </span>
          </label>
          <input
            value={email}
            type='email'
            id='email'
            className='w-full mb-5 bg-neutral-100 dark:bg-neutral-900! p-3!'
            readOnly
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor='username' className='font-bold!'>
            Username
          </label>
          <input
            className='w-full mb-5 bg-neutral-100 dark:bg-neutral-900! p-3!'
            type='text'
            name='username'
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor='username' className='font-bold!'>
            New Password
            <span className='text-sm font-normal text-neutral-700 dark:text-neutral-300'>
              {' '}
              (6+ chars, at least one uppercase, lowercase, number and symbol.)
            </span>
          </label>
          <input
            placeholder='********'
            className='w-full mb-5 bg-neutral-100 dark:bg-neutral-900! p-3!'
            type='password'
            name='password'
            id='password'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div
          className={`flex-col gap-2  ${username === dashboard?.apiData?.username && newPassword === '' ? 'hidden' : 'flex'}`}
        >
          <label htmlFor='username' className='font-bold!'>
            Current Password
            <span className='text-sm font-normal text-neutral-700 dark:text-neutral-300'>
              {' '}
              (enter current password to save changes.)
            </span>
          </label>
          <input
            placeholder='********'
            className='w-full mb-5 bg-neutral-100 dark:bg-neutral-900! p-3!'
            type='password'
            name='password'
            id='password'
          />
        </div>
      </form>
    </dialog>
  );
}
