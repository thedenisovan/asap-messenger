import { useEffect } from 'react';
import getPayload from '../../services/api/getPayload';
import autoSignout from '../../utils/autoSignout';
import { useNavigate } from 'react-router';
import signOut from '../../utils/signout';
import ProfileHeader from './sections/ProfileHeader';

export default function ChatPage() {
  const navigate = useNavigate();

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

      navigate(`/chatPage/${localStorage.getItem('uid')}`);
    };

    validatePayload();
  }, [navigate]);
  return (
    <div className='dark:bg-gray-950 dark:text-white h-screen'>
      <ProfileHeader />
    </div>
  );
}
