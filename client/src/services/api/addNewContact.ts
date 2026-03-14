import URL from '../../constants/constants';

export default async function addNewContact(email: string) {
  const profileId = localStorage.getItem('uid');
  const token = localStorage.getItem('token');

  try {
    const response = await fetch(URL.BASE_URL + 'dashboard/addNewContact', {
      method: 'PUT',
      body: JSON.stringify({ profileId, email }),
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + token,
      },
    });

    if (!response.ok) {
      if (response.status === 404 || response.status === 403)
        return response.status;

      const text = await response.text();
      throw new Error(`Error status: ${response.status}, message: ${text}`);
    }

    // Because server does not return json don't try to extract result.json()
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    else return console.log(`Unknown error : ${error}`);
  }
}
