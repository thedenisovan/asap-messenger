import { useEffect, useState } from 'react';
import type ProfileData from '../types/apiData';
import useFetchData from './useFetchData';
import type { GroupChat } from '../types/apiData';

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

  // Fetches group chat data
  const {
    isLoading: groupLoading,
    serverError: groupError,
    apiData: groupData,
  } = useFetchData<GroupChat[]>(`dashboard/${uid}/getGroupChat`);

  // States for contact data and user profile data
  const [contactsProfile, setContactsProfile] = useState<ProfileData[] | null>(
    [],
  );
  const [userProfile, setUserProfile] = useState<ProfileData | null>(null);
  const [groupChat, setGroupChat] = useState<GroupChat[]>([]);

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
        if (groupData) {
          setGroupChat(groupData);
        }
      }
    };
    updateData();
  }, [apiData, contactData, uid, groupData]);

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
    groupChat,
    setGroupChat,
    groupData,
    groupError,
    groupLoading,
  };
}
