import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import getPayload from '../services/api/getPayload';
import signOut from '../utils/signout';
import autoSignout from '../utils/autoSignout';

export default function useValidatePayload() {
  const navigate = useNavigate();

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
    };

    validate();
  }, [navigate]);
}
