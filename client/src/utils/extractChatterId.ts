import type { DirectChat } from '../types/apiData';

export default function extractChatterId(chat: DirectChat) {
  const chatterId = chat.users.filter(
    (u) => u.profileId !== +localStorage.getItem('uid')!,
  )[0].profileId;

  return chatterId;
}
