import isOnlineUpdate from '../../../services/api/isOnlineUpdate';
import signOut from '../../../utils/signout';
import { useNavigate, useOutletContext } from 'react-router';

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
      <li className='hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-800/80 rounded-t-lg transition-colors duration-75 py-3 pl-4 pr-15'>
        Profile Setting
      </li>
      <li className='hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-800/80 transition-colors duration-75 py-3 pl-4 pr-15'>
        New Contacts
      </li>
      <li
        onClick={() => toggleGlobalTheme()}
        className='hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-800/80 transition-colors duration-75 py-3 pl-4 pr-15'
      >
        {globalTheme === 'dark' ? 'Light' : 'Dark'} Mode
      </li>
      <li
        onClick={() => {
          isOnlineUpdate(false);
          signOut();
          navigate('/');
        }}
        className='hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-800/80 rounded-b-lg  transition-colors duration-75 py-3 pl-4 pr-15 border-t w-full '
      >
        Sign out
      </li>
    </ul>
  );
}
