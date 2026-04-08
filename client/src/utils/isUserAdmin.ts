import type { Chat } from '../types/apiData';

export default function isUserAdmin(currentChat: Chat | null, userId: number) {
  let isAdmin;

  if (!currentChat || !userId) return false;

  if ('admin' in currentChat) {
    isAdmin = currentChat.admin.find((admin) => admin.profileId === userId);
  }

  return isAdmin;
}
