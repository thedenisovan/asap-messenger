import URL from '../../constants/constants';

export default async function updateProfile(
  email: string,
  username: string,
  newPassword: string,
  currentPassword: string,
) {
  const token = localStorage.getItem('token');

  try {
    const response = await fetch(
      `${URL.BASE_URL}dashboard/updateProfileInformation`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({ email, username, newPassword, currentPassword }),
      },
    );

    if (!response.ok)
      throw new Error(`Response error: ${await response.text()}`);

    const result = await response.json();

    return result;
  } catch (err: unknown) {
    if (err instanceof Error) throw new Error(`Error ${err.message}`);
    else throw new Error(`Unknown error ${err}`);
  }
}
