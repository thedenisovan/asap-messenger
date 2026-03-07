async function getPayload() {
  try {
    // Get jwt token from local storage
    const token = localStorage.getItem('token');

    const response = await fetch('http://localhost:8080/chatPage', {
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + token,
      },
    });

    if (!response.ok)
      throw new Error(`Fetch failed on response status: ${response.status}`);

    const result = await response.json();

    // User meta data stored in local storage with key value of payload
    localStorage.setItem('payload', JSON.stringify(result));
  } catch (err) {
    throw new Error(`Error message: ${err}`);
  }
}

export default getPayload;
