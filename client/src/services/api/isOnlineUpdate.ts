import URL from '../../constants/constants';

export default async function isOnlineUpdate(isOnline: boolean) {
  try {
    const response = await fetch(`${URL.BASE_URL}chatPage/isOnlineUpdate`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify({
        profileId: localStorage.getItem('uid'),
        isOnline,
      }),
    });

    if (!response.ok)
      throw new Error(`Error exit status code: ${response.status}`);
  } catch (error) {
    if (error instanceof Error)
      throw new Error(`Error status: ${error.message}`);
    else throw new Error(`Unknown error ${String(error)}`);
  }
}
