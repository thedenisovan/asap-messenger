import URL from '../../constants/constants';

export default async function postNewMessage(
  userId: number | string,
  chatId: number | string,
  messageText: string,
  isGroupChat: boolean,
) {
  const token = localStorage.getItem('token');

  try {
    const response = await fetch(`${URL.BASE_URL}dashboard/postNewMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        userId,
        chatId: !isGroupChat ? chatId : null,
        groupChatId: isGroupChat ? chatId : null,
        messageText,
      }),
    });

    if (!response.ok)
      throw new Error(`Error durning fetch request: ${await response.text()}`);

    const result = await response.json();

    return result;
  } catch (error) {
    if (error instanceof Error) throw new Error(`Error: ${error.message}`);
    else throw new Error('Unknown error.');
  }
}
