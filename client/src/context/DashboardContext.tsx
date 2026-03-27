import { createContext } from 'react';
import type ProfileData from '../types/apiData';
import type { CurrentChat } from '../types/apiData';
import { Socket } from 'socket.io-client';

type DashboardContextType = {
  isHidden: boolean;
  setIsHidden: React.Dispatch<React.SetStateAction<boolean>>;
  isBlurred: boolean;
  setIsBlurred: React.Dispatch<React.SetStateAction<boolean>>;
  contactsProfile: ProfileData[] | null;
  setContactsProfile: React.Dispatch<
    React.SetStateAction<ProfileData[] | null>
  >;
  userProfile: ProfileData | null;
  setUserProfile: React.Dispatch<React.SetStateAction<ProfileData | null>>;
  isLoading: boolean;
  serverError: string | null;
  apiData: ProfileData | null;
  contactLoading: boolean;
  contactError: string | null;
  contactData: ProfileData[] | null;
  isChatOpen: boolean;
  setIsChatOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentChat: CurrentChat | null;
  setCurrentChat: React.Dispatch<React.SetStateAction<CurrentChat | null>>;
  socket: Socket;
};

const DashboardContext = createContext<DashboardContextType | null>(null);

export default DashboardContext;
