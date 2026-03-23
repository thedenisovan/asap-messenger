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
  //! REPLACE MESSAGES ARRAY
  id: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  messages: any[];
  users: { id: number; profileId: number }[];
}
