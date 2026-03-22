import { useEffect, useState } from 'react';
import getPayload from '../../services/api/getPayload';
import autoSignout from '../../utils/autoSignout';
import { useNavigate } from 'react-router';
import signOut from '../../utils/signout';
import NewContactForm from './NewContactForm';
import DashboardContext from '../../context/DashboardContext';
import ChatSection from './sections/chats/ChatSection';
import Aside from './sections/aside/Aside';
import type ProfileData from '../../types/apiData';
import ProfileSettings from './ProfileSettings';
import useFetchData from '../../hooks/useFetchData';

export default function Dashboard() {
  const navigate = useNavigate();
  const [isHidden, setIsHidden] = useState<boolean>(true);
  // Blur state for when module window is open
  const [isBlurred, setIsBlurred] = useState<boolean>(false);
  const [contactsProfile, setContactsProfile] = useState<ProfileData[] | null>(
    [],
  );
  const [userProfile, setUserProfile] = useState<ProfileData | null>(null);

  // Fetches user profile data
  const { isLoading, serverError, apiData } = useFetchData<ProfileData>(
    `dashboard/${localStorage.getItem('uid')}`,
  );

  // Fetches user contact data
  const {
    isLoading: contactLoading,
    serverError: contactError,
    apiData: contactData,
  } = useFetchData<ProfileData[]>(
    `dashboard/${localStorage.getItem('uid')}/contacts`,
  );

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

    const updateProfileInfo = () => {
      // When user signs in set state of his profile and his contacts by fetched data
      if (localStorage.getItem('uid') !== '0') {
        setUserProfile(apiData);
        setContactsProfile(contactData);
      }
    };

    updateProfileInfo();
    validatePayload();
  }, [navigate, apiData, contactData]);

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
