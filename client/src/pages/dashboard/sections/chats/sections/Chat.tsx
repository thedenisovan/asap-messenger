import useFetchData from '../../../../../hooks/useFetchData';
import { useContext } from 'react';
import DashboardContext from '../../../../../context/DashboardContext';
import type ProfileData from '../../../../../types/apiData';
import { useNavigate } from 'react-router';
import extractChatterId from '../../../../../utils/extractChatterId';
import ChatHeader from '../components/ChatHeader';
import ChatMain from '../components/ChatMain';
import ChatFooter from '../components/ChatFooter';
import type { Chat } from '../../../../../types/apiData';

export default function Chat() {
  const navigate = useNavigate();
  const dashContext = useContext(DashboardContext);

  // If user opens direct chat fetch users profile data else fetch group chat data
  const { isLoading, serverError, apiData } = useFetchData<ProfileData | Chat>(
    `${
      'chatters' in dashContext!.currentChat!
        ? `dashboard/groupChat/${dashContext?.currentChat.id}`
        : `dashboard/${extractChatterId(dashContext?.currentChat)}`
    }`,
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
