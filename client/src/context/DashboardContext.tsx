import { createContext } from 'react';
import type ProfileData from '../types/apiData';
import { Socket } from 'socket.io-client';
import type { GroupChat, Chat, Message } from '../types/apiData';

type DashboardContextType = {
  isHidden: boolean;
  setIsHidden: React.Dispatch<React.SetStateAction<boolean>>;

  isChatDropdownHidden: boolean;
  setIsChatDropdownHidden: React.Dispatch<React.SetStateAction<boolean>>;

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

  currentChat: Chat | null;
  setCurrentChat: React.Dispatch<React.SetStateAction<Chat | null>>;
  socket: Socket;

  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;

  groupChat: GroupChat[];
  setGroupChat: React.Dispatch<React.SetStateAction<GroupChat[] | []>>;

  groupLoading: boolean;
  groupError: string | null;

  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
};

const DashboardContext = createContext<DashboardContextType | null>(null);

export default DashboardContext;
