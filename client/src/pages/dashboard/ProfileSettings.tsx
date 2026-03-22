import DarkIcon from '../../components/common/DarkIcon';
import LightIcon from '../../components/common/LightIcon';
import DashboardContext from '../../context/DashboardContext';
import { useContext, useEffect, useState } from 'react';
import updateProfile from '../../services/api/updateProfile';
import type ValidationResult from '../../types/error';

export default function ProfileSettings() {
  const dashboard = useContext(DashboardContext);
  const apiData = dashboard?.apiData;

  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [errors, setErrors] = useState<ValidationResult[] | null>(null);

  useEffect(() => {
    const updateProfileData = () => {
      if (apiData) {
        setUsername(apiData?.username);
        setEmail(apiData?.email);
      }
    };

    updateProfileData();
  }, [apiData]);

  // Clear error element and disable blur
  const closeModule = () => {
    dashboard?.setIsBlurred(false);
    setErrors(null);
  };

  const updateProfileData = async () => {
    // Update profile with given data
    const result = await updateProfile(
      email,
      username,
      newPassword,
      currentPassword,
    );

    // If error or wrong current password
    if (result.errors) {
      setErrors(result.errors);
    } else if (result.message === 'Wrong current password') {
      setErrors([
        {
          type: '',
          value: '',
          msg: result.message,
          path: '',
          location: '',
        },
      ]);

      setCurrentPassword('');
      // If all correct update data
    } else {
      closeModule();
      setCurrentPassword('');
      dashboard?.setUserProfile((val) => ({ ...val!, username }));

      const modal = document.getElementById(
        'profile-settings-modal',
      ) as HTMLDialogElement;

      modal.close();
    }
  };

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
          onClick={() => closeModule()}
        >
          <DarkIcon path='m336-280-56-56 144-144-144-143 56-56 144 144 143-144 56 56-144 143 144 144-56 56-143-144-144 144Z' />
          <LightIcon path='m336-280-56-56 144-144-144-143 56-56 144 144 143-144 56 56-144 143 144 144-56 56-143-144-144 144Z' />
        </button>
      </header>
      {/* Avatar image */}
      <section className='flex flex-col justify-center items-center gap-2 my-7 '>
        <div className='hover:cursor-pointer flex justify-center items-center bg-neutral-300 dark:bg-neutral-900 w-30 h-30 rounded-full'>
          {/* <img src="" alt="" /> */}
          AVATAR
        </div>
        <p className='text-sm text-neutral-700 dark:text-neutral-300'>
          Click to change avatar photo
        </p>
      </section>
      {/* Errors element */}
      <ul className='flex flex-col justify-center px-11.5 text-red-400'>
        {errors?.map((error) => {
          if (error.msg !== 'Invalid value')
            return (
              <li className='list-disc' key={error.msg}>
                {error.msg}
              </li>
            );
        })}
      </ul>
      <form
        onSubmit={(e) => e.preventDefault()}
        className='m-6 px-4 py-6 rounded-xl border border-neutral-300 dark:border-neutral-700'
      >
        <div className='flex flex-col gap-2'>
          <label htmlFor='email' className='font-bold!'>
            Your Email{' '}
            <span className='text-sm font-normal text-neutral-700 dark:text-neutral-300'>
              (you can be found by this email - can't be changed!)
            </span>
          </label>
          <input
            value={email}
            type='email'
            id='email'
            name='email'
            className='w-full mb-5 bg-neutral-100 dark:bg-neutral-900! p-3!'
            readOnly
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor='username' className='font-bold!'>
            Username{' '}
            <span className='text-sm font-normal text-neutral-700 dark:text-neutral-300'>
              {' '}
              (6-16 chars long)
            </span>
          </label>
          <input
            className='w-full mb-5 bg-neutral-100 dark:bg-neutral-900! p-3!'
            type='text'
            name='username'
            id='username'
            minLength={6}
            maxLength={16}
            placeholder='johnDoe123'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor='newPassword' className='font-bold!'>
            New Password
            <span className='text-sm font-normal text-neutral-700 dark:text-neutral-300'>
              {' '}
              (6+ chars, at least one uppercase, lowercase, number and symbol)
            </span>
          </label>
          <input
            placeholder='********'
            className='w-full mb-5 bg-neutral-100 dark:bg-neutral-900! p-3!'
            type='password'
            name='newPassword'
            id='newPassword'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div
          // Checks if user has made changes to his password or username if has
          // display pass confirmation input
          className={`${username === apiData?.username && newPassword === '' ? 'hidden' : 'flex flex-col gap-2'}`}
        >
          <label htmlFor='currentPassword' className='font-bold!'>
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
            name='currentPassword'
            id='currentPassword'
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>

        <div className='flex justify-between'>
          <button
            type='button'
            className='hover:cursor-pointer bg-black text-white hover:bg-neutral-700 dark:bg-neutral-500 px-4 py-1 dark:hover:bg-neutral-600 transition-colors  rounded-2xl'
            command='close'
            commandfor='profile-settings-modal'
            onClick={() => closeModule()}
          >
            Cancel
          </button>
          <button
            onClick={async () => await updateProfileData()}
            type='button'
            className='hover:cursor-pointer dark:bg-neutral-900 px-4 py-1 dark:hover:bg-neutral-700 transition-colors bg-neutral-500 text-white hover:bg-neutral-600  rounded-2xl'
          >
            Update
          </button>
        </div>
      </form>
    </dialog>
  );
}
