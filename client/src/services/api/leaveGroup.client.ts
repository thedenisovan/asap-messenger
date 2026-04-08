import URL from '../../constants/constants';

export default async function leaveGroup(
  profileId: number,
  groupChatId: number | null,
  chatId: number | null,
  directContactId: number | null,
) {
  const token = localStorage.getItem('token');

  if (!token) throw new Error('No token found in localstorage');

  try {
    const response = await fetch(`${URL.BASE_URL}dashboard/leaveGroup`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({ profileId, groupChatId, chatId, directContactId }),
    });

    if (!response.ok) throw new Error(`Error: ${await response.text()}`);
  } catch (e) {
    if (e instanceof Error) throw new Error(`Error ${e.message}`);
    else throw new Error('Unknown error');
  }
}
