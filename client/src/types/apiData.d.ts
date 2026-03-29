export default interface ProfileData {
  avatarUrl: string;
  email: string;
  id: number;
  isOnline: boolean;
  lastOnline: string;
  password: string;
  username: string;
}

export interface CurrentChat {
  id: number;
  messages: Message[];
  users: { id: number; profileId: number }[];
}

interface Message {
  chatId: number | null;
  dateCreated: string;
  groupChatId: number | null;
  id: number;
  message: string;
  userId: number;
}
