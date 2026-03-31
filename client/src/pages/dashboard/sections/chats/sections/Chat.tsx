import useFetchData from '../../../../../hooks/useFetchData';
import { useContext } from 'react';
import DashboardContext from '../../../../../context/DashboardContext';
import type ProfileData from '../../../../../types/apiData';
import { useNavigate } from 'react-router';
import extractChatterId from '../../../../../utils/extractChatterId';
import ChatHeader from '../components/ChatHeader';
import ChatMain from '../components/ChatMain';
import ChatFooter from '../components/ChatFooter';

export default function Chat() {
  const navigate = useNavigate();
  const dashContext = useContext(DashboardContext);
  const { isLoading, serverError, apiData } = useFetchData<ProfileData>(
    `dashboard/${extractChatterId(dashContext!.currentChat!)}`,
  );

  if (serverError !== null) navigate('/');
  return (
    <section className='min-h-screen w-full flex flex-col'>
      <ChatHeader isLoading={isLoading} apiData={apiData}></ChatHeader>
      <ChatMain />
      <ChatFooter />
    </section>
  );
}
