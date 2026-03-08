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
      className='absolute rounded-xl dark:bg-white/10 bg-gray-200 transition-transform origin-top-right duration-100 right-5 top-10 min-w-50'
      style={{ transform: isHidden ? 'scale(0)' : 'scale(1)' }}
    >
      <li className='hover:bg-gray-300 rounded-t-lg transition-colors duration-75 py-3 pl-4 pr-15'>
        <button>Profile Setting</button>
      </li>
      <li className='hover:bg-gray-300 transition-colors duration-75 py-3 pl-4 pr-15'>
        <button>New Contacts</button>
      </li>
      <li className='hover:bg-gray-300 transition-colors duration-75 py-3 pl-4 pr-15'>
        <button onClick={() => toggleGlobalTheme()}>
          {globalTheme === 'dark' ? 'Light' : 'Dark'} Mode
        </button>
      </li>
      <li className='hover:bg-gray-300 rounded-b-lg  transition-colors duration-75 py-3 pl-4 pr-15 border-t w-full '>
        <button
          onClick={() => {
            isOnlineUpdate(false);
            signOut();
            navigate('/');
          }}
        >
          Sign out
        </button>
      </li>
    </ul>
  );
}
