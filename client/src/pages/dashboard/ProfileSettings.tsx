import DarkIcon from '../../components/common/DarkIcon';
import LightIcon from '../../components/common/LightIcon';
import DashboardContext from '../../context/DashboardContext';
import { useContext, useEffect, useState } from 'react';

export default function ProfileSettings() {
  const dashboard = useContext(DashboardContext);
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');

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
      open
      id='profile-settings-dialog'
      className='dark:text-white  dark:bg-neutral-800 gap-4 rounded-xl w-[90%] max-w-140 border border-gray-400 dark:border-gray-600 absolute top-[50%] left-[50%] -translate-[50%]'
    >
      <header className='flex justify-between p-6 border-b border-b-olive-700'>
        <h2 className='text-xl font-medium'>Edit Profile</h2>
        <button
          className='hover:cursor-pointer'
          command='close'
          commandfor='profile-settings-dialog'
          onClick={() => {
            // clearDialog();
          }}
        >
          <DarkIcon path='m336-280-56-56 144-144-144-143 56-56 144 144 143-144 56 56-144 143 144 144-56 56-143-144-144 144Z' />
          <LightIcon path='m336-280-56-56 144-144-144-143 56-56 144 144 143-144 56 56-144 143 144 144-56 56-143-144-144 144Z' />
        </button>
      </header>
      {/* Avatar image */}
      <section className='flex flex-col justify-center items-center gap-2 my-7 '>
        <div className='flex justify-center items-center bg-neutral-900 w-30 h-30 rounded-full'>
          {/* <img src="" alt="" /> */}
          AVATAR
        </div>
        <p className='text-sm text-neutral-300'>Click to change avatar photo</p>
      </section>
      <form className='m-6 px-4 py-6 rounded-xl border border-neutral-700'>
        <div className='flex flex-col gap-2'>
          <label htmlFor='email' className='font-bold!'>
            Your Email{' '}
            <span className='text-sm font-normal text-neutral-400'>
              (you can be found by this email.)
            </span>
          </label>
          <input
            value={email}
            type='email'
            id='email'
            className='w-full mb-5 bg-neutral-900! p-3!'
            readOnly
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor='username' className='font-bold!'>
            Username
          </label>
          <input
            className='w-full mb-5 bg-neutral-900! p-3!'
            type='text'
            name='username'
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      </form>
    </dialog>
  );
}
