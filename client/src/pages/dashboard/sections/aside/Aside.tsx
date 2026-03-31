import ProfileHeader from './components/ProfileHeader';
import DashboardContext from '../../../../context/DashboardContext';
import { useContext } from 'react';
import Contacts from './components/Contacts';

export default function Aside() {
  const dashboard = useContext(DashboardContext);

  return (
    <aside
      className={`flex-2 w-screen h-screen md:min-w-70 ${dashboard?.isChatOpen ? 'hidden md:block' : ''} md:border-r dark:border-r-neutral-900 border-r-gray-100  ${dashboard!.isBlurred ? '*:blur-sm' : ''}`}
    >
      <ProfileHeader />
      <Contacts />
    </aside>
  );
}
