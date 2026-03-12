import isOnlineUpdate from '../../../services/api/isOnlineUpdate';
import signOut from '../../../utils/signout';
import { useNavigate, useOutletContext } from 'react-router';
import exports from '../../../utils/imports';
import LightIcon from '../../../components/common/LightIcon';
import DarkIcon from '../../../components/common/DarkIcon';

export default function ProfileDropdown({ isHidden }: { isHidden: boolean }) {
  const navigate = useNavigate();
  const { toggleGlobalTheme, globalTheme } = useOutletContext<{
    toggleGlobalTheme: () => void;
    globalTheme: string;
  }>();

  return (
    <ul
      className='absolute rounded-xl dark:bg-white/10 bg-gray-50 border border-gray-200 dark:border-gray-800 transition-transform origin-top-right duration-100 right-5 top-10 min-w-50'
      style={{ transform: isHidden ? 'scale(0)' : 'scale(1)' }}
    >
      <li className='hover:bg-gray-100 gap-4 flex cursor-pointer dark:hover:bg-gray-800/80 rounded-t-lg transition-colors duration-75 py-3 pl-4 pr-9'>
        <img
          src={exports.whiteUser}
          width={20}
          className='hidden! dark:block!'
          alt='user profile img'
        />
        <img
          src={exports.blackUser}
          width={20}
          className='block! dark:hidden!'
          alt='user profile img'
        />
        <p className='text-gray-800 dark:text-gray-200'>Profile Setting</p>
      </li>
      <li className='flex gap-3 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-800/80 transition-colors duration-75 py-3 pl-4 pr-9'>
        <LightIcon path='M720-400v-120H600v-80h120v-120h80v120h120v80H800v120h-80ZM247-527q-47-47-47-113t47-113q47-47 113-47t113 47q47 47 47 113t-47 113q-47 47-113 47t-113-47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm296.5-343.5Q440-607 440-640t-23.5-56.5Q393-720 360-720t-56.5 23.5Q280-673 280-640t23.5 56.5Q327-560 360-560t56.5-23.5ZM360-640Zm0 400Z' />
        <DarkIcon path='M720-400v-120H600v-80h120v-120h80v120h120v80H800v120h-80ZM247-527q-47-47-47-113t47-113q47-47 113-47t113 47q47 47 47 113t-47 113q-47 47-113 47t-113-47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm296.5-343.5Q440-607 440-640t-23.5-56.5Q393-720 360-720t-56.5 23.5Q280-673 280-640t23.5 56.5Q327-560 360-560t56.5-23.5ZM360-640Zm0 400Z' />

        <p className='text-gray-800 dark:text-gray-200'>New Contacts</p>
      </li>
      <li
        onClick={() => toggleGlobalTheme()}
        className='hover:bg-gray-100 gap-3 cursor-pointer flex dark:hover:bg-gray-800/80 transition-colors duration-75 py-3 pl-4 pr-9'
      >
        <LightIcon path='M440-760v-160h80v160h-80Zm266 110-55-55 112-115 56 57-113 113Zm54 210v-80h160v80H760ZM440-40v-160h80v160h-80ZM254-652 140-763l57-56 113 113-56 54Zm508 512L651-255l54-54 114 110-57 59ZM40-440v-80h160v80H40Zm157 300-56-57 112-112 29 27 29 28-114 114Zm113-170q-70-70-70-170t70-170q70-70 170-70t170 70q70 70 70 170t-70 170q-70 70-170 70t-170-70Zm283-57q47-47 47-113t-47-113q-47-47-113-47t-113 47q-47 47-47 113t47 113q47 47 113 47t113-47ZM480-480Z' />
        <DarkIcon path='M484-80q-84 0-157.5-32t-128-86.5Q144-253 112-326.5T80-484q0-146 93-257.5T410-880q-18 99 11 193.5T521-521q71 71 165.5 100T880-410q-26 144-138 237T484-80Zm0-80q88 0 163-44t118-121q-86-8-163-43.5T464-465q-61-61-97-138t-43-163q-77 43-120.5 118.5T160-484q0 135 94.5 229.5T484-160Zm-20-305Z' />

        <p className='text-gray-800 dark:text-gray-200'>
          {globalTheme === 'dark' ? 'Light' : 'Dark'} Mode
        </p>
      </li>
      <li
        onClick={() => {
          isOnlineUpdate(false);
          signOut();
          navigate('/');
        }}
        className='mt-3 hover:bg-red-100/40 cursor-pointer dark:hover:bg-red-900/20 rounded-b-lg  transition-colors duration-75 py-3 pl-4 pr-10 border-t border-gray-300 dark:border-gray-600 w-full '
      >
        <p className='text-red-500 dark:text-red-400'>Sign out</p>
      </li>
    </ul>
  );
}
