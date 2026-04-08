import { useState } from 'react';
import NewContactForm from './NewContactForm';
import DashboardContext from '../../context/DashboardContext';
import ChatSection from './sections/chats/ChatSection';
import Aside from './sections/aside/Aside';
import ProfileSettings from './ProfileSettings';
import useValidatePayload from '../../hooks/useValidatePayload';
import useUpdateAfterFetch from '../../hooks/useUpdateAfterFetch';
import type { Message, Chat } from '../../types/apiData';
import { io } from 'socket.io-client';
import URL from '../../constants/constants';
import NewGroupChatForm from './NewGroupChatForm';

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
    groupChat,
    setGroupChat,
    groupError,
    groupLoading,
  } = useUpdateAfterFetch();

  // State for user header dropdown
  const [isHidden, setIsHidden] = useState<boolean>(true);
  // State for chat section dropdown
  const [isChatDropdownHidden, setIsChatDropdownHidden] =
    useState<boolean>(true);
  // Blur state for when module window is open
  const [isBlurred, setIsBlurred] = useState<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>('');
  const [directContactId, setDirectContactId] = useState<number | null>(null);

  const socket = io(URL.BASE_URL);

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
          socket,
          messages,
          setMessages,
          groupChat,
          setGroupChat,
          groupError,
          groupLoading,
          message,
          setMessage,
          isChatDropdownHidden,
          setIsChatDropdownHidden,
          directContactId,
          setDirectContactId,
        }}
      >
        <main
          className='flex  dark:bg-black/87 dark:text-white max-h-screen min-w-screen'
          onClick={() => {
            // If dropdown is not hidden clicking any where on page should
            // close dropdown
            if (!isHidden) setIsHidden(true);
            if (!isChatDropdownHidden) setIsChatDropdownHidden(true);
          }}
        >
          {/* '*:blur-xs' Blurs all children elements when blur state is set to  true */}
          <Aside />
          <ChatSection />
        </main>
        <NewContactForm />
        <ProfileSettings />
        <NewGroupChatForm />
      </DashboardContext>
    </>
  );
}
