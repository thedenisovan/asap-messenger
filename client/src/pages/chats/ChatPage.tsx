import { useEffect } from 'react';
import getPayload from '../../services/api/getPayload';
import autoSignout from '../../utils/autoSignout';
import { useNavigate } from 'react-router';

export default function ChatPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const validatePayload = async () => {
      // If token provided after user auth is valid
      // decode it and save it's payload data in local storage
      await getPayload();

      // If did getPayload failed there will be no payload key in loc storage
      if (!localStorage.getItem('payload')) navigate('/');

      // If autSignout returns false then payload is expired
      // and removed from localstorage
      const isPayloadExp = autoSignout();

      if (!isPayloadExp) {
        navigate('/');
      }
    };

    validatePayload();
  }, [navigate]);
  return (
    <>
      <h1>This is chat page</h1>
      <button
        onClick={() => {
          localStorage.removeItem('payload');
          localStorage.removeItem('token');
          navigate('/');
        }}
      >
        Sign out
      </button>
    </>
  );
}
