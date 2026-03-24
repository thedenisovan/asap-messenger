import { useEffect, useState } from 'react';
import type ProfileData from '../types/apiData';
import useFetchData from './useFetchData';

export default function useUpdateAfterFetch() {
  const [uid, setUid] = useState(localStorage.getItem('uid'));

  // Fetches user profile data
  const { isLoading, serverError, apiData } = useFetchData<ProfileData>(
    `dashboard/${uid}`,
  );
  // Fetches user contact data
  const {
    isLoading: contactLoading,
    serverError: contactError,
    apiData: contactData,
  } = useFetchData<ProfileData[]>(`dashboard/${uid}/contacts`);

  // States for contact data and user profile data
  const [contactsProfile, setContactsProfile] = useState<ProfileData[] | null>(
    [],
  );
  const [userProfile, setUserProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    const checkUid = () => {
      const currentUid = localStorage.getItem('uid');
      if (currentUid !== uid) {
        setUid(currentUid);
      }
    };

    checkUid();

    const handleUidUpdate = () => {
      checkUid();
    };

    window.addEventListener('uidUpdated', handleUidUpdate);

    return () => {
      window.removeEventListener('uidUpdated', handleUidUpdate);
    };
  }, [uid]);

  useEffect(() => {
    const updateData = () => {
      // When user signs in set state of his profile and his contacts by fetched data
      if (uid && uid !== '0') {
        setUserProfile(apiData);
        // Sort contacts by oldest first
        const sortedContacts = contactData
          ? [...contactData].sort(
              (a: ProfileData, b: ProfileData) => a.id - b.id,
            )
          : null;
        setContactsProfile(sortedContacts);
      }
    };
    updateData();
  }, [apiData, contactData, uid]);

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
