import URL from '../../constants/constants';

export default async function newGroupChat(
  members: number[],
  chatName: string,
  adminId: number,
) {
  const token = localStorage.getItem('token');

  if (!token) throw new Error('Could not extract token from local storage');

  try {
    const response = await fetch(`${URL.BASE_URL}dashboard/newGroupChat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({ members, chatName, adminId }),
    });

    if (!response.ok)
      throw new Error(`Error while fetching data ${await response.text()}`);

    const result = await response.json();

    console.log(result);

    return result;
  } catch (e) {
    if (e instanceof Error) throw new Error(`Error ${e.message}`);
    else throw new Error('Unknown error');
  }
}
