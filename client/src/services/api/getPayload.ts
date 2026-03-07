import URL from '../../constants/constants';

async function getPayload() {
  try {
    // Get jwt token from local storage
    const token = localStorage.getItem('token');

    if (!token) return false;

    const response = await fetch(URL.BASE_URL + 'chatPage', {
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + token,
      },
    });

    if (!response.ok) return false;

    const result = await response.json();

    // User meta data stored in local storage with key value of payload
    localStorage.setItem('payload', JSON.stringify(result));
    localStorage.setItem('uid', result.payload.profileId);

    return true;
  } catch (err) {
    throw new Error(`Error message: ${err}`);
  }
}

export default getPayload;
