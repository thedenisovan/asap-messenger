import { useEffect } from 'react';
import getPayload from '../../services/api/getPayload';
import autoSignout from '../../utils/autoSignout';
import { useNavigate } from 'react-router';
// import getData from '../../services/api/getData';
import signOut from '../../utils/signout';
import ProfileHeader from './sections/ProfileHeader';

export default function ChatPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const validatePayload = async () => {
      // If token provided after user auth is valid
      // decode it and save it's payload data in local storage
      const isPayloadAssigned = await getPayload();

      // If did getPayload failed navigate to homepage
      if (!isPayloadAssigned) {
        navigate(-1);
        signOut();
      }

      // If autSignout returns false then payload is expired
      // and removed from localstorage
      const isPayloadExp = autoSignout();

      if (!isPayloadExp) {
        signOut();
        navigate(-1);
      }

      navigate(`/chatPage/${localStorage.getItem('uid')}`);
      // getData(`chatPage/${localStorage.getItem('uid')}`);
    };

    validatePayload();
  }, [navigate]);
  return (
    <>
      <ProfileHeader />
      <button
        onClick={() => {
          signOut();
          navigate('/');
        }}
      >
        Sign out
      </button>
    </>
  );
}
