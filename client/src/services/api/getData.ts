import URL from '../../constants/constants';

export default async function getData(path: string) {
  const token = localStorage.getItem('token');

  if (!token) return null;

  try {
    const response = await fetch(`${URL.BASE_URL}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + token,
      },
    });

    if (!response.ok) throw new Error(`Error exit status ${response.status}`);

    const result = await response.json();

    console.log(result);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message); // Now it's safe to access .message
    } else {
      console.error('Unknown error:', error);
    }
  }
}
