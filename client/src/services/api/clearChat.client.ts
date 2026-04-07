import URL from '../../constants/constants';

export default async function clearChat(
  chatId: number | string,
  isGroupChat: boolean,
) {
  const token = localStorage.getItem('token');

  if (!token) return `No token found`;

  try {
    const response = await fetch(`${URL.BASE_URL}dashboard/clearChat`, {
      method: 'DELETE',
      headers: {
        authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chatId: !isGroupChat ? chatId : null,
        groupChatId: isGroupChat ? chatId : null,
      }),
    });

    if (!response.ok)
      throw new Error(`Failure to fetch data ${response.status}`);

    const result = await response.json();

    return result;
  } catch (e) {
    if (e instanceof Error) throw new Error(`${e}`);
    else throw new Error(`Unknown error`);
  }
}
