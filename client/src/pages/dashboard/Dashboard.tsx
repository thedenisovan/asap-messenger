import { useEffect, useState } from 'react';
import getPayload from '../../services/api/getPayload';
import autoSignout from '../../utils/autoSignout';
import { useNavigate } from 'react-router';
import signOut from '../../utils/signout';
import ProfileHeader from './components/ProfileHeader';

export default function Dashboard() {
  const navigate = useNavigate();
  const [isHidden, setIsHidden] = useState<boolean>(true);

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
    <main
      onClick={() => {
        // If dropdown is not hidden clicking any where on page should
        // close dropdown
        if (!isHidden) setIsHidden(true);
      }}
    >
      <aside className='dark:bg-black/93  dark:text-white h-screen'>
        <ProfileHeader isHidden={isHidden} setIsHidden={setIsHidden} />
      </aside>
    </main>
  );
}
