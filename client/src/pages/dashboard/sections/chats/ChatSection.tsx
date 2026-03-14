import { useContext } from 'react';
import DashboardContext from '../../../../context/DashboardContext';

export default function ChatSection() {
  const dashboard = useContext(DashboardContext);

  return (
    <section
      className={`w-full bg-gray-50 dark:bg-black/20 ${dashboard.isBlurred ? '*:blur-xs' : ''}`}
    ></section>
  );
}
