import { useEffect, useState } from 'react';
import getPayload from '../../services/api/getPayload';
import autoSignout from '../../utils/autoSignout';
import { useNavigate } from 'react-router';
import signOut from '../../utils/signout';
import NewContactForm from './components/NewContactForm';
import DashboardContext from '../../context/DashboardContext';
import Aside from './components/sections/aside/Aside';
import ChatSection from './components/sections/chats/ChatSection';

export default function Dashboard() {
  const navigate = useNavigate();
  const [isHidden, setIsHidden] = useState<boolean>(true);
  // Blur state for when module window is open
  const [isBlurred, setIsBlurred] = useState<boolean>(false);

  useEffect(() => {
    const validatePayload = async () => {
      // If token provided after user auth is valid
      // decode it and save it's payload data in local storage
      const isPayloadAssigned = await getPayload();

      // If did getPayload failed navigate to prev page
      if (!isPayloadAssigned) {
        navigate(-1);
        signOut();
      }

      // If autoSignout returns false then payload is expired
      // and removed from localstorage
      const isPayloadExp = autoSignout();

      if (!isPayloadExp) {
        navigate(-1);
        signOut();
      }

      navigate(`/dashboard/${localStorage.getItem('uid')}`);
    };

    validatePayload();
  }, [navigate]);
  return (
    <>
      <DashboardContext
        value={{ setIsBlurred, isHidden, setIsHidden, isBlurred }}
      >
        <main
          className='flex  dark:bg-black/87 dark:text-white min-h-screen min-w-screen'
          onClick={() => {
            // If dropdown is not hidden clicking any where on page should
            // close dropdown
            if (!isHidden) setIsHidden(true);
          }}
        >
          {/* '*:blur-xs' Blurs all children elements when blur state is set to  true */}
          <Aside />
          <ChatSection />
        </main>
        <NewContactForm />
      </DashboardContext>
    </>
  );
}
