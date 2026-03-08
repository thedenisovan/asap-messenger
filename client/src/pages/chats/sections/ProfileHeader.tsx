import { useEffect } from 'react';
import useFetchData from '../../../hooks/useFetchData';
import isOnlineUpdate from '../../../services/api/isOnlineUpdate';

export default function ProfileHeader() {
  const { isLoading, serverError, apiData } = useFetchData(
    `chatPage/${localStorage.getItem('uid')}`,
  );

  // Update user last online time every 30s
  useEffect(() => {
    const interval = setInterval(() => {
      isOnlineUpdate(true);
    }, 30000);

    return () => clearInterval(interval);
  });

  return (
    <header>
      {isLoading && <h1>LOADING</h1>}
      {serverError !== null && <h1>ERROR</h1>}
      {!isLoading && apiData?.profile?.username && (
        <div>
          <h1>{apiData.profile.username}</h1>
          {/* User all ways sees his status as online */}
          <p>online</p>
        </div>
      )}
    </header>
  );
}
