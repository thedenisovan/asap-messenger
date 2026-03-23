import { useEffect, useState } from 'react';
import type ProfileData from '../types/apiData';
import useFetchData from './useFetchData';

export default function useUpdateAfterFetch() {
  // Fetches user profile data
  const { isLoading, serverError, apiData } = useFetchData<ProfileData>(
    `dashboard/${localStorage.getItem('uid')}`,
  );
  // Fetches user contact data
  const {
    isLoading: contactLoading,
    serverError: contactError,
    apiData: contactData,
  } = useFetchData<ProfileData[]>(
    `dashboard/${localStorage.getItem('uid')}/contacts`,
  );

  // States for contact data and user profile data
  const [contactsProfile, setContactsProfile] = useState<ProfileData[] | null>(
    [],
  );
  const [userProfile, setUserProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    const updateData = () => {
      // When user signs in set state of his profile and his contacts by fetched data
      if (localStorage.getItem('uid') !== '0') {
        setUserProfile(apiData);
        setContactsProfile(contactData);

        // Sort in alphabetical order
        contactsProfile?.sort((a: ProfileData, b: ProfileData) =>
          a.username.localeCompare(b.username),
        );
      }
    };
    updateData();
  }, [apiData, contactsProfile, contactData]);

  return {
    userProfile,
    apiData,
    contactData,
    contactsProfile,
    serverError,
    isLoading,
    contactLoading,
    contactError,
    setContactsProfile,
    setUserProfile,
  };
}
