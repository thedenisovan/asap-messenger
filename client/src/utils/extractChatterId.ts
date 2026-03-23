import type { CurrentChat } from '../types/apiData';

export default function extractChatterId(chat: CurrentChat) {
  const chatterId = chat.users.filter(
    (u) => u.profileId !== +localStorage.getItem('uid')!,
  )[0].profileId;

  return chatterId;
}
