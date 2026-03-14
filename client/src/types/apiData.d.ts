export default interface ProfileData {
  profile?: {
    avatarUrl: string;
    email: string;
    id: number;
    isOnline: boolean;
    lastOnline: string;
    password: string;
    username: string;
  };
  contactsProfiles?: profile[];
}
