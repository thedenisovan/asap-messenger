import useFetchData from '../../../hooks/useFetchData';

export default function ProfileHeader() {
  const { isLoading, serverError, apiData } = useFetchData(
    `chatPage/${localStorage.getItem('uid')}`,
  );

  return (
    <header>
      {isLoading && <h1>LOADING</h1>}
      {serverError !== null && <h1>ERROR</h1>}
      {!isLoading && apiData && apiData.profile.username}
    </header>
  );
}
