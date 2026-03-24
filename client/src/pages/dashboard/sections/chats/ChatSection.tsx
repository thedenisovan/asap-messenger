import { useContext } from 'react';
import DashboardContext from '../../../../context/DashboardContext';
import Welcome from './sections/Welcome';
import Chat from './sections/Chat';

export default function ChatSection() {
  const dashboard = useContext(DashboardContext);

  return (
    <section
      className={`w-full relative bg-gray-50 dark:bg-black/20 ${dashboard!.isBlurred ? '*:blur-sm' : ''}`}
    >
      {!dashboard?.isChatOpen ? <Welcome /> : <Chat />}
    </section>
  );
}
