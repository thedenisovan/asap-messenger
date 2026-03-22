import { createContext } from 'react';
import type ProfileData from '../types/apiData';

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
};

const DashboardContext = createContext<DashboardContextType | null>(null);

export default DashboardContext;
