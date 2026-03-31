import { useContext } from 'react';
import DashboardContext from '../../../../context/DashboardContext';
import Welcome from './sections/Welcome';
import Chat from './sections/Chat';

export default function ChatSection() {
  const dashboard = useContext(DashboardContext);

  return (
    <section
      className={`max-h-screen relative w-full md:flex ${dashboard?.isChatOpen ? 'flex' : 'hidden'} w-full bg-gray-50 dark:bg-black/20 ${dashboard!.isBlurred ? '*:blur-sm' : ''} flex-8`}
    >
      {!dashboard?.isChatOpen ? <Welcome /> : <Chat />}
    </section>
  );
}
