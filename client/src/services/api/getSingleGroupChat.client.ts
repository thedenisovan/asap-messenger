import URL from '../../constants/constants';

export default async function getSingleGroupChat(chatId: number) {
  const token = localStorage.getItem('token');

  if (!token) throw new Error('Could not get token from local storage');

  try {
    const response = await fetch(
      `${URL.BASE_URL}dashboard/groupChat/${chatId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + token,
        },
      },
    );

    if (!response.ok) throw new Error(`${await response.text()}`);

    const result = await response.json();

    return result;
  } catch (e) {
    if (e instanceof Error) throw new Error(`${e.message}`);
  }
}
