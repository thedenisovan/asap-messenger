import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import getPayload from '../services/api/getPayload';
import signOut from '../utils/signout';
import autoSignout from '../utils/autoSignout';
import isOnlineUpdate from '../services/api/isOnlineUpdate';

export default function useValidatePayload() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const validate = async () => {
      const isPayloadAssigned = await getPayload();

      if (!isPayloadAssigned) {
        signOut();
        navigate(-1);
        return;
      }

      const isPayloadExp = autoSignout();

      if (!isPayloadExp) {
        signOut();
        navigate(-1);
        return;
      }

      const uid = localStorage.getItem('uid');
      const expectedPath = `/dashboard/${uid}`;

      if (location.pathname !== expectedPath) {
        navigate(expectedPath);
      }
      // Dispatch event to notify uid update
      window.dispatchEvent(new CustomEvent('uidUpdated'));

      // Init is online update after user signs in, uid
      // variable updates in local storage
      await isOnlineUpdate(true);
    };

    validate();
  }, [navigate, location.pathname]);
}
