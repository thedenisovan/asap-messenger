import { useState } from 'react';
import NewContactForm from './NewContactForm';
import DashboardContext from '../../context/DashboardContext';
import ChatSection from './sections/chats/ChatSection';
import Aside from './sections/aside/Aside';
import ProfileSettings from './ProfileSettings';
import useValidatePayload from '../../hooks/useValidatePayload';
import useUpdateAfterFetch from '../../hooks/useUpdateAfterFetch';
import type { CurrentChat } from '../../types/apiData';

export default function Dashboard() {
  // Validates payload of user data stored in local storage
  useValidatePayload();
  // Updates api data fetched after user signs in to page
  const {
    userProfile,
    apiData,
    contactData,
    contactsProfile,
    serverError,
    isLoading,
    contactLoading,
    contactError,
    setContactsProfile,
    setUserProfile,
  } = useUpdateAfterFetch();

  const [isHidden, setIsHidden] = useState<boolean>(true);
  // Blur state for when module window is open
  const [isBlurred, setIsBlurred] = useState<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [currentChat, setCurrentChat] = useState<CurrentChat | null>(null);

  return (
    <>
      <DashboardContext
        value={{
          setIsBlurred,
          isHidden,
          setIsHidden,
          isBlurred,
          contactsProfile,
          setContactsProfile,
          userProfile,
          setUserProfile,
          isLoading,
          serverError,
          apiData,
          contactLoading,
          contactError,
          contactData,
          isChatOpen,
          currentChat,
          setCurrentChat,
          setIsChatOpen,
        }}
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
        <ProfileSettings />
      </DashboardContext>
    </>
  );
}
