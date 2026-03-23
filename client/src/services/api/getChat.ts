import URL from '../../constants/constants';

export default async function getChat(contactId: number | string) {
  const profileId = localStorage.getItem('uid');

  try {
    const response = await fetch(`${URL.BASE_URL}dashboard/${profileId}/chat`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify({ profileId, contactId }),
    });

    if (!response.ok) throw new Error(`Error status code: ${response.status}`);

    const result = await response.json();

    return result;
  } catch (error) {
    if (error instanceof Error)
      throw new Error(`Error message: ${error.message}`);
    else throw new Error(`Unknown error: ${String(error)}`);
  }
}
