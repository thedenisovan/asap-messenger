import ProfileHeader from './components/ProfileHeader';
import DashboardContext from '../../../../context/DashboardContext';
import { useContext } from 'react';
import Contacts from './components/Contacts';

export default function Aside() {
  const dashboard = useContext(DashboardContext);

  return (
    <aside
      className={`overflow-hidden ${dashboard?.isChatOpen ? 'hidden md:block' : ''} min-w-screen md:border-r dark:border-r-neutral-900 border-r-gray-100 md:min-w-[calc(200px+10vw)] xl:min-w-[calc(420px + 2vw)] ${dashboard!.isBlurred ? '*:blur-sm' : ''}`}
    >
      <ProfileHeader />
      <Contacts />
    </aside>
  );
}
